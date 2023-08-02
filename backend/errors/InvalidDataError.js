// Создание класса ошибки 400 и дальнейший импорт в другие компоненты
module.exports = class InvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
