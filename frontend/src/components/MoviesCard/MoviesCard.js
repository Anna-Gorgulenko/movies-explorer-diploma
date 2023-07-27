import React from "react"
import { durationConverter } from "../../utils/utils"
import "./MoviesCard.css"

//Компонент MoviesCard отображает карточку фильма.
function MoviesCard({
  card,
  isSavedFilms,
  savedMovies,
  saved,
  handleLikeFilm,
  ondeleteMovieOnServer,
}) {
  // Удаления фильма
  function onDelete() {
    ondeleteMovieOnServer(card)
  }

  //Функция если фильм сохранен, отрабатывает функция ondeleteMovieOnServer с удалением
  // соответствующего фильма из сохраненных фильмов, иначе
  // отрабатывает функция handleLikeFilm для выбранной карточки.
  function onCardClick() {
    if (saved) {
      ondeleteMovieOnServer(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  const cardLikeButtonClassName = `${
    saved ? "card__like-button card__like-button_active" : "card__like-button"
  }`

  return (
    <>
      <li className="card" key={card.id}>
        <a href={card.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="card__photo"
            alt={card.nameRU}
            src={
              isSavedFilms
                ? card.image
                : `https://api.nomoreparties.co/${card.image.url}`
            }
          />
        </a>
        <div className="card__info">
          <div className="card__title-container">
            <h2 className="card__title">{card.nameRU}</h2>
            <span className="card__time">
              {/* Функция durationConverter конвертирует в формат времени по длительности фильма. */}
              {durationConverter(card.duration)}
            </span>
          </div>
          {isSavedFilms ? (
            <button
              type="button"
              className="card__delete-button"
              onClick={onDelete}
            ></button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={onCardClick}
            ></button>
          )}
        </div>
      </li>
    </>
  )
}

export default MoviesCard
