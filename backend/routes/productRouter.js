const express = require('express');
const productControllers = require('../controllers/productControllers');
const router = express.Router();

router.get('/', productControllers.getAllproducts);
router.get('/initialize', productControllers.initialize);
router.get('/transcations', productControllers.transcations);
router.get('/statistics', productControllers.statistics);
router.get('/bar-chart-stats', productControllers.barChartStats);
router.get('/categories', productControllers.uniqueCategories);
router.get('/combinedResult', productControllers.combinedResult);
module.exports = router;
