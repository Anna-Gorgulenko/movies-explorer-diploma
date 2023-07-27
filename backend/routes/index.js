const router = require('express').Router();
// Создание экземпляра роутера Express.

const auth = require('../middlewares/auth');
// Импорт middleware для аутентификации пользователя.

const userRouter = require('./users');
const movieRouter = require('./movies');
// Импорт маршрутов для пользователей и фильмов.

const { createUser, login } = require('../controllers/users');
// Импорт обработчиков для регистрации и входа пользователя.

const {
  loginValidator,
  createUserValidator,
} = require('../middlewares/validation');
// Импорт валидаторов для проверки данных при регистрации и входе пользователя.

const NotFoundError = require('../errors/NotFoundError');
// Импорт пользовательской ошибки для обработки ошибки 404 - страница не найдена.

router.post('/signup', createUserValidator, createUser);
// Маршрут POST для регистрации пользователя. Перед обработкой запроса,
// данные проходят через валидацию с помощью валидатора createUserValidator.
// Затем используется обработчик createUser для создания нового пользователя.

router.post('/signin', loginValidator, login);
// Маршрут POST для входа пользователя. Перед обработкой запроса,
// данные проходят через валидацию с помощью валидатора loginValidator.
// Затем используется обработчик login для выполнения входа пользователя.

router.use(auth);
// Применение middleware auth ко всем маршрутам, расположенным ниже этой строки.
// Это обеспечивает аутентификацию пользователя перед обработкой этих маршрутов.

// Использование маршрутов пользователей и фильмов. Они
// обрабатываются в соответствующих модулях userRouter и movieRouter.
router.use('/', userRouter);
router.use('/', movieRouter);

// Маршрут-перехватчик, который будет обрабатывать все запросы, не совпадающие
// с предыдущими маршрутами. И выкидывает ошибку 404 - с информацией страница не найдена.
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
