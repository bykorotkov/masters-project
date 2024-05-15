import { makeAutoObservable } from 'mobx';
import OrderService from '../services/OrderService';

export default class OrderStore {
	orders = [];

	constructor() {
		makeAutoObservable(this);
	}

	setOrders(orders) {
		this.orders = orders;
	}

	async createOrderFunc(name, email, phone, address, token) {
		try {
			const response = await OrderService.createOrder(name, email, phone, address, token);

			this.setOrders(response.data);
		} catch (e) {
			console.error('Произошла ошибка при создании заказа', e);
		}
	}

	async getOrders(token) {
		try {
			const response = await OrderService.getOrders(token);

			this.setOrders(response.data);
		} catch (e) {
			console.error('Произошла ошибка при получении заказа', e);
		}
	}
}
