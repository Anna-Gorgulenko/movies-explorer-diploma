// Создание класса ошибки 401 и дальнейший импорт в другие компоненты
module.exports = class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
