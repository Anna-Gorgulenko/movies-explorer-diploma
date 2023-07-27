import React from "react"
import Form from "../Form/Form"
import { EMAIL_VALIDATOR, USERNAME_VALIDATOR } from "../../utils/constants"
import useForm from "../hooks/useForm"
import "../Form/Form.css"

// Компонент Register
function Register({ isLoading, onRegister }) {
  // Использует хук для управления формой.
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  // При отправке формы вызывается функция onRegister,
  // передавая в нее введенные пользователем данные.
  function onSubmitUserForm(event) {
    event.preventDefault()
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  // Компонент Form для отображения формы.
  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
      onSubmit={onSubmitUserForm}
      isDisabled={!isFormValid}
      isLoading={isLoading}
    >
      <label className="form__label">
        Имя
        <input
          className="form__input"
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
        <span className="form__input-error">{errors.name}</span>
      </label>
      <label className="form__label">
        E-mail
        <input
          className="form__input"
          name="email"
          id="email"
          type="email"
          placeholder="email"
          onChange={handleChangeInput}
          pattern={EMAIL_VALIDATOR}
          value={enteredValues.email || ""}
          required
        />
        <span className="form__input-error">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          className="form__input"
          name="password"
          id="password"
          type="password"
          placeholder="password"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
          required
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Register
