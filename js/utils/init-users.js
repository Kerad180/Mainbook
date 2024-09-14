import user from "../user.js";

export default function initUsers() {
    return addUsers(tableInit("../php/get-users.php"));
}

function addUsers(tableFromAdd) {
	let tableToAdd = [];
	for (let i = 0; i <= tableFromAdd.length - 2; i = i + 2) {
		tableToAdd.push(new user(parseInt(tableFromAdd[i]), tableFromAdd[i + 1]));
	}
	return tableToAdd;
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