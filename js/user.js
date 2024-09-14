export default class user {
	id;
	login;
	isChatCreated;

	constructor(id, login) {
		this.id = id;
		this.login = login;
		this.isChatCreated = false;
	}
}