// Создание класса ошибки 404 и дальнейший импорт в другие компоненты
module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
};
