const shortMovies = 'shortMovies';
const MAIN_API = 'https://api.pleykoa-movies.nomoredomains.work';
const MOVIES_URL = 'https://api.nomoreparties.co';
const regexEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,10})+$/;

const DEVICE_WIDTH = {
    desktop: {
        width: 1280,
        cards: {
            total: 12,
            more: 3,
        },
    },
    tablet: {
        width: 768,
        cards: {
            total: 8,
            more: 2,
        },
    },
    mobile: {
        width: 580,
        cards: {
            total: 5,
            more: 2,
        },
    },
};


export {
    MOVIES_URL,
    MAIN_API,
    shortMovies,
    DEVICE_WIDTH,
    regexEmail
};