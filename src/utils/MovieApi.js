
import { MOVIES_URL } from './constants';
class MoviesApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }
    getMovies() {
        return fetch(`${this._baseUrl}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => this._checkResponse(res));
    }
}

const movieApi = new MoviesApi({
    baseUrl: MOVIES_URL + '/beatfilm-movies',
});

export default movieApi;