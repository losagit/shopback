const express = require('express');
const router = express.Router();
const ctrlProducto = require('../../controllers/logistica/producto.controller');


//Unidades
router.get('/:id', ctrlProducto.list);
router.post('/', ctrlProducto.create);
router.put('/:id', ctrlProducto.edit);
router.delete('/:id', ctrlProducto.remove);

module.exports = router;