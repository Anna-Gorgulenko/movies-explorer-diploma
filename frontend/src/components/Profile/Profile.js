import React, { useEffect, useContext, useState } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import useForm from "../hooks/useForm"
import Header from "../Header/Header"
import { EMAIL_VALIDATOR, USERNAME_VALIDATOR } from "../../utils/constants"
import "./Profile.css"

// Компонент Profile
function Profile({ loggedIn, signOut, onUpdateUser, isLoading }) {
  // Текущий пользователь из подписки контекста
  const currentUser = useContext(CurrentUserContext)

  // Использование хука useForm для управления формой
  const { enteredValues, errors, handleChangeInput, isFormValid, resetForm } =
    useForm()

  // Состояние переменных для отслеживания изменений полей у формы
  const [isLastValues, setIsLastValues] = useState(false)

  // Отправка формы
  function onSubmitUserForm(event) {
    event.preventDefault()
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    })
  }

  // Проверка, являются ли значения полей формы
  // последними сохраненными значениями или нет
  useEffect(() => {
    if (
      currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email
    ) {
      setIsLastValues(true)
    } else {
      setIsLastValues(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues])

  // Сброс формы когда обновляем пользователя
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
        <form
          id="form"
          className="profile__form"
          onSubmit={onSubmitUserForm}
          noValidate
        >
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              name="name"
              id="name"
              type="text"
              minLength="2"
              maxLength="40"
              placeholder="name"
              onChange={handleChangeInput}
              value={enteredValues.name || ""}
              pattern={USERNAME_VALIDATOR}
              required
            />
            <span className="profile__input-error">{errors.name}</span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              name="email"
              id="email"
              type="email"
              placeholder="email"
              onChange={handleChangeInput}
              pattern={EMAIL_VALIDATOR}
              value={enteredValues.email || ""}
              required
            />
            <span className="profile__input-error">{errors.email}</span>
          </label>
          <button
            type="submit"
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isLoading || isLastValues
                ? "profile__button-save form__button-save_inactive"
                : "profile__button-save"
            }
          >
            Редактировать
          </button>
          <button
            type="button"
            className="profile__button-exit"
            onClick={signOut}
          >
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  )
}

export default Profile
