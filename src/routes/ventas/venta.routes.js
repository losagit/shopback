const express = require('express');
const router = express.Router();
const ctrlVenta = require('../../controllers/ventas/venta.controller');
//Ventas
router.get('/:id', ctrlVenta.list);
router.get('/lastId/:id',ctrlVenta.lastId)
router.post('/numero/', ctrlVenta.numero);
router.put('/:id', ctrlVenta.cancel);
router.get('/pdf/:id',ctrlVenta.generate)
router.post('/', ctrlVenta.create);

module.exports = router;