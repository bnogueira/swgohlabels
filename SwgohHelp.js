

async function myFetch(url, methodBodyHeaders) {
	var promiseObj = new Promise(function (resolve, reject) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				resolve(this.responseText);
			}
		};

		xhttp.open(methodBodyHeaders.method, url, true);

		for (var property in methodBodyHeaders.headers)
			xhttp.setRequestHeader(property, headers[property]);

		if (methodBodyHeaders.hasOwnProperty(body))
			xhttp.send(requestBody);
		else
			xhttp.send();
	});
	return promiseObj;
}


/*exports =*/ class SwgohHelp {

	constructor(settings) {

		this.user = "username=" + settings.username;
		this.user += "&password=" + settings.password;
		this.user += "&grant_type=password";
		this.user += "&client_id=" + settings.client_id;
		this.user += "&client_secret=" + settings.client_secret;

		this.token = null;

		this.urlBase = (settings.protocol || 'https') + "://" + (settings.host || "api.swgoh.help") + (settings.port || '');
		this.signin = '/auth/signin';
		this.data = '/swgoh/data/';
		this.player = '/swgoh/player/';
		this.guild = '/swgoh/guild/';

		this.fetch = myFetch;

	}

	async login(url, body) {

		try {

			url = url ? this.urlBase + url : this.urlBase + this.signin;
			body = body || this.user;

			let token = await this.fetch(this.urlBase + this.signin, {
				method: 'POST',
				body: this.user,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': new Buffer(JSON.stringify(this.user)).length
				}
			});

			if (token.status !== 200) { throw new Error('! Cannot login with these credentials'); }

			token = await token.json();
			this.token = { 'Authorization': "Bearer " + token.access_token };

		} catch (e) {
			throw e;
		}

	}

	async fetchAPI(url, criteria, lang) {

		try {

			if (!this.token) { await this.login(); }

			let fetchUrl = lang ? this.urlBase + url + (criteria || '') + "/" + lang : this.urlBase + url + (criteria || '');

			const response = await this.fetch(fetchUrl, {
				method: 'POST',
				headers: this.token
			});

			return await response.json();

		} catch (e) {
			throw e;
		}

	}



	async fetchData(criteria) {
		try {
			return await this.fetchAPI(this.data, criteria);
		} catch (e) {
			throw e;
		}
	}

	async fetchPlayer(allycode) {
		try {
			return await this.fetchAPI(this.player, allycode);
		} catch (e) {
			throw e;
		}
	}

	async fetchGuild(allycode) {
		try {
			return await this.fetchAPI(this.guild, allycode);
		} catch (e) {
			throw e;
		}
	}

}