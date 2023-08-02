// Создание роутера в Express.
const movieRouter = require('express').Router();

// Импорт функций с фильмами.
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

// Импорт констант валидаторов, определенных в middleware,
// для проверки данных перед обработкой запросов.
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validation');

// Маршрут для получения списка фильмов.
movieRouter.get('/movies', getMovies);

// Маршрут для создания нового фильма. Перед обработкой запроса,
// данные проходят через валидацию с помощью валидатора createMovieValidator.
// Затем используют функцию createMovie для создания фильма.
movieRouter.post('/movies', createMovieValidator, createMovie);

// Маршрут для удаления фильма. Перед обработкой запроса, параметры
// проходят через валидацию с помощью валидатора deleteMovieValidator.
// Затем используется функцию deleteMovie для удаления фильма.
movieRouter.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

// Экспорт роутера, для дальнейшего
// использования в других компонентах приложения.
module.exports = movieRouter;
