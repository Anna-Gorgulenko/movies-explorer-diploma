import React from "react"
import Form from "../Form/Form"
import { EMAIL_VALIDATOR } from "../../utils/constants"
import useForm from "../../hooks/useForm"
import "../Form/Form.css"

// Компонент Login
function Login({ onAuthorization, isLoading }) {
  // Использование хука useForm
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()
  // Функция отправки формы
  function onSubmitUserForm(event) {
    event.preventDefault()
    // Вызов функции onAuthorization с введенными значениями полей формы
    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }
  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      onSubmit={onSubmitUserForm}
      isDisabled={!isFormValid}
      isLoading={isLoading}
      noValidate
    >
      <label className="form__label">
        E-mail
        <input
          className="form__input"
          name="email"
          placeholder="email"
          id="email"
          type="email"
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
          placeholder="password"
          id="password"
          type="password"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
          required
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Login
