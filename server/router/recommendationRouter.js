const Router = require('express');
const router = new Router();
const controller = require('../controllers/recommendationController');

router.post('/recommendations/:userId', controller.createRecommendations);
router.get('/recommendations/:userId', controller.getRecommendations);

module.exports = router;
