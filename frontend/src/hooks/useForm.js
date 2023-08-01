import { useState, useCallback } from "react"

// Хук для управления состоянием формы
const useForm = () => {
  // Состояния формы
  const [enteredValues, setEnteredInputValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  // Обработчик события изменения значения в полях формы
  const handleChangeInput = (event) => {
    const name = event.target.name
    const value = event.target.value

    // Обновляем состояние введенных значений
    setEnteredInputValues({
      ...enteredValues,
      [name]: value,
    })

    // Обновляем состояние ошибок валидации для текущего поля
    // name с сообщением об ошибке (validationMessage)
    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    })

    setIsFormValid(event.target.closest("#form").checkValidity())
  }

  // Функция для сброса значений, ошибок и валидности формы.
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      // Устанавливаем новые значения полей формы
      setEnteredInputValues(newValues)
      // Устанавливаем новые ошибки валидации для полей формы
      setErrors(newErrors)
      // Устанавливаем новое состояние валидности формы
      setIsFormValid(newIsFormValid)
    },
    [setEnteredInputValues, setErrors, setIsFormValid]
  )

  // Возвращаем объект с состояниями и функциями управления формой
  return {
    enteredValues,
    handleChangeInput,
    isFormValid,
    errors,
    resetForm,
  }
}

export default useForm
