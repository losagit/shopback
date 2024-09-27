const express = require('express');
const router = express.Router();
const ctrlCategoria = require('../../controllers/logistica/categoria.controller');
//Categorias
router.get('/:id', ctrlCategoria.list);
router.post('/', ctrlCategoria.create);
router.put('/:id', ctrlCategoria.edit);
router.delete('/:id', ctrlCategoria.remove);

module.exports = router;