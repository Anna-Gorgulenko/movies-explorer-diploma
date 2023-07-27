import React from "react"
import failure from "../../images/popupFailure.svg"
import success from "../../images/popupSuccess.svg"
import "../InfoTooltip/InfoTooltip.css"

// Попап редактирования данных
function InfoToolTipUpdate(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <div className="popup__container">
        {props.isUpdate ? (
          <>
            <img
              className="popup__signup-image"
              src={`${success}`}
              alt="Редактирование прошла успешно."
            />
            <p className="popup__signup-title">
              Редактирование прошло успешно!
            </p>
          </>
        ) : (
          <>
            <img
              className="popup__signup-image"
              src={`${failure}`}
              alt="Редактирование было выполнено некорректно."
            />
            <p className="popup__signup-title">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  )
}

export default InfoToolTipUpdate
