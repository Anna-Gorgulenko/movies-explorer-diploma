// Импорт функции handleSendingRequest из модуля utils.
// Функция используется для обработки ответов от сервера
import { handleSendingRequest } from "./utils"

// База данных API Яндекс Практикума c массивом фильмов в кол-ве 100 штук
export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies"

// Функция getMovies выполняет запрос к указанному API(BASE_URL) и возвращает
// как результат, массив фильмов, полученных с сервера.
export function getMovies() {
  return fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => handleSendingRequest(res))
}
