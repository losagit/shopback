const express = require('express');
const router = express.Router();
const ctrlCaja = require('../../controllers/finanzas/caja.controller');
//Ventas
router.get('/:id', ctrlCaja.list);
router.get('/id/:id', ctrlCaja.listId);
router.post('/', ctrlCaja.create);
router.put('/:id', ctrlCaja.edit);
router.delete('/:id', ctrlCaja.remove);

router.get('/arqueos/:id', ctrlCaja.listArqueo);
router.post('/arqueos/abrir', ctrlCaja.open);
router.put('/arqueos/cerrar', ctrlCaja.close);
module.exports = router;