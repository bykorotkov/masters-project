const BasketItem = require('../models/BasketItem');
const Basket = require('../models/Basket');
const Token = require('../models/Token');

class basketController {
	async addToBasket(req, res) {
		try {
			const { productId, quantity, token } = req.body;

			const tokenData = await Token.findOne({ token });

			if (!tokenData) {
				return res.status(400).json({ message: 'Пользователь не найден' });
			}

			if (!productId) {
				return res.status(400).json({ message: 'Такого товара не существует' });
			}

			if (!quantity && quantity <= 0) {
				return res.status(400).json({ message: 'Товара нет в наличии' });
			}

			// const productData = await Product.findOne({ _id: productId });
			const price = 500;

			let basket = await Basket.findOne({ orderId: null });
			if (!basket) {
				basket = new Basket({ userId: tokenData.userId });
				await basket.save();
			}

			const existingProduct = await BasketItem.findOne({ productId, basketId: basket._id.toString() });

			if (existingProduct) {
				return res.status(400).json({ message: 'Товар уже находится в корзине' });
			}

			const newProduct = new BasketItem({ productId, quantity, basketId: basket._id, price });
			await newProduct.save();

			const basketItem = await BasketItem.find({ basketId: basket._id });
			res.status(200).json({ products: basketItem, message: 'Товар успешно добавлен в корзину' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при добавлении товара в корзину' });
		}
	}

	async deleteFromBasket(req, res) {
		try {
			const token = req.headers.authorization.replace('Bearer ', '');
			const { productId } = req.body;

			const tokenData = await Token.findOne({ token });

			if (!tokenData) {
				return res.status(400).json({ message: 'Пользователь не найден' });
			}

			if (!productId) {
				return res.status(400).json({ message: 'Такого товара не существует' });
			}

			const basket = await Basket.findOne({ userId: tokenData.userId });
			if (!basket) {
				return res.status(400).json({ message: 'Корзина не найдена' });
			}

			const existingProduct = await BasketItem.findOne({ productId, basketId: basket._id });

			if (!existingProduct) {
				return res.status(400).json({ message: 'Товара нет в корзине' });
			}

			await BasketItem.findOneAndDelete({ productId, basketId: basket._id });

			// const productsInBasket = await BasketItem.find({ basketId: basket._id });
			// if (productsInBasket.length === 0) {
			// 	// Удаляем корзину, если в ней больше нет товаров
			// 	await Basket.findByIdAndDelete(basket._id);
			// 	return res.status(200).json({ message: 'Товар успешно удален из корзины. Корзина пуста и была удалена.' });
			// }

			const basketItem = await BasketItem.find({ basketId: basket._id });

			res.status(200).json({ products: basketItem, message: 'Товар успешно удален из корзины' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при удалении товара из корзины' });
		}
	}

	async updateBasket(req, res) {
		try {
			const { productId, quantity, token } = req.body;

			const tokenData = await Token.findOne({ token });

			if (!tokenData) {
				return res.status(400).json({ message: 'Пользователь не найден' });
			}

			const basket = await Basket.findOne({ userId: tokenData.userId });
			if (!basket) {
				return res.status(400).json({ message: 'Корзина не найдена' });
			}

			const existingProduct = await BasketItem.findOne({ productId, basketId: basket._id });

			if (!existingProduct) {
				return res.status(400).json({ message: 'Товар не найден в корзине' });
			}

			await BasketItem.findOneAndUpdate({ productId, basketId: basket._id }, { quantity });
			const basketItem = await BasketItem.find({ basketId: basket._id });
			res.status(200).json({ products: basketItem, message: 'Количество товара успешно обновлено в корзине' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при обновлении количества товара в корзине' });
		}
	}

	async getBasket(req, res) {
		try {
			const token = req.headers.authorization.replace('Bearer ', '');

			const tokenData = await Token.findOne({ token });

			if (!tokenData) {
				return res.status(400).json({ message: 'Пользователь не найден' });
			}

			const basket = await Basket.findOne({ userId: tokenData.userId });
			if (!basket) {
				return res.status(400).json({ message: 'Корзина не найдена' });
			}

			const basketItem = await BasketItem.find({ basketId: basket._id });
			res.json(basketItem);

			if (!basketItem) {
				return res.status(400).json({ message: 'Корзина пустая' });
			}
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка получения данных о корзине' });
		}
	}
}

module.exports = new basketController();
