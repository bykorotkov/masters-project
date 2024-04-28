const Router = require('express');
const router = new Router();
const controller = require('../controllers/orderController');

router.post('/orders', controller.createOrder);
router.get('/orders', controller.getOrders);
// router.get('/orders/:id', controller.getOrderById);
// router.put('/orders/:id', controller.updateOrderStatus);

module.exports = router;
