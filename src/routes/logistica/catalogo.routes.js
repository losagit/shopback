const express = require('express');
const router = express.Router();
const ctrlProducto = require('../../controllers/logistica/producto.controller');

router.get('/:id', ctrlProducto.listCatalogo);
router.get('/stock/:id', ctrlProducto.listStock);
router.post('/', ctrlProducto.createCatalogo);
router.put('/:id', ctrlProducto.editCatalogo);
router.delete('/:id', ctrlProducto.removeCatalogo);

module.exports = router;