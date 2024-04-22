const Order = require('../models/Order');

const createOrder = async (req, res) => {
	try {
		const { user, cartItems } = req.body;
		const newOrder = await Order.create({ user, cartItems });
		res.status(201).json(newOrder);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const updateOrderStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
		if (!updatedOrder) {
			return res.status(404).json({ message: 'Заказ не найден' });
		}
		res.status(200).json(updatedOrder);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (!order) {
			return res.status(404).json({ message: 'Заказ не найден' });
		}
		res.status(200).json(order);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = { createOrder, updateOrderStatus, getOrders, getOrderById };
