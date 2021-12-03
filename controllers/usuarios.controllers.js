const Usuario = require('../models/usuarios.model');
const { response } = require('express');
const bcrypt = require('bcryptjs');

const getUsuarios = async(req, resp) => {

    const usuarios = await Usuario.find({}, 'nombre, email, role');

    resp.json({
        ok: true,
        usuarios
    });
}

const CrearUsuario = async(req, resp = response) => {

    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return resp.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            });
        }

        const usuario = new Usuario(req.body);


        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        resp.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.warn(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


actualizarUsuario = async(req, resp) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: "El usuario con ese id no existe"
            });
        }

          //Actualizaciones
          const {password, google, email, ...campos}= req.body;

        if(usuarioDB.email != email) {
       
            const emailExiste= await Usuario.findOne({ email });

            if(emailExiste) {
                return resp.status(400).json({
                    ok: false,
                    msg: 'Ya existe el usuario con este email'
                })
            }
        }

        campos.email= email;
        usuarioUpdate= await campos.findByIdAndUpdate(uid, campos, { new: true} );
      

        resp.json({
            ok: true,
         usuario: usuarioUpdate
        });

    } catch (error) {
        console.warn(error);
        resp.status(500).json({
            ok: false,
            msg: "error inesperado"
        });
    }
}


module.exports = {
    getUsuarios,
    CrearUsuario,
    actualizarUsuario
}