const express = require('express');
const router = express.Router();
const ctrlSubcategoria = require('../../controllers/logistica/subcategoria.controller');
//Subcategorias
router.get('/:id', ctrlSubcategoria.list);
router.post('/', ctrlSubcategoria.create);
router.put('/:id', ctrlSubcategoria.edit);
router.delete('/:id', ctrlSubcategoria.remove);

module.exports = router;