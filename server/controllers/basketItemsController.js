const BasketItem = require('../models/BasketItem');
const Basket = require('../models/Basket');
const Token = require('../models/Token');
const Product = require('../models/Product');

class basketItemsController {
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
			console.log(basket);
			if (!basket) {
				basket = new Basket({ userId: tokenData.userId });
				await basket.save();
			}

			const existingProduct = await BasketItem.findOne({ productId, basketId: basket._id });

			if (existingProduct) {
				return res.status(400).json({ message: 'Товар уже находится в корзине' });
			}

			const newProduct = new BasketItem({ productId, quantity, basketId: basket._id, price });
			await newProduct.save();
			res.status(200).json({ message: 'Товар успешно добавлен в корзину' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при добавлении товара в корзину' });
		}
	}

	async deleteFromBasket(req, res) {
		try {
			const { productId, basketId } = req.body;
			const existingProduct = await BasketItem.findOne({ productId, basketId });

			if (!existingProduct) {
				return res.status(400).json({ message: 'Товара нет в корзине' });
			}

			const basket = await Basket.findById(basketId);
			if (!basket) {
				return res.status(400).json({ message: 'Корзина не найдена' });
			}

			// if (!userId) {
			// 	return res.status(400).json({ message: 'К товару должен быть прикреплен юзер' });
			// }

			// if (userId !== deletedProduct.userId) {
			// 	return res.status(400).json({ message: 'Нет прав удалять товар у другого пользователя' });
			// }

			await BasketItem.findOneAndDelete({ productId, basketId: basket._id });
			res.status(200).json({ message: 'Товар успешно удален из корзины' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при удалении товара из корзины' });
		}
	}

	async updateBasket(req, res) {
		try {
			const { productId, quantity, basketId } = req.body;

			const updatedProduct = await BasketItem.findOne({ productId, basketId });

			if (!updatedProduct) {
				return res.status(400).json({ message: 'Товар не найден в корзине' });
			}

			const basket = await Basket.findById(basketId);
			if (!basket) {
				return res.status(400).json({ message: 'Корзина не найдена' });
			}

			// if (!userId) {
			// 	return res.status(400).json({ message: 'К товару должен быть прикреплен юзер' });
			// }

			// if (userId !== updatedProduct.userId) {
			// 	return res.status(400).json({ message: 'Нет прав обновлять товар у другого пользователя' });
			// }

			await BasketItem.findOneAndUpdate({ productId, basketId: basket._id }, { quantity });
			res.status(200).json({ message: 'Количество товара успешно обновлено в корзине' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при обновлении количества товара в корзине' });
		}
	}

	async getBasket(req, res) {
		try {
			const { basketId } = req.body;
			const basket = await Basket.findById(basketId);
			if (!basket) {
				return res.status(400).json({ message: 'Корзина не найдена' });
			}

			const basketItem = await BasketItem.find({ basketId: basket._id });
			res.json(basketItem);
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new basketItemsController();
