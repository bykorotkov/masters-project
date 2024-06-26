const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('../config');
const Token = require('../models/Token');

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles
	};
	return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// return res.status(400).json({ message: 'Поля не могут быть пустыми', errors });
				return res.status(400).json({ message: errors.errors.map(err => err.msg), errors });
			}
			const { username, password } = req.body;
			const candidate = await User.findOne({ username });
			if (candidate) {
				return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
			}

			const hashPassword = bcrypt.hashSync(password, 7);
			const userRole = await Role.findOne({ value: 'USER' });
			const user = new User({ username, password: hashPassword, roles: [userRole.value] });
			await user.save();
			return res.json({ message: 'Пользователь успешно зарегистрирован' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка регистрации' });
		}
	}
	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username });
			if (!user) {
				return res.status(400).json({ message: `Пользователь ${username} не найден` });
			}
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.status(400).json({ message: `Введите верный пароль` });
			}

			const token = generateAccessToken(user._id, user.roles);

			const saveToken = new Token({ userId: user._id, token });
			await saveToken.save();
			return res.json({ token, userId: user._id, username });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка логинизации' });
		}
	}
	async logout(req, res) {
		try {
			return res.json({ message: 'Пользователь успешно вышел из системы' });
		} catch {
			console.log(e);
			res.status(400).json({ message: 'Ошибка выхода из личного кабинета' });
		}
	}
	async getUsers(req, res) {
		try {
			// const userRole = new Role()
			// const adminRole = new Role({value: 'ADMIN'})
			// await userRole.save()
			// await adminRole.save()
			const users = await User.find();
			res.json(users);
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new authController();
