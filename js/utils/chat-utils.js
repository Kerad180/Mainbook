export function addChat(self, users) {
	let tempUser;
	let messageContent;

	users.forEach(u => (u.id == $(self).attr('id')) ? tempUser = u : 0);

	if (!tempUser.isChatCreated) {
		tempUser.isChatCreated = true;
		$(`#chatWindows`).append(`<div class='chatWindow' data-userId='${tempUser.id}'><div><h3>${tempUser.login}</h3><div><img class='x' src='pictures/close-line.png'alt='x'></div></div><form class='chatForm'><div class='messages' data-userId='${tempUser.id}'></div><div class='textChat'><div><textarea></textarea></div><div><input class='sendButton' type='submit' value='Send'></div></div></form></div>`);

		messageContent = $(`.chatWindow[data-userId ='${tempUser.id}'] div.messages`);

		messagesInit(messageContent, tempUser.id);
		$(`.messages`).animate({
			scrollTop: 1e6
		})

		$(`.chatForm`).submit(function(e) {
			$.post(`php/get-messages.php`, {
				'text': $(`.textChat textarea`).val(),
				'idUserToSend': tempUser.id,
				'isToAdd': true
			})
			$(`.textChat textarea`).val(``);
			messageContent.animate({
				scrollTop: $(`.messages`)[0].scrollHeight
			}, 1000)
			e.preventDefault();
			messagesInit(messageContent, tempUser.id);
		});

	} else {
		tempUser.isChatCreated = false;
		$(`.chatWindow[data-userId = '${tempUser.id}']`).remove();
	}

	$(`.chatWindow .x`).click(function() {
		let user;
		let idTempUser = $(this.parentNode.parentNode.parentNode).attr(`data-userId`);
		users.forEach(u => (u.id == idTempUser ? user = u : 0));
		user.isChatCreated = false;
		$(this.parentNode.parentNode.parentNode).remove();
	});
}

export function replaceShowAndHide(button, contentOne, contentTwo) {
	let isShow = false;
	$(button).click(() => {
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

	window.onresize = () => {
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

function messagesInit(messageContent, idTo) {

	$.post(`php/get-messages.php`, 
		{'idTo': idTo},
		(res) => $(messageContent).html(res))
}