import React from "react"
import { Link } from "react-router-dom"
import logo from "../../images/logo.svg"
import "./Form.css"

function Form({
  link,
  linkText,
  question,
  title,
  onSubmit,
  isDisabled,
  buttonText,
  children,
  isLoading,
}) {
  return (
    <div className="form">
      <div className="form__container">
        <Link to="/" className="form__logo">
          <img src={logo} alt="логотип приложения" />
        </Link>
        <h3 className="form__title">{title}</h3>
        <form
          className="form__content"
          id="form"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={
              isDisabled || isLoading
                ? "form__button-save form__button-save_inactive"
                : "form__button-save"
            }
            disabled={isDisabled ? true : false}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
        <p className="form__text">
          {question}
          <a href={link} className="form__link">
            {linkText}
          </a>
        </p>
      </div>
    </div>
  )
}

export default Form
