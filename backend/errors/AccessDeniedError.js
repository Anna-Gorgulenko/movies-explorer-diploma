// Создание класса ошибки 403 и дальнейший импорт в другие компоненты
module.exports = class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
