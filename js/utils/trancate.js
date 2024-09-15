export default (($) => {
	$.fn.truncate = function(options) {
		let defaults = {
			moreText: `more`,
			lessText: `less`,
			textColor: `#7AB9D1`,
			hoverTextColor: `#7ab8d1bc`
		}

		let settings = $.extend({}, defaults, options);

		return this.each(
			function() {
				let actualObj = jQuery(this);
				let message = jQuery(this).html();
				let messageLength = message.length;

				if (messageLength > 400) {
					let splitLocation = message.indexOf(` `, 400);
					let visiblePart = message.substring(0, splitLocation);
					let hiddenPart = message.substring(splitLocation, messageLength);


					actualObj.html(`<span class='visiblePart'>${visiblePart}</span> <span class='moreText'>${settings.moreText}</span><span class='hiddenPart'>${hiddenPart}</span> <span class='lessText'>${settings.lessText} </span>`);

					$(`.hiddenPart`, actualObj).css(`display`, `none`);
					$(`.lessText`, actualObj).hide();
					$(`.moreText, .lessText`).css(`color`, defaults.textColor);

					$(`.moreText`, actualObj).click(() => {
						$(`.hiddenPart`, actualObj).toggle();
						$(`.moreText`, actualObj).hide();
						$(`.lessText`, actualObj).show();
					}
					);
					$(`.lessText`, actualObj).click(() => {
						$(`.hiddenPart`, actualObj).toggle();
						$(`.moreText`, actualObj).show();
						$(`.lessText`, actualObj).hide();
					}
					);

					$(`.moreText, .lessText`, actualObj).hover(
						function() {
							$(this).css({
								"color": defaults.hoverTextColor,
								"cursor": "pointer"
							});

						}
					);
					$(`.moreText, .lessText`, actualObj).mouseout(() => {
						$(this).css({
							"color": defaults.textColor,
							"cursor": "default"
						});
					}
					);
				}
			}
		);
	}
})(jQuery);