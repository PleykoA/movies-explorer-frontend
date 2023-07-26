import { MAIN_API } from './constants';

class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }
    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then((result) => {
                let error = new Error(`Ошибка ${response.status}`);
                error.response = result.message;
                throw error;
            });
        }
    };

    signup(data) {
        return fetch(`${MAIN_API}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => this._checkResponse(res));
    };

    login(email, password) {
        return fetch(`${MAIN_API}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then(res => this._checkResponse(res));
    };

    getUserInfo() {
        return fetch(`${MAIN_API}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            },

        }).then(res => this._checkResponse(res));
    };

    updateUserInfo(name, email) {
        return fetch(`${MAIN_API}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({ name, email }),

        }).then(res => this._checkResponse(res));
    };
    logout() {
        return fetch(`${MAIN_API}/signout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res));
    }

    saveMovie(data) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: 'https://api.nomoreparties.co' + data.image.url,
                trailerLink: data.trailerLink,
                thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            }),
        }).then(res => this._checkResponse(res));
    }

    getSavedMovies() {
        return fetch(`${MAIN_API}/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(res => this._checkResponse(res));
    }

    deleteMovie(data) {
        return fetch(`${this._baseUrl}/movies/${data}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => this._checkResponse(res));
    }
}
const mainApi = new Api({
    baseUrl: MAIN_API,
});

export default mainApi;