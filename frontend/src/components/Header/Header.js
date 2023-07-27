import React from "react"
import { Link, NavLink } from "react-router-dom"
import "./Header.css"
import logo from "../../images/logo.svg"
import account from "../../images/profileAnna.svg"
import Navigation from "../Navigation/Navigation"
import mobileMenu from "../../images/menu-button.svg"

// Компонент Header и мобильное меню Navigation встроено
function Header({ loggedIn }) {
  const [isClicked, setIsClicked] = React.useState(false)

  // Смены цвета для активной ссылки Фильмы и Сохраненые фильмы
  const setActiveColorLink = ({ isActive }) =>
    isActive ? "header__button_active" : "header__button"

  // Открытие мобильного меню
  function handleOpenMobileMenu() {
    setIsClicked(true)
  }

  // Закрытие мобильного меню
  function handleCloseMobileMenu() {
    setIsClicked(false)
  }

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <Link to="/" className="form__logo">
            <img src={logo} alt="логотип сайта" />
          </Link>
          <div className="header__button-container">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-green">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className="header header_color">
          <Link to="/" className="header__logo">
            <img src={logo} alt="логотип приложения" />
          </Link>
          <div className="header__button-container header__button-container_films">
            <NavLink to="/movies" className={setActiveColorLink}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className={setActiveColorLink}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__button-container">
            <Link to="/profile" className="header__button-account">
              <img
                className="header__account-icon"
                src={account}
                alt="изображение иконки аккаунта в приложении"
              />
            </Link>
            <button
              className="header__menu-button"
              onClick={handleOpenMobileMenu}
            >
              <img src={mobileMenu} alt="кнопка мобильного меню" />
            </button>
          </div>
          {isClicked ? (
            <Navigation handleCloseMobileMenu={handleCloseMobileMenu} />
          ) : (
            ""
          )}
        </header>
      )}
    </>
  )
}

export default Header
