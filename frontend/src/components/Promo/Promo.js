import React from "react"
import landingLogo from "../../images/landing-logo.svg"
import landingLogoMobile from "../../images/landingMobile-logo.svg"
import "./Promo.css"

// Компонент Promo
function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img
          className="promo__image"
          src={landingLogo}
          alt="изображение спирали для оформления приложения"
        />

        <img
          className="promo__imagemobile"
          src={landingLogoMobile}
          alt="изображение спирали для оформления приложения"
        />
      </div>
    </section>
  )
}

export default Promo
