import React, { useState, useEffect } from "react"
import Header from "../Header/Header"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import { filterMovies, filterDuration } from "../../utils/utils"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"

// Компонент Register
function SavedMovies({ loggedIn, ondeleteMovieOnServer, savedMovies }) {
  // Указывает, пуст ли список отфильтрованных фильмов.
  const [isNotFound, setIsNotFound] = useState(false)
  //  Хранит текущий поисковый запрос, введенный пользователем.
  const [searchQuery, setSearchQuery] = useState("")
  // Список фильмов, соответствующих поисковому запросу и фильтрации.
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  // Указывает, включен ли фильтр короткометражек.
  const [isShortFilm, setisShortFilm] = useState(false)

  // Функция используется для обработки переключения состояния isShortFilm.
  function handleShortFilmFilterToggle() {
    setisShortFilm(!isShortFilm)
  }

  //Функция принимает параметр query - поисковой запрос, введенный пользователем.
  // Она используется для обновления состояния searchQuery с помощью функции
  // setSearchQuery. Это позволяет сохранить текущий поисковый запрос в компоненте.
  function searchAndFilterMovies(query) {
    setSearchQuery(query)
  }

  // useEffect отрабатывает при изменении состояния filteredMovies.
  // Он проверяет длину отфильтрованных фильмов filteredMovies
  // и обновляет состояние isNotFound.
  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  //useEffect отрабатывает при изменении состояний savedMovies, isShortFilm
  // или searchQuery.
  useEffect(() => {
    const moviesCardList = filterMovies(savedMovies, searchQuery)
    setFilteredMovies(
      isShortFilm ? filterDuration(moviesCardList) : moviesCardList
    )
  }, [savedMovies, isShortFilm, searchQuery])

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onFilterMovies={handleShortFilmFilterToggle}
        searchAndFilterMovies={searchAndFilterMovies}
      />
      <MoviesCardList
        cards={filteredMovies}
        isSavedFilms={true}
        savedMovies={savedMovies}
        ondeleteMovieOnServer={ondeleteMovieOnServer}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  )
}

export default SavedMovies
