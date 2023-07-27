// Импорт канстанты, которая содержит максимальное
// время продолжительности фильма - 40 минут
import { MAX_SHORT_FILM_LENGTH } from "./constants"

// Функция ответа сервера при запросе
export const handleSendingRequest = (res) => {
  // Если ответ успешный ОК, возвращаем ответ в формате res.json()
  if (res.ok) {
    return res.json()
  }
  // Иначе возвращаем Promise.reject - ошибка
  return Promise.reject(`Error: ${res.status}`)
}

//Эта функция filterDuration принимает массив фильмов movies и выполняет фильтрацию
// по длительности фильмов. И возвращает новый массив, содержащий только те фильмы,
// по длительности, которые меньше значения MAX_SHORT_FILM_LENGTH.
// Функция filter применяется к каждому элементу массива movies, проверяя,
// является ли длительность фильма меньше MAX_SHORT_FILM_LENGTH. Если это верно,
// то фильм добавляется в новый массив. В итоге возвращается массив фильмов
// с длительностью меньше MAX_SHORT_FILM_LENGTH.
export function filterDuration(movies) {
  return movies.filter((movie) => movie.duration < MAX_SHORT_FILM_LENGTH)
}

// Функция filterMovies фильтрует массив фильмов (movies) по запросу (query),
// оставляя только фильмы, у которых в названии на русском (nameRU) или английском
// (nameEN) содержится подстрока, соответствующая запросу.
export function filterMovies(movies, query) {
  //Каждый фильм из массива movies проходит через функцию filter,
  // принимая фильм в качестве параметра, возвращаz true или false,
  // в зависимости от того, удовлетворяет ли фильм условиям фильтрации.
  const moviesQuery = movies.filter((movie) => {
    //Названия фильмов на русском (nameRU) и на английском (nameEN) приводятся к нижнему
    // регистру и обрезаются от лишних пробелов с помощью методов toLowerCase() и trim().
    const movieRu = String(movie.nameRU).toLowerCase().trim()
    const movieEn = String(movie.nameEN).toLowerCase().trim()
    //Запрос пользователя (query) также приводится к нижнему регистру и обрезается от лишних пробелов.
    const userQuery = query.toLowerCase().trim()
    return (
      //В результате работы функции filter, переменная moviesQuery будет содержать
      // отфильтрованный массив фильмов, удовлетворяющих заданному запросу.
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    )
  })
  //Функция возвращает moviesQuery
  return moviesQuery
}

//Эта функция durationConverter принимает значение длительности фильмов с
// параметром duration в минутах и переводит его в формат часы и минуты.
export function durationConverter(duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}ч${minutes}м`
}
