const Product = require('../models/Product');

class productController {
	async getProducts(req, res) {
		try {
			const products = await Product.find();
			res.json(products);
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new productController();
