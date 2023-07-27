import React from "react"
import arrow from "../../images/arrow.svg"
import "./Portfolio.css"

// Компонент Portfolio
function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__links">
        <a
          className="portfolio__link portfolio__link-border"
          href="https://anna-gorgulenko.github.io/how-to-learn/"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__title-link">Статичный сайт</p>
          <img
            className="portfolio__image-arrow"
            src={arrow}
            alt="изображение стрелки для перехода по ссылке на сайт"
          />
        </a>
        <a
          className="portfolio__link portfolio__link-border"
          href="https://anna-gorgulenko.github.io/russian-travel/"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__title-link">Адаптивный сайт</p>
          <img
            className="portfolio__image-arrow"
            src={arrow}
            alt="изображение стрелки для перехода по ссылке на сайт"
          />
        </a>
        <a
          className="portfolio__link"
          href="https://anna-gorgulenko.github.io/react-mesto-auth/"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__title-link">Одностраничное приложение</p>
          <img
            className="portfolio__image-arrow"
            src={arrow}
            alt="изображение стрелки для перехода по ссылке на сайт"
          />
        </a>
      </nav>
    </section>
  )
}

export default Portfolio
