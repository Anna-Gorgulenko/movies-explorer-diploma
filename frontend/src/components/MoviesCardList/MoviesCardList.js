import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./MoviesCardList.css"
import SearchError from "../SearchError/SearchError"
import MoviesCard from "../MoviesCard/MoviesCard"
import {
  DESKTOP_CARDS_DISPLAY_LIMIT,
  TABLET_CARDS_DISPLAY_LIMIT,
  MOBILE_CARDS_DISPLAY_LIMIT,
} from "../../utils/constants"
import Preloader from "../Preloader/Preloader"

// Компонент MoviesCardList
function MoviesCardList({
  cards,
  isLoading,
  isNotFound,
  isSavedFilms,
  savedMovies,
  isReqError,
  handleLikeFilm,
  ondeleteMovieOnServer,
}) {
  const [shownMovies, setShownMovies] = useState(0)
  const { pathname } = useLocation()

  // Возвращаю сохраненный фильм из массива
  // с сохраненными фильмами
  function getMovieFromSaved(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  // Отображает количество карточек на разных разрешениях экрана, таких как
  // (Дисктоп версия, планшет версия, мобильные устройства)
  function setMoviesShownCount() {
    const display = window.innerWidth
    if (display > 1180) {
      setShownMovies(12) // 12 карточек с фильмами
    } else if (display > 767) {
      setShownMovies(8) // 8 карточек с фильмами
    } else {
      setShownMovies(5) // 5 карточек с фильмами
    }
  }

  useEffect(() => {
    setMoviesShownCount()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", setMoviesShownCount)
    }, 500)
  })

  // Добавляю количество карточек с фильмами при нажатии на кнопку "Ещё"
  // на разных разрешениях экрана
  function expandMoviesDisplay() {
    const display = window.innerWidth
    if (display > 1180) {
      setShownMovies(shownMovies + DESKTOP_CARDS_DISPLAY_LIMIT) // 3 карточки
    } else if (display > 767) {
      setShownMovies(shownMovies + TABLET_CARDS_DISPLAY_LIMIT) // 2 карточки
    } else {
      setShownMovies(shownMovies + MOBILE_CARDS_DISPLAY_LIMIT) // 2 карточки
    }
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getMovieFromSaved(savedMovies, card)}
                    cards={cards}
                    card={card}
                    handleLikeFilm={handleLikeFilm}
                    isSavedFilms={isSavedFilms}
                    ondeleteMovieOnServer={ondeleteMovieOnServer}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-container"></div>
            </>
          ) : (
            <>
              {/* Список карточек фильмов.
Каждая карточка фильма это компонент MoviesCard */}
              <ul className="cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getMovieFromSaved(savedMovies, card)}
                    cards={cards}
                    card={card}
                    handleLikeFilm={handleLikeFilm}
                    isSavedFilms={isSavedFilms}
                    ondeleteMovieOnServer={ondeleteMovieOnServer}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-container">
                {/* Когда количество фильмов больше shownMovies, отображаю кнопка "Ещё */}
                {cards.length > shownMovies ? (
                  <button
                    className="cards__button"
                    onClick={expandMoviesDisplay}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList
