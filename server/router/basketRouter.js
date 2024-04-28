const Router = require('express');
const router = new Router();
const controller = require('../controllers/basketController');

router.post('/', controller.addToBasket);
router.delete('/', controller.deleteFromBasket);
router.put('/', controller.updateBasket);
router.get('/get-cart', controller.getBasket);

module.exports = router;
