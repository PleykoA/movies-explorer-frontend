export const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

class MovieApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }
    _checkResponse(response) {
        return response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)
    }

    getMovies = () => {
        return fetch(`${MOVIE_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res));
    }
}
const movieApi = new MovieApi({
    baseUrl: MOVIE_URL,
});

export default movieApi;