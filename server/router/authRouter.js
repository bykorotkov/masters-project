const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
	'/registration',
	[
		check('username', 'Имя пользователя не может быть пустым').notEmpty().withMessage('Заполните имя пользователя'),
		check('password', 'Пароль должен быть больше 4 и меньше 10 символов')
			.isLength({ min: 4, max: 10 })
			.withMessage('Пароль должен быть больше 4 и меньше 10 символов')
	],
	controller.registration
);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);
router.post('/logout', controller.logout);

module.exports = router;
