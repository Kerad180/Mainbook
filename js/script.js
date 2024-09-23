import initUsers from "./utils/init-users.js";
import newsInit from "./utils/init-news.js";
import { addChat, replaceShowAndHide } from "./utils/chat-utils.js";
import trancate from "./utils/trancate.js";

$(function() {
	const users = initUsers();

	$(`*`).attr(`draggable`, false);

	$(`#contacts ul li`).click(function() {
		addChat(this, users);
	});

	newsInit();

	$(`#newsShare`).submit((e) => {
		$.post(`/php/get-news.php`, {
			'text': $(`#newsText`).val(),
			'isToAdd': true
		})
		e.preventDefault();
		$(`#newsText`).val(``);
		newsInit();
	});

	// users.forEach((user) => {	
	// 	$(`.chatForm ${user.id}`).submit(function(e) {
	// 		// console.log(this.parentNode.attributes[1].value)

	// 		console.log(this)

	// 		// let chatUserId = this.parentNode.attributes[1].value;

	// 		$.post(`php/get-messages.php`, {
	// 			'text': $(`.textChat textarea`).val(),
	// 			'idUserToSend': user.id,
	// 			'isToAdd': true
	// 		})

	// 		$(`.textChat textarea`).val(``);

	// 		messageContent.animate({
	// 			scrollTop: $(`.messages`)[0].scrollHeight
	// 		}, 1000)
	// 		e.preventDefault();
	// 		messagesInit(messageContent, user.id);
	// 	});
	// })

	$(`article div`).truncate();

	replaceShowAndHide($(`#contactButton`), $(`#contacts`), $(`#news`));
});
