class Auth {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
    login(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        }).then((res) => this._checkRes(res));
    }

    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, email, password }),
        }).then((res) => this._checkRes(res));
    }

    getToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                ...this._headers,
                authorization: `Bearer ${token}`,
            },
        }).then((res) => this._checkRes(res));
    }
}


export default Auth;