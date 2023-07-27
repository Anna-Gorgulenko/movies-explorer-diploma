import React, { useState, useEffect } from "react"
import "./Movies.css"
import Header from "../Header/Header"
import * as movies from "../../utils/MoviesApi"
import SearchForm from "../SearchForm/SearchForm"
import Footer from "../Footer/Footer"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import { filterMovies, filterDuration } from "../../utils/utils"

// Компонент Movies
function Movies({
  loggedIn,
  handleLikeFilm,
  savedMovies,
  ondeleteMovieOnServer,
}) {
  // Состояния переменных
  const [isShortFilm, setisShortFilm] = useState(false)
  const [isReqError, setisReqError] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [initialCardsMovies, setInitialCardsMovies] = useState([]) // массив с исходными фильмами.
  const [filteredMovies, setFilteredMovies] = useState([]) // массив с отфильтрованными фильмами.

  // Функция handleShortFilmFilterToggle используется для управления короткометражными фильмами.
  // Она обновляет состояние isShortFilm и перефильтровывает данные в состоянии filteredMovies
  // в зависимости от значения isShortFilm.
  // Также она сохраняет текущее состояние isShortFilm в localStorage для будущего использования.
  function handleShortFilmFilterToggle() {
    setisShortFilm(!isShortFilm)
    if (!isShortFilm) {
      if (filterDuration(initialCardsMovies).length === 0) {
        setFilteredMovies(filterDuration(initialCardsMovies))
      } else {
        setFilteredMovies(filterDuration(initialCardsMovies))
      }
    } else {
      setFilteredMovies(initialCardsMovies)
    }
    localStorage.setItem("shortMovies", !isShortFilm)
  }

  // Функция updateFilteredMoviesList используется для фильтрации и обновления фильмов.
  // Она применяет фильтр по запросу и продолжительности на массив фильмов,
  // затем обновляет состояния initialCardsMovies и filteredMovies с отфильтрованными данными,
  // а также сохраняет обновленные данные в localStorage для будущего использования.
  function updateFilteredMoviesList(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short)
    setInitialCardsMovies(moviesCardList)
    setFilteredMovies(short ? filterDuration(moviesCardList) : moviesCardList)
    localStorage.setItem("movies", JSON.stringify(moviesCardList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  // Эффект useEffect используется для инициализации состояния isShortFilm.
  // Эффект выполняется при монтировании компонента (пустой массив зависимостей []) и проверяет,
  // есть ли в localStorage значение shortMovies со значением true.
  // Если значение shortMovies равно true, то устанавливается состояние isShortFilm в true,
  //  иначе состояние isShortFilm устанавливается в false.
  //  Таким образом, функция эффекта устанавливает начальное состояние короткометражных фильмов isShortFilm
  //  на основе данных, сохраненных в localStorage, при первом рендере компонента.
  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setisShortFilm(true)
    } else {
      setisShortFilm(false)
    }
  }, [])

  //Функция searchAndFilterMovies используется для поиска фильмов по запросу и управления состояниями.
  //Функция принимает входной параметр query, который представляет собой запрос для поиска фильмов.
  //Запрос сохраняется в localStorage с ключом movieSearch, чтобы его можно было использовать в будущем.
  //Также в localStorage сохраняется текущее состояние флага короткометражных фильмов с ключом shortMovies.
  //Если в localStorage уже присутствуют фильмы (ключ allMovies), то функция выполняет фильтрацию
  //фильмов с помощью функции updateFilteredMoviesList, передавая в неё данные фильмов, сохраненные в localStorage,
  // а также переданный запрос и состояние флага короткометражных фильмов isShortFilm.
  //Если в localStorage отсутствуют фильмы (например, пользователь открывает приложение в первый раз),
  //то функция загружает фильмы с сервера с помощью movies.getMovies(). Если загрузка прошла успешно,
  //данные фильмов обновляются с помощью функции updateFilteredMoviesList, и состояние isReqError устанавливается в false.
  //Если возникла ошибка при загрузке фильмов, состояние isReqError устанавливается в true, и ошибка выводится в консоль.
  //В конце, независимо от успеха или ошибки загрузки, состояние isLoading устанавливается в false.
  function searchAndFilterMovies(query) {
    localStorage.setItem("movieSearch", query)
    localStorage.setItem("shortMovies", isShortFilm)

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      updateFilteredMoviesList(movies, query, isShortFilm)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsData) => {
          updateFilteredMoviesList(cardsData, query, isShortFilm)
          setisReqError(false)
          console.log(cardsData)
        })
        .catch((err) => {
          setisReqError(true)
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  // Эффект useEffect используется для управления состоянием isNotFound.
  // Эффект выполняется при обновлении состояния filteredMovies (при изменении значения filteredMovies),
  // так как в массив зависимостей ([filteredMovies]) передан filteredMovies.
  // При выполнении эффекта проверяется наличие данных с ключом movieSearch в localStorage.
  // Если данные с ключом movieSearch присутствуют и длина массива filteredMovies равна 0,
  // значит, поиск не дал результатов, и устанавливается состояние isNotFound в true (фильмы не найдены).
  // В противном случае, если filteredMovies не пустой (содержит фильмы после фильтрации),
  // устанавливается состояние isNotFound в false (фильмы найдены).
  // Если в localStorage отсутствуют данные с ключом movieSearch,
  // то устанавливается состояние isNotFound в false (поиск не был выполнен).
  // В результате, функция эффекта обновляет состояние isNotFound на основе результата поиска фильмов
  // и обновления состояния filteredMovies
  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true)
      } else {
        setIsNotFound(false)
      }
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  // Эффект useEffect используется для инициализации состояний initialCardsMovies и filteredMovies.
  // Эффект выполняется при монтировании компонента (пустой массив зависимостей []) и проверяет,
  // есть ли в localStorage данные с ключом movies.
  // Если данные с ключом "movies" присутствуют, то извлекаются их значения, которые представляют
  // массив фильмов, и устанавливаются в состояние initialCardsMovies.
  // Затем происходит проверка наличия данных с ключом shortMovies и, если значение равно true,
  // вызывается функция filterDuration для фильтрации фильмов по длительности и установки полученных
  //  отфильтрованных данных в состояние filteredMovies. В противном случае, оригинальные данные фильмов
  //  сохраняются в состояние filteredMovies без изменений.
  //  Если в localStorage отсутствуют данные с ключом movies, то закомментированная строка setIsNotFound(true)
  //  указывает на возможность установить состояние isNotFound в true в случае, если это требуется
  //  для логики компонента (по предоставленному коду, логика отсутствует, но это может
  // быть использовано в других частях компонента).
  // В результате, функция эффекта обновляет состояния initialCardsMovies и filteredMovies
  // на основе данных, сохраненных в localStorage, при первом рендере компонента.
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCardsMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterDuration(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  return (
    <section className="movies">
      {/* Компонент хедера зависит от состояния переменной loggedIn */}
      <Header loggedIn={loggedIn} />
      {/*  Форма поиска  */}
      <SearchForm
        searchAndFilterMovies={searchAndFilterMovies}
        isShortFilm={isShortFilm}
        onFilterMovies={handleShortFilmFilterToggle}
      />
      {/*  Компонент MoviesCardList который отображает фильмы  */}
      <MoviesCardList
        cards={filteredMovies}
        isReqError={isReqError}
        isNotFound={isNotFound}
        isLoading={isLoading}
        isSavedFilms={false}
        savedMovies={savedMovies}
        handleLikeFilm={handleLikeFilm}
        ondeleteMovieOnServer={ondeleteMovieOnServer}
      />
      <Footer />
    </section>
  )
}

export default Movies
