/*global ig*/
ig.module(
    'system.entity.components.draw-text'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.DrawText = ig.BaseComponent.extend({
        name: 'draw-text',
        textPos: {
            x: 0,
            y: 0
        },
        textAlign: ig.Font.ALIGN.CENTER,
        draw: function (entity) {
            if (!entity.onScreen) {
                return;
            }
            ig.system.context.globalAlpha = entity.alpha;
            ig.system.context.drawImage(this.buffer, entity.pos.x, entity.pos.y);
            ig.system.context.globalAlpha = 1;
        },
        update: function (entity) {
            if (this.text !== entity.text) {
                this.updateText(entity);
            }
        },
        updateText: function (entity) {
            // create a new canvas
            this.buffer = document.createElement('canvas');
            this.buffer.width = entity.size.x;
            this.buffer.height = entity.size.y;
            // hijack ig.system.context so font.draw() works easily ;)
            var impactCtx = ig.system.context;
            ig.system.context = this.buffer.getContext('2d');
            this.font.draw(
                this.text,
                this.textPos.x + (entity.size.x / 2),
                this.textPos.y - (this.font.height / 2) + (entity.size.y / 2),
                entity.textAlign
            );
            // restore context
            ig.system.context = impactCtx;
        },
        added: function (entity) {
            if (entity.font === null || entity.text === undefined) {
                throw new ig.ComponentError("Entity Text or Font missing");
            }

            entity.addComponent(new ig.OnScreen());

            entity.textAlign = entity.textAlign || this.textAlign;

            this.text = entity.text;
            if (entity.textPos) {
                this.textPos.x = entity.textPos.x;
                this.textPos.y = entity.textPos.y;
            }
            this.font = entity.font;

            this.updateText(entity);
        }
    });
});