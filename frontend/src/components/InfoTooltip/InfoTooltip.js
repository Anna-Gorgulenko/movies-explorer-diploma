import React from "react"
import failure from "../../images/popupFailure.svg"
import success from "../../images/popupSuccess.svg"
import "./InfoTooltip.css"

// Попап регистрации на сайте
function InfoToolTip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <div className="popup__container">
        {props.isSuccess ? (
          <>
            <img
              className="popup__signup-image"
              src={`${success}`}
              alt="Регистрация прошла успешно."
            />
            <p className="popup__signup-title">
              Вы успешно зарегистрировались! Добро пожаловать на сайт!
            </p>
          </>
        ) : (
          <>
            <img
              className="popup__signup-image"
              src={`${failure}`}
              alt="Регистрация не была выполнена."
            />
            <p className="popup__signup-title">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}
        <button
          className="popup__close-button"
          onClick={props.onClose}
          type="button"
        ></button>
      </div>
    </div>
  )
}

export default InfoToolTip
