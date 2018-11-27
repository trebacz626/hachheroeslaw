class MyDatastorage {
	store(user) {
		localStorage.setItem('user', JSON.stringify(user));
	}
	getUser() {
		return JSON.parse(localStorage.getItem('user'));
	}
	getRefreshToken() {
		var user = JSON.parse(localStorage.getItem('user'));
		if(!user)return null;
		return user.refreshToken;
	}
	unsetUser(){
		localStorage.removeItem('user');
	}
}

dataStorage = new MyDatastorage();
class Apiclient {
	constructor() {
		this.accessToken = "";
		this.SITE_URL ="http://77.237.31.43:8080";//"http://localhost:8080";"
	}
	async getuserById(id) {
		var result = await this.GetRequest(this.SITE_URL + "api/api/users/" + id);

		return result;
	}
	async Login(mail, password) {
		var user = await this.PostRequest(this.SITE_URL + '/api/authentication/login',
			{
				email: mail,
				password: password
			}
		);
		dataStorage.store(user);
	}
	async Register(mail, name, password) {
		console.log("register");
		var rejestracja = await this.PostRequest(this.SITE_URL + "/api/authentication/register",
			{
				email: mail,
				password: password,
				name: name
			}
		);
		dataStorage.store(rejestracja);
		return rejestracja;
	}
	async GetRequest(url) {
		for (let i = 0; i < 3; i++) {
			if(this.accessToken)var headers={
				access_token: this.accessToken
			}
			else var headers ={}
			try{
				var getting = await $.ajax({
					method: "GET",
					url: url,
					headers: headers
				});
			}catch(err){
				var getting = err.status;
			}
			if (getting == 401) {
				if (dataStorage.getUser() == null) {
					return "Nie jesteś zalogowany/zalogowana"
				}
				let result = await $.post(this.SITE_URL+"/api/authentication/refreshaccessToken",
					{
						refreshToken: dataStorage.getRefreshToken()
					})
				this.accessToken = result.accessToken;
			} else {
				return getting;
			}
		}
		return null;
	}
	async PostRequest(url, body) {
		for (let i = 0; i < 3; i++) {
			if(this.accessToken)var headers={
				access_token: this.accessToken
			}
			else var headers ={};
			try{
				console.log("before login");
				var posting = await $.ajax({
					method: "POST",
					url: url,
					contentType:"application/x-www-form-urlencoded",
					headers: headers,
					data:body
				});
			}catch(err){
				var posting = err.status;
				console.log("error posting");
			}	
			if (posting == 401) {
				if (dataStorage.getRefreshToken() === null) {
					return "Nie jesteś zalogowany/zalogowana"
				}
				let result = await $.post(this.SITE_URL + "/api/authentication/refreshaccessToken",
					{
						refreshToken: dataStorage.getRefreshToken()
					}
				)
				this.accessToken = result.accessToken;
			} else {
				return posting;
			}
		}
		return null;

	}
	async getAllLaws() {
		var alllaws = await this.GetRequest(this.SITE_URL + '/api/laws/all');
		return alllaws;
	}
	async getUsersVotes() {
		var userLaws = await this.GetRequest(this.SITE_URL + '/user/getmyvotes');
		return userLaws;
	}

	async getLawsByPageAndStatus(num, status) {


		var LawsBPAS = await this.GetRequest(this.SITE_URL + '/api/laws/page/' + num + '/' + status
		);
		return LawsBPAS;
	}
	async disableVoteForLaw(id) {
		var disableUrVotes = await this.PostRequest(this.SITE_URL + "/api/laws/" + id + "/vote/disable",
			{
				id: id
			}
		);
		return disableUrVotes;
	}
	async voteForLaw(id, uporodown) {
		var zmienna;
		if (uporodown) {
			zmienna = "up";
		} else {
			zmienna = "down";
		}
		var votingLaw = await this.PostRequest(this.SITE_URL + "/api/laws/" + id + "/vote/" + zmienna,
			{
				id: id
			}
		);
		console.log(votingLaw);
		return votingLaw;
	}
}

var apiClient = new Apiclient()
