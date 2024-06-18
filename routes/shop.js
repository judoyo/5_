const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');


const router = express.Router();


router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// delete 를 productId로 인식 할수 있기 때문에 먼저온다.
//router.get('/products/delete', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getChekout);

module.exports = router;