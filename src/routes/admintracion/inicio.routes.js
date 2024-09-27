const express = require('express');
const router = express.Router();
const ctrlInicio = require('../../controllers/administracion/inicio.controller');
//Ventas
router.get('/graficoventasmes/:id', ctrlInicio.graficoventaMes);
router.get('/graficocomprasmes/:id', ctrlInicio.graficocompraMes);
router.get('/ventasmes/:id', ctrlInicio.ventaMes);
router.get('/ventasdia/:id', ctrlInicio.ventaDia);
router.get('/comprasmes/:id', ctrlInicio.compraMes);
router.get('/comprasdia/:id', ctrlInicio.compraDia);

module.exports = router;