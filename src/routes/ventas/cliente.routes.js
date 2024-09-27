const express = require('express');
const router = express.Router();
const ctrlCliente = require('../../controllers/ventas/cliente.controller');
//Clientes
router.get('/:id', ctrlCliente.list);
router.post('/', ctrlCliente.create);
router.put('/:id', ctrlCliente.edit);
router.delete('/:id', ctrlCliente.remove);

module.exports = router;