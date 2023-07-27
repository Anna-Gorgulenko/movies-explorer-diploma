const Movie = require('../models/movie');

const AccessDeniedError = require('../errors/AccessDeniedError');

const InvalidDataError = require('../errors/InvalidDataError');

const NotFoundError = require('../errors/NotFoundError');

// Функция getMovies получает список всех фильмов, текущего пользователя.
// Получение массива с фильмами
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// Функция createMovie создает новый фильм в базе данных,
// и связывает с текущим пользователем
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  // Создание нового фильма в базе данных
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id, // Связываем фильм с текущим пользователем по id
  })
    .then((movie) => res.send(movie))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(
          new InvalidDataError(
            'Переданы некорректные данные при создании карточки фильма',
          ),
        );
      } else {
        next(e);
      }
    });
};

// Функция deleteMovie удаляет фильм. Она сначала ищет фильм по указанному
// movieId и проверяет, существует ли такой фильм. Если фильм не найден, генерируется
// исключение NotFoundError. Затем функция проверяет, является ли текущий пользователь
// владельцем фильма, сравнивая req.user._id с идентификатором владельца фильма.
// Если пользователь не является владельцем, генерируется исключение AccessDeniedError.
// Если пользователь является владельцем, функция удаляет документ фильма из базы данных
// с помощью Movie.deleteOne и отправляет удаленный фильм в ответе.
// Удаление фильма
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным _id не найден');
    })
    .then((movie) => {
      const owner = movie.owner.toString();

      // Проверка, является ли текущий пользователь владельцем фильма
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new AccessDeniedError('Невозможно удалить фильм');
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new InvalidDataError('Переданы некорректные данные для удаления'));
      } else {
        next(e);
      }
    });
};

// Экспорт функций getMovies, createMovie и deleteMovie для
// дальнейшего использования в других компонентах приложения

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
