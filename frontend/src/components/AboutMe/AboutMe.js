import React from "react"
import avatar from "../../images/AnnaCard.png"
import "./AboutMe.css"

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h3 className="about-me__subtitle">Анна Горгуленко</h3>
          <h4 className="about-me__information">
            Фронтенд-разработчик, 18+ лет
          </h4>
          <p className="about-me__history">
            Я живу в Санкт-Петербурге, закончила магистратура по экономике. Я
            люблю гулять, петь и танцевать. Люблю решать задачки и поэтому
            работаю в отделе по внедрению новых программных продуктов для
            автоматизации бизнеса. Недавно освоила новые языки и инструменты на
            курсах Яндекс Практикума.{" "}
            {/*С полученными знаниями я смогу еще больше
            помогать людям в освобождении их от рутинных дел и задач.*/}
          </p>
          <a
            className="about-me__link"
            href="https://github.com/Anna-Gorgulenko"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={avatar} className="about-me__avatar" alt="моя аватарка" />
      </div>
    </section>
  )
}

export default AboutMe
