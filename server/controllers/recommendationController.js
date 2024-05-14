const Basket = require('../models/Basket');
const BasketItem = require('../models/BasketItem');
const Product = require('../models/Product');
const Recommendation = require('../models/Recommendation');

class recommendationController {
	async createRecommendations(req, res) {
		try {
			const { userId } = req.params;

			const baskets = await Basket.find({ userId });
			const basketIds = baskets.map(basket => basket._id);

			const basketItems = await BasketItem.find({ basketId: { $in: basketIds } });

			const productCountMap = {};
			basketItems.forEach(item => {
				const productId = item.productId.toString();
				const quantity = item.quantity;

				if (productCountMap[productId]) {
					productCountMap[productId] += quantity;
				} else {
					productCountMap[productId] = quantity;
				}
			});

			console.log(productCountMap);

			const popularProducts = Object.keys(productCountMap)
				.sort((a, b) => productCountMap[b] - productCountMap[a])
				.slice(0, 5); // Получаем топ-5 популярных товаров

			const recommendations = new Recommendation({
				userId,
				recommendedProducts: popularProducts.map(productId => ({ productId }))
			});

			await recommendations.save();

			res.json(recommendations);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Ошибка при получении рекомендаций' });
		}
	}

	async getRecommendations(req, res) {
		try {
			const { userId } = req.params;

			const recommendations = await Recommendation.findOne({ userId });

			if (!recommendations) {
				return res.status(404).json({ message: 'Рекомендации не найдены' });
			}

			res.json(recommendations.recommendedProducts);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Ошибка при получении рекомендаций' });
		}
	}
}

module.exports = new recommendationController();
