import React from "react"
import { Link, NavLink } from "react-router-dom"
import account from "../../images/profileAnna.svg"
import "./Navigation.css"

function Navigation({ handleCloseMobileMenu }) {
  // Функция для смены цвета для активной ссылки
  const setActiveColorLink = ({ isActive }) =>
    isActive ? "navigation__link_active" : "navigation__link"

  return (
    <section className="navigation">
      <div className="navigation__overlay-page">
        <div className="navigation__overlay-container"></div>
        <div className="navigation__menu">
          <button
            className="navigation__close-button"
            onClick={handleCloseMobileMenu}
          ></button>
          <nav className="navigation__links">
            <NavLink to="/" className={setActiveColorLink}>
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              onClick={handleCloseMobileMenu}
              className={setActiveColorLink}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              onClick={handleCloseMobileMenu}
              className={setActiveColorLink}
            >
              Сохранённые фильмы
            </NavLink>
          </nav>
          <Link
            to="/profile"
            className="navigation__account-button"
            onClick={handleCloseMobileMenu}
          >
            <img src={account} alt="аккаунт" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Navigation
