// Создание класса ошибки 409 и дальнейший импорт в другие компоненты
module.exports = class DuplicateDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
