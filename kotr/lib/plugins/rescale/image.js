ig.module(
    'plugins.rescale.image'
).defines(function () {
    "use strict";
    ig.Image.inject({
        data: {},
        load: function (loadCallback) {
            if (this.loaded) {
                if (loadCallback) {
                    loadCallback(this.path, true);
                }
                return;
            } else if (!this.loaded && ig.ready) {
                this.loadCallback = loadCallback || null;

                this.data.original = new Image();
                this.data.original.onload = this.onload.bind(this);
                this.data.original.onerror = this.onerror.bind(this);
                this.data.original.src = ig.prefix + this.path + ig.nocache;
            } else {
                ig.addResource(this);
            }

            ig.Image.cache[this.path] = this;
        },
        reload: function () {
            this.loaded = false;
            this.data.original = new Image();
            this.data.original.onload = this.onload.bind(this);
            this.data.original.src = this.path + '?' + Date.now();
        },
        onload: function (event) {
            this.width = this.data.original.width;
            this.height = this.data.original.height;
            this.loaded = true;
            this.resize(ig.system.scale);
            if (this.loadCallback) {
                this.loadCallback(this.path, true);
            }
        },
        resize: function (scale) {
            // Nearest-Neighbor scaling

            // The original image is drawn into an offscreen canvas of the same size
            // and copied into another offscreen canvas with the new size. 
            // The scaled offscreen canvas becomes the image (data) of this object.

            var origPixels = ig.getImagePixels(this.data.original, 0, 0, this.width, this.height),
                widthScaled = this.width * scale,
                heightScaled = this.height * scale,
                scaled = ig.$new('canvas'),
                scaledCtx = scaled.getContext('2d'),
                scaledPixels = scaledCtx.getImageData(0, 0, widthScaled, heightScaled),
                index,
                indexScaled,
                y,
                x;

            scaled.width = widthScaled;
            scaled.height = heightScaled;


            for (y = 0; y < heightScaled; y += 1) {
                for (x = 0; x < widthScaled; x += 1) {
                    index = (Math.floor(y / scale) * this.width + Math.floor(x / scale)) * 4;
                    indexScaled = (y * widthScaled + x) * 4;
                    scaledPixels.data[indexScaled] = origPixels.data[index];
                    scaledPixels.data[indexScaled + 1] = origPixels.data[index + 1];
                    scaledPixels.data[indexScaled + 2] = origPixels.data[index + 2];
                    scaledPixels.data[indexScaled + 3] = origPixels.data[index + 3];
                }
            }
            scaledCtx.putImageData(scaledPixels, 0, 0);
            this.data[scale] = scaled;
        },
        draw: function (targetX, targetY, sourceX, sourceY, width, height) {
            if (!this.loaded) {
                return;
            }
            var scale = ig.system.scale;
            sourceX = sourceX ? sourceX * scale : 0;
            sourceY = sourceY ? sourceY * scale : 0;
            width = width * scale || this.width * scale;
            height = height * scale || this.height * scale;
            ig.system.context.drawImage(
                this.data[scale],
                sourceX,
                sourceY,
                width,
                height,
                ig.system.getDrawPos(targetX),
                ig.system.getDrawPos(targetY),
                width,
                height
            );
            ig.Image.drawCount += 1;
        },
        drawTile: function (targetX, targetY, tile, tileWidth, tileHeight, flipX, flipY) {
            tileHeight = tileHeight || tileWidth;

            if (!this.loaded || tileWidth > this.width || tileHeight > this.height) {
                return;
            }

            var scale = ig.system.scale,
                tileWidthScaled = Math.floor(tileWidth * scale),
                tileHeightScaled = Math.floor(tileHeight * scale),
                scaleX = flipX ? -1 : 1,
                scaleY = flipY ? -1 : 1;

            if (flipX || flipY) {
                ig.system.context.save();
                ig.system.context.scale(scaleX, scaleY);
            }
            ig.system.context.drawImage(
                this.data[scale], (Math.floor(tile * tileWidth) % this.width) * scale, (Math.floor(tile * tileWidth / this.width) * tileHeight) * scale,
                tileWidthScaled,
                tileHeightScaled,
                ig.system.getDrawPos(targetX) * scaleX - (flipX ? tileWidthScaled : 0),
                ig.system.getDrawPos(targetY) * scaleY - (flipY ? tileHeightScaled : 0),
                tileWidthScaled,
                tileHeightScaled
            );
            if (flipX || flipY) {
                ig.system.context.restore();
            }

            ig.Image.drawCount += 1;
        }
    });
});