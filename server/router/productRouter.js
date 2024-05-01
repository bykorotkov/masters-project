const Router = require('express');
const router = new Router();
const controller = require('../controllers/productController');

router.get('/item', controller.getProducts);

module.exports = router;
