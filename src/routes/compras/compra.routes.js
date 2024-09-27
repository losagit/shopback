const express = require('express');
const router = express.Router();
const ctrlCompra = require('../../controllers/compras/compra.controller');
//Compras
router.get('/lastId/',ctrlCompra.lastId)
router.get('/:id',ctrlCompra.list)
router.get('/pdf/:id',ctrlCompra.generate)
router.post('/', ctrlCompra.create);
router.put('/:id', ctrlCompra.cancel);
module.exports = router;