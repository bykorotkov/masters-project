import $base from '../http/api';

export default class OrderService {
	static async createOrder(name, email, phone, address, token) {
		return $base.post('/orders', { name, email, phone, address, token });
	}

	static async getOrders(token) {
		return $base.get('/orders', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}
}
