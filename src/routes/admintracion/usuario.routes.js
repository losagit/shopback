const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const ctrlUsuario = require('../../controllers/administracion/usuario.controller');
const middleUsuario = require('../../middleware/usuario.middleware');

//Login
router.post('/register', middleUsuario.validateRegister,ctrlUsuario.create);
router.post('/login',ctrlUsuario.login);
//
router.get('/roles', ctrlUsuario.listRoles);
router.get('/:id', ctrlUsuario.list);
router.put('/:id', ctrlUsuario.edit);
router.delete('/:id', ctrlUsuario.remove);

module.exports = router;