const express = require('express');
const router = express.Router();
const ctrlUnidad = require('../../controllers/logistica/unidad.controller');


//Unidades
router.get('/:id', ctrlUnidad.list);
router.post('/', ctrlUnidad.create);
router.put('/:id', ctrlUnidad.edit);
router.delete('/:id', ctrlUnidad.remove);
module.exports = router;
