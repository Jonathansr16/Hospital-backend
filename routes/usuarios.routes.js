/* Rutas
    /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, CrearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios.controllers');
const { validarCampos } = require('../middleware/validar-campos');


const router = Router();

//Mostramos los registros
router.get('/', getUsuarios);

//Agreamos un registro
router.post('/', [
    check('nombre', "El nombre del usuario es obligatorio").not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    check('password', "El password es obligatorio").not().isEmpty(),
    validarCampos
], CrearUsuario);


//Modificamos un registro
router.put('/:id', [
    check('nombre', "El nombre del usuario es obligatorio").not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    check('role', 'El role es obligatorio').isEmail(),
    validarCampos
], actualizarUsuario);

//Borramos un Usuario
router.delete('/id_user', borrarUsuario);

module.exports =  router;



/* **********
``````````````
    NOTAS
``````````````
 ************

 Para agregar varios middleware estos se deben agregar
 entre llaves cuadradas []

 *router.get('/', [aqui van las funciones] ,getUsuarios);

*/