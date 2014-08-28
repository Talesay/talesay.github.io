/*jslint nomen: true*/
/*global ig*/
/* Contactar a dpweberza@gmail.com para atribuir TextureAtlas plugin en los creditos */
ig.module(
    'system.atlas'
).requires(
    'impact.animation',
    'impact.image',
    'impact.entity'
).defines(function () {
    "use strict";
    ig.AtlasError = function (message) {
        this.name = "AtlasError";
        this.message = message;
    };
    ig.AtlasError.prototype = Error.prototype;
    ig.Atlas = ig.Class.extend({
        image: null,

        packedTexture: null,
        width: 0,
        height: 0,

        init: function (spriteSheetImage, packedTexture) {
            this.image = spriteSheetImage;

            if (packedTexture === null) {
                throw new ig.AtlasError("Packed texture is null!");
            }
            this.packedTexture = packedTexture;
            this.width = packedTexture.meta.size.w;
            this.height = packedTexture.meta.size.h;
        },

        getFrameData: function (frame) {
            var frameArg = frame.toString(),
                i = 0;
            for (i = 0; i < this.packedTexture.frames.length; i = i + 1) {
                if (this.packedTexture.frames[i].filename === frameArg) {
                    return this.packedTexture.frames[i];
                }
            }
            // throw new ig.AtlasError("Frame: " + frameArg + " does not exist!");
        }
    });

    /**
     * A TextureAtlasAnimation extends Impact's Animation class to allow looking up a frames data from the TexturePacker JSON array
     *
     * Author: dpweberza@gmail.com
     *
     * Version 0.4  - 2013/02/19
     *
     * Notes:
     */
    ig.AtlasAnimation = ig.Animation.extend({
        textureAtlas: null,
        maintainFrameOffset: false,
        frameData: 0,

        init: function (textureAtlas, frameTime, sequence, stop, maintainFrameOffset) {
            this.textureAtlas = textureAtlas;
            this.timer = new ig.Timer();
            this.frameTime = frameTime;
            this.sequence = sequence;
            this.frameData = this.textureAtlas.getFrameData(this.sequence[0]);
            this.stop = stop;
            if (maintainFrameOffset) {
                this.maintainFrameOffset = maintainFrameOffset;
            }
        },

        rewind: function () {
            this.timer.reset();
            this.loopCount = 0;
            this.frameData = this.textureAtlas.getFrameData(this.sequence[0]);
            return this;
        },

        update: function () {
            var frameTotal = Math.floor(this.timer.delta() / this.frameTime);
            this.loopCount = Math.floor(frameTotal / this.sequence.length);
            if (this.stop && this.loopCount > 0) {
                this.frame = this.sequence.length - 1;
            } else {
                this.frame = frameTotal % this.sequence.length;
            }
            this.frameData = this.textureAtlas.getFrameData(this.sequence[this.frame]);
        },


        draw: function (targetX, targetY) {
            var bbsize = Math.max(this.textureAtlas.width, this.textureAtlas.height),
                x = targetX,
                y = targetY,
                halfWidth = this.frameData.frame.w / 2,
                halfHeight = this.frameData.frame.h / 2;

            if (this.frameData.trimmed && this.maintainFrameOffset) {
                // offset the image position according to source size, so that trimmed image still appears centered as it should
                x += this.frameData.spriteSourceSize.x;
                y += this.frameData.spriteSourceSize.y;
            }

            // On screen?
            if (x > ig.system.width || y > ig.system.height || x + bbsize < 0 || y + bbsize < 0) {
                return;
            }

            if (this.alpha !== 1) {
                ig.system.context.globalAlpha = this.alpha;
            }


            ig.system.context.save();
            ig.system.context.translate(
                ig.system.getDrawPos(x + halfWidth),
                ig.system.getDrawPos(y + halfHeight)
            );
            ig.system.context.rotate(this.angle);

            if (this.flip.x || this.flip.y) {
                this.flipSprite();
            }

            this.textureAtlas.image.draw(-halfWidth, -halfHeight, this.frameData.frame.x, this.frameData.frame.y, this.frameData.frame.w, this.frameData.frame.h);
            ig.system.context.restore();

            if (this.alpha !== 1) {
                ig.system.context.globalAlpha = 1;
            }
        },
        flipSprite: function () {
            var scaleX = this.flip.x ? -1 : 1,
                scaleY = this.flip.y ? -1 : 1;
            ig.system.context.scale(scaleX, scaleY);
        }
    });

    // Add a nice convenience method to the Entity class so that we can add TextureAtlasAnimations
    ig.Entity.inject({
        addTextureAtlasAnim: function (textureAtlas, name, frameTime, sequence, stop, maintainFrameOffset) {

            if (!textureAtlas) {
                throw new ig.AtlasError("No texture atlas to add the animation from!");
            }
            if (!name) {
                throw new ig.AtlasError("No name to call the animation!");
            }

            var a = new ig.AtlasAnimation(textureAtlas, frameTime, sequence, stop, maintainFrameOffset);
            this.anims[name] = a;
            if (!this.currentAnim) {
                this.currentAnim = a;
            }

            return a;
        }
    });


    /**
     * A TextureAtlasImage extends Impact's Image class to allow looking up an images data from the TexturePacker JSON array
     *
     * Author: dpweberza@gmail.com
     *
     * Version 0.2  - 2012/10/22
     *
     * Notes:
     */
    ig.AtlasImage = ig.Image.extend({
        textureAtlas: null,
        frameData: 0,
        maintainFrameOffset: false,

        init: function (textureAtlas, frameName, maintainFrameOffset) {
            this.textureAtlas = textureAtlas;
            this.frameData = this.textureAtlas.getFrameData(frameName);
            if (maintainFrameOffset) {
                this.maintainFrameOffset = maintainFrameOffset;
            }
        },

        draw: function (targetX, targetY) {
            var bbsize = Math.max(this.textureAtlas.width, this.textureAtlas.height),
                x = targetX,
                y = targetY;

            // On screen?
            if (x > ig.system.width || y > ig.system.height || x + bbsize < 0 || y + bbsize < 0) {
                return;
            }

            if (this.frameData.trimmed && this.maintainFrameOffset) {
                // offset the image position according to source size, so that trimmed image still appears as it should
                x += this.frameData.spriteSourceSize.x;
                y += this.frameData.spriteSourceSize.y;
            }

            this.textureAtlas.image.draw(x, y, this.frameData.frame.x, this.frameData.frame.y, this.frameData.frame.w, this.frameData.frame.h);
        }
    });

    ig.BMFont = ig.Font.extend({
        textureAtlas: null,
        previousChar: null,
        init: function (textureAtlas) {
            this.textureAtlas = textureAtlas;
            this.height = this.textureAtlas.packedTexture.meta.lineHeight;
            this.letterSpacing = this.textureAtlas.packedTexture.meta.kerning;
            this.spaceWidth = this.textureAtlas.packedTexture.meta.spaceWidth;
        },
        _drawChar: function (c, targetX, targetY) {
            if (c === 0) {
                return this.spaceWidth + this.letterSpacing;
            }
            var frameData = this.textureAtlas.getFrameData(c + this.firstChar),
                kerningPair = this.getKerningPair(c);
            this.textureAtlas.image.draw(targetX + frameData.frame.sx + kerningPair, targetY + frameData.frame.sy, frameData.frame.x, frameData.frame.y, frameData.frame.w, frameData.frame.h);

            return frameData.frame.w + this.letterSpacing + kerningPair;
        },
        getKerningPair: function (currentChar) {
            if (!this.textureAtlas.packedTexture.kernPairs) {
                return 0;
            }
            if (!this.previousChar) {
                this.previousChar = currentChar;
                return 0;
            } else {
                var i = 0,
                    kernPairs = this.textureAtlas.packedTexture.kernPairs,
                    l = kernPairs.length,
                    res = 0;
                for (i = 0; i < l; i = i + 1) {
                    if (kernPairs[i].first === this.previousChar && kernPairs[i].second === currentChar) {
                        res = kernPairs[i].amount;
                        break;
                    }
                }
                this.previousChar = currentChar;
                return res;
            }
        },
        _widthForLine: function (text) {
            var width = 0,
                frameData,
                charW = 0,
                i;

            for (i = 0; i < text.length; i = i + 1) {

                if (text.charCodeAt(i) === 0) {
                    charW = this.spaceWidth + this.letterSpacing;
                } else {
                    charW = this.textureAtlas.getFrameData(text.charCodeAt(i)).frame.w + this.letterSpacing;
                }
                width += charW;
            }
            return width;
        }
    });

});