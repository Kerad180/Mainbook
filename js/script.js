$(function() {
	let users = addUsers(tableInit("php/get-users.php"));

	$("*").attr("draggable", false);

	$("#contacts ul li").click(function() {
		addChat(this, users);
	});

	newsInit();

	$("#newsShare").submit(function(e) {
		$.post("/php/get-news.php", {
			"text": $("#newsText").val(),
			"isToAdd": true
		})
		e.preventDefault();
		$("#newsText").val('');
		newsInit();
	});

	

	$("article div").truncate();

	replaceShowAndHide($("#contactButton"), $("#contacts"), $("#news"));
});


class user {
	id;
	login;
	isChatCreated;

	constructor(id, login) {
		this.id = id;
		this.login = login;
		this.isChatCreated = false;
	}
}

function tableInit(url) {
	let table = [];
	let tempUser;

	$.ajax({
		type: "GET",
		url: url,
		async: false,

		success: function(data) {
			tempUser = data;
			table = tempUser.split(",");
		}
	});

	return table;
}

function addUsers(tableFromAdd) {
	let tableToAdd = [];
	for (let i = 0; i <= tableFromAdd.length - 2; i = i + 2) {
		tableToAdd.push(new user(parseInt(tableFromAdd[i]), tableFromAdd[i + 1]));
	}
	return tableToAdd;
}

function newsInit() {
	$.get("../php/get-news.php", function(res) {
		$("#news ul").html(res),
			$("#news ul li div").truncate();
	})
}

function messagesInit(messageContent, idTo) {

	$.post("php/get-messages.php", {
			"idTo": idTo
		},
		function(res) {
			$(messageContent).html(res);

		})
}

function replaceShowAndHide(button, contentOne, contentTwo) {
	let isShow = false;
	$(button).click(function() {
		if (isShow) {
			contentOne.hide();
			contentTwo.show();
			isShow = false;
		} else {
			contentOne.show();
			contentTwo.hide();
			isShow = true;
		}
	})

	window.onresize = function() {
		if (window.innerWidth > 800) {
			contentOne.show();
			contentTwo.show();
		} else {
			if (!isShow) {
				contentOne.hide();
				contentTwo.show();
			} else {
				contentOne.show();
				contentTwo.hide();
			}
		}
	}
}

function addChat(self, users) {
	let tempUser;

	users.forEach(u => (u.id == $(self).attr('id')) ? tempUser = u : 0);

	if (!tempUser.isChatCreated) {
		tempUser.isChatCreated = true;
		$("#chatWindows").append("<div class='chatWindow' data-userId='" + tempUser.id + "'><div><h3>" + tempUser.login + "</h3><div>" +
			"<img class='x' src='pictures/close-line.png'alt='x'></div></div>" +
			"<form class='chatForm'><div class='messages' data-userId='" + tempUser.id + "'></div><div class='textChat'><div><textarea></textarea></div><div><input class='sendButton' type='submit' value='Send'></div></div></form></div>");

		$messageContent = $(".chatWindow[data-userId ='" + tempUser.id + "'] div.messages");

		messagesInit($messageContent, tempUser.id);
		$(".messages").animate({
			scrollTop: 1e6
		})

		var scroll = $(".messages[data-userId='" + tempUser.id + "']")[0];


		$(".chatForm").submit(function(e) {
			$.post("php/get-messages.php", {
				"text": $(".textChat textarea").val(),
				"idUserToSend": tempUser.id,
				"isToAdd": true
			})
			$(".textChat textarea").val('');
			$messageContent.animate({
				scrollTop: $(".messages")[0].scrollHeight
			}, 1000)
			e.preventDefault();
			messagesInit($messageContent, tempUser.id);
		});

	} else {
		tempUser.isChatCreated = false;
		$(".chatWindow[data-userId = '" + tempUser.id + "']").remove();
	}

	$(".chatWindow .x").click(function() {
		let user;
		let idTempUser = $(this.parentNode.parentNode.parentNode).attr("data-userId");
		users.forEach(u => (u.id == idTempUser ? user = u : 0));
		user.isChatCreated = false;
		$(this.parentNode.parentNode.parentNode).remove();
	});
}

(function($) {
	$.fn.truncate = function(options) {
		let defaults = {
			moreText: "more",
			lessText: "less",
			textColor: "#7AB9D1",
			hoverTextColor: "#7ab8d1bc"
		}

		let settings = $.extend({}, defaults, options);

		return this.each(
			function() {
				let actualObj = jQuery(this);
				let message = jQuery(this).html();
				let messageLength = message.length;

				if (messageLength > 400) {
					let splitLocation = message.indexOf(" ", 400);
					let visiblePart = message.substring(0, splitLocation);
					let hiddenPart = message.substring(splitLocation, messageLength);


					actualObj.html("<span class='visiblePart'>" + visiblePart + "</span> <span class='moreText'>" + settings.moreText + "</span><span class='hiddenPart'>" + hiddenPart + "</span> <span class='lessText'>" + settings.lessText + " </span>");

					$(".hiddenPart", actualObj).css("display", "none");
					$(".lessText", actualObj).hide();
					$(".moreText, .lessText").css("color", defaults.textColor);

					$(".moreText", actualObj).click(
						function() {
							$(".hiddenPart", actualObj).toggle();
							$(".moreText", actualObj).hide();
							$(".lessText", actualObj).show();
						}
					);
					$(".lessText", actualObj).click(
						function() {
							$(".hiddenPart", actualObj).toggle();
							$(".moreText", actualObj).show();
							$(".lessText", actualObj).hide();
						}
					);

					$(".moreText, .lessText", actualObj).hover(
						function() {
							$(this).css({
								"color": defaults.hoverTextColor,
								"cursor": "pointer"
							});

						}
					);
					$(".moreText, .lessText", actualObj).mouseout(
						function() {
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