import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"

// Компонент SearchForm
function SearchForm({ isShortFilm, searchAndFilterMovies, onFilterMovies }) {
  // Состояние хранения введенного пользователем запроса поиска.
  const [query, setQuery] = useState("")

  const [isQueryError, setIsQueryError] = useState(false)

  // Состояние, получаемое с помощью хука useLocation для получения текущего пути.
  const location = useLocation()

  // Функция onSubmitUserForm отрабатывает при отправке формы.
  function onSubmitUserForm(e) {
    e.preventDefault()
    if (query.trim().length === 0) {
      setIsQueryError(true)
    } else {
      setIsQueryError(false)
      searchAndFilterMovies(query)
    }
  }

  // Функция handleChangeInputQuery отрабатывает при изменении значения
  // в поле ввода и обновляет состояние query новым значением.
  function handleChangeInputQuery(e) {
    setQuery(e.target.value)
  }

  // В блоке useEffect происходит проверка текущего пути URL и наличия
  // сохраненного запроса в localStorage.
  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch")
      setQuery(localQuery)
    }
  }, [location])

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={onSubmitUserForm}>
        <div className="search__input-container">
          <input
            className="search__input"
            name="query"
            id="search"
            type="text"
            placeholder="Фильм"
            onChange={handleChangeInputQuery}
            value={query || ""}
          ></input>
        </div>
        <button className="search__button" type="submit">
          Поиск
        </button>
      </form>
      <FilterCheckbox
        isShortFilm={isShortFilm}
        onFilterMovies={onFilterMovies}
      />

      {isQueryError && (
        <span className="search__form-error">Нужно ввести ключевое слово</span>
      )}
      <div className="search__border-bottom"></div>
    </section>
  )
}

export default SearchForm
