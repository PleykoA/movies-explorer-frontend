
function getTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours === 0) {
        return `${minutes > 0 ? ` ${minutes}м` : ''}`;
    } else {
        return `${hours}ч${minutes > 0 ? ` ${minutes}м` : ''}`;
    }
}

function filterShorts(movies) {
    return movies.filter(movie => movie.duration < 40);
}

function filterMovies(movies, userRequest, shortsCheckbox) {
    const moviesByRequest = movies.filter((movie) => {
        const movieRu = String(movie.nameRU).toLowerCase().trim();
        const movieEn = String(movie.nameEN).toLowerCase().trim();
        const userMovie = userRequest.toLowerCase().trim();
        return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
    });

    if (shortsCheckbox) {
        return filterShorts(moviesByRequest);
    } else {
        return moviesByRequest;
    }
}

export {
    getTime,
    filterShorts,
    filterMovies
}