import { makeAutoObservable } from 'mobx';
import BasketService from '../services/BasketService';

export default class BasketStore {
	products = [];

	constructor() {
		makeAutoObservable(this);
	}

	async addToBasket(productId, quantity, token) {
		try {
			const response = await BasketService.addToBasket(productId, quantity, token);
			if (response.status === 200) {
				this.products.push({ productId, quantity });
				console.log('Данные добавлены');
			} else {
				console.error('Ошибка при добавлении товара в корзину');
			}
		} catch (error) {
			console.error('Произошла ошибка при добавлении товара в корзину:', error);
		}
	}

	async deleteFromBasket(productId, token) {
		try {
			const response = await BasketService.deleteFromBasket(productId, token);
			if (response.status === 200) {
				this.products = this.products.filter(product => product.productId !== productId);
				console.log('Данные удалены');
			}
		} catch (error) {
			console.error('Произошла ошибка при удалении данных', error);
		}
	}

	async updateBasket(productId, quantity, token) {
		try {
			const response = await BasketService.updateBasket(productId, quantity, token);
			if (response.status === 200) {
				this.products.forEach(product => {
					if (product.productId === productId) {
						product.quantity = quantity;
					}
				});
			} else {
				console.error('Ошибка при обновлении корзины');
			}
		} catch (error) {
			console.error('Произошла ошибка при обновлении данных', error);
		}
	}

	async getBasket(token) {
		try {
			const response = await BasketService.getBasket(token);
			if (response.status === 200) {
				const basketData = response.data;
				this.products = basketData;
			} else {
				console.error('Ошибка при получении корзины');
			}
		} catch (error) {
			console.error('Произошла ошибка при получении корзины', error.message);
		}
	}
}
