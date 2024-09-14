export default function newsInit() {
	$.get("../php/get-news.php", function(res) {
		$("#news ul").html(res),
			$("#news ul li div").truncate();
	})
}
