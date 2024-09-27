const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conn = require('../../config/database');
const ctrl = {};

ctrl.list = (req, res) => {
    const { id } = req.params;
    const query = `SELECT us.*,ro.*
    FROM Usuarios us
    left join Usuario_roles ur on ur.id_usuario = us.id_usuario
    left join Roles ro on ro.id_rol = ur.id_rol
    where id_empresa = ?`
    conn.query(query,[id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}

ctrl.listRoles = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * from Roles`
    conn.query(query,[id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}



ctrl.create = (req, res) => {
    const consult = `SELECT us.*,em.razon_social,em.ruc,em.token FROM Usuarios us inner join Empresas em on em.id_empresa = us.id_empresa WHERE us.username = ${conn.escape(req.body.username)}`;
    conn.query(consult, (err, result) => {
        if(result.length){
            return res.status(409).send({
                msg:'EL usuario ya existe'
            });
        }else{
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if(err){
                    return res.status(500).send({
                        msg:err
                    })
                }else{
                    const query= `INSERT INTO Usuarios(nombre,username,password,tipo_doc,num_doc,telefono,estado,sede,id_empresa) values(?,?,?,?,?,?,?,?,?)`;
                    conn.query(query, [req.body.nombre,req.body.username,hash,req.body.tipo_doc,req.body.num_doc,req.body.telefono,req.body.estado,req.body.sede,req.body.id_empresa], (err, result) => {
                        if (!err) {
                            console.log('guardado con exito');
                            const idusuario = result.insertId;
                            const query= `INSERT INTO Usuario_roles(id_usuario,id_rol,fecha) values(?,?,now())`;
                            conn.query(query, [idusuario,req.body.id_rol], (err, result) => {
                                if (!err) {
                                    console.log('rol asignado');
                                } else {
                                    console.log(err);
                                }
                            })
                        } else {
                            console.log(err);
                        }
                    })
                }
            })
        }
    })
}

ctrl.login = (req,res,next) => {
    const consult = `SELECT us.*,em.*,ro.*,
    cj.id_caja,cj.nombre as caja,cj.numero_caja
    FROM Usuarios us
    left join Usuario_roles ur on ur.id_usuario = us.id_usuario
    left join Cajas cj on cj.id_usuario = us.id_usuario
    left join Roles ro on ur.id_rol = ro.id_rol 
    left join Empresas em on em.id_empresa = us.id_empresa 
    WHERE us.username = ${conn.escape(req.body.username)}`
    conn.query(consult, (err,result) =>{
        if(err){
            throw err;
            return res.status(400).send({
                msg:err
            });
        }

        if(!result.length){
            return res.status(401).send({
                msg: 'Usuario o contraseña incorrecto!'
            });
        }

        bcrypt.compare(req.body.password,result[0]['password'],(bErr,bResult) => {
            if(bErr){
                throw bErr;
                return res.status(401).send({
                    msg:'Usuario o contraseña incorrecta'
                });
            }

            if(bResult){
                const token = jwt.sign({
                    username:result[0].username,
                    id_usuario:result[0].id_usuario
                },'KEY54710',{expiresIn:'86400'});

                return res.status(200).send({
                    msg:'Bienvenid@!',
                    token,
                    user:result[0]
                });
            }

            return res.status(401).send({
                msg:'Usuario o contraseña incorrecta'
            });
        });
    })
}

ctrl.edit = (req, res) => {
    const { id } = req.params;
    conn.query('UPDATE Usuarios SET ? WHERE id_Usuario = ?', [req.body, id], (err, result) => {
        if (!err) {
            console.log('editado con exito');
        } else {
            console.log(err);
        }
    })
}

ctrl.remove = (req, res) => {
    const { id } = req.params;
    conn.query('DELETE from Usuarios WHERE id_Usuario = ?', [id], (err, result) => {
        if (!err) {
            console.log('eliminado con exito');
        } else {
            console.log(err);
        }
    })
}

module.exports = ctrl;