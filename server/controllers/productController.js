const ProductItem = require('../models/Product');

class productController {
	async getProductItems(req, res) {
		try {
			const productItems = await ProductItem.find();
			res.json(productItems);
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new productController();
