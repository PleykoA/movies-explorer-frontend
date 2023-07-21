const MAIN_API = 'https://api.pleykoa-movies.nomoredomains.work';

class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }
    _checkResponse = (response) => {
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

    signup = (name, email, password) => {
        return fetch(`${MAIN_API}/signup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        }).then(res => this._checkResponse(res));
    };

    login = (email, password) => {
        return fetch(`${MAIN_API}/signin`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then(res => this._checkResponse(res));
    };

    getUserInfo = () => {
        return fetch(`${MAIN_API}/users/me`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },

        }).then(res => this._checkResponse(res));
    };
    updateUserInfo = (name, email) => {
        return fetch(`${MAIN_API}/users/me`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email }),

        }).then(res => this._checkResponse(res));
    };
    logout = () => {
        return fetch(`${MAIN_API}/signout`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => this._checkResponse(res));
    }

    saveMovie = (movieData) => {
        return fetch(`${MAIN_API}/movies`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData),
        })
            .then(res => this._checkResponse(res));
    }

    getSavedMovies = () => {
        return fetch(`${MAIN_API}/movies`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => this._checkResponse(res));
    }

    deleteMovie = (id) => {
        return fetch(`${MAIN_API}/movies/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => this._checkResponse(res));
    }
}
const mainApi = new Api({
    baseUrl: MAIN_API,
});

export default mainApi;