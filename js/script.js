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

	$(`article div`).truncate();

	replaceShowAndHide($(`#contactButton`), $(`#contacts`), $(`#news`));
});
