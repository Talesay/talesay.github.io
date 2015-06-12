/*global ig*/
ig.module(
	'plugins.clickable.mixin'
).defines(function () {
	'use strict';
	ig.MixinClickable = {
		oldClick: false,
		clickedInside: false,
		clickName: 'click',
		updateClickable: function () {
			var clicked = ig.input.state(this.clickName);
			if (!this.oldClicked && clicked && this.isMouseOver()) {
				this.clickedInside = true;
			}
			if (this.clickedInside && this.overClickable()) {
				if (clicked && !this.oldClick) {
					this.pressed();
				} else if (clicked) {
					this.down();
				} else if (this.oldClick) {
					this.released();
				}
			}
			if (this.oldClick && !clicked) {
				this.clickedInside = false;
			}
			this.oldClicked = clicked;
		},
		down: function () {},
		pressed: function () {},
		released: function () {},
		isMouseOver: function () {
			return ig.input.mouse.x + ig.game.screen.x > this.pos.x && ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x && ig.input.mouse.y + ig.game.screen.y > this.pos.y && ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
		}
	};
});