const Order = require('../models/Order');
const Token = require('../models/Token');
const Basket = require('../models/Basket');
const User = require('../models/User');

const createOrder = async (req, res) => {
	try {
		const { name, email, phone, token } = req.body;

		const tokenData = await Token.findOne({ token });

		if (!tokenData) {
			return res.status(400).json({ message: 'Пользователь не найден' });
		}

		if (!name || !email || !phone) {
			return res.status(400).json({ message: 'Не введены обязательные для заказа данные' });
		}

		const existingBasket = await Basket.findOne({ userId: tokenData.userId });
		if (!existingBasket) {
			return res.status(400).json({ message: 'Корзина не заполнена. Нечего заказывать' });
		}

		const userId = tokenData.userId;

		const createdAt = Date.now();

		const newOrder = await Order.create({ name, email, phone, createdAt, userId });
		await newOrder.save();
		res.status(201).json({ message: 'Товар успешно добавлен' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getOrders = async (req, res) => {
	try {
		const { token } = req.body;

		const tokenData = await Token.findOne({ token });

		if (!tokenData) {
			return res.status(400).json({ message: 'Пользователь не найден' });
		}

		// const existingOrder = await Order.findOne({ userId: tokenData.userId });
		// if (!existingOrder) {
		// 	return res.status(400).json({ message: 'Такого заказа не существует' });
		// }

		const userId = tokenData.userId;

		const order = await Order.find({ userId });

		if (order.length === 0) {
			return res.status(400).json({ message: 'У пользователя нет заказов' });
		}

		res.status(200).json(order);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// const updateOrderStatus = async (req, res) => {
// 	try {
// 		const { status } = req.body;
// 		const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
// 		if (!updatedOrder) {
// 			return res.status(404).json({ message: 'Заказ не найден' });
// 		}
// 		res.status(200).json(updatedOrder);
// 	} catch (error) {
// 		res.status(400).json({ message: error.message });
// 	}
// };

// const getOrderById = async (req, res) => {
// 	try {
// 		const order = await Order.findById(req.params.id);
// 		if (!order) {
// 			return res.status(404).json({ message: 'Заказ не найден' });
// 		}
// 		res.status(200).json(order);
// 	} catch (error) {
// 		res.status(400).json({ message: error.message });
// 	}
// };

module.exports = { createOrder, getOrders };
