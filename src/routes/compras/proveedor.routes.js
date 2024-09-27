const express = require('express');
const router = express.Router();
const ctrlProveedor = require('../../controllers/compras/proveedor.controller');
//Proveedors
router.get('/:id', ctrlProveedor.list);
router.post('/', ctrlProveedor.create);
router.put('/:id', ctrlProveedor.edit);
router.delete('/:id', ctrlProveedor.remove);

module.exports = router;