const conn = require('../../config/database');
const ctrl = {};

ctrl.list = (req, res) => {
    const {id} = req.params;
    let sql = `SELECT sc.*,ct.nombre as categoria FROM Subcategorias sc
    left join Categorias ct on ct.id_categoria = sc.id_categoria
    where ct.id_empresa =?` 
    conn.query(sql,[id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}

ctrl.create = (req, res) => {
    conn.query('INSERT INTO Subcategorias SET ?', req.body, (err, result) => {
        if (!err) {
            console.log('guardado con exito');
        } else {
            console.log(err);
        }
    })
}
ctrl.edit = (req, res) => {
    const { id } = req.params;
    conn.query('UPDATE Subcategorias SET ? WHERE id_subcategoria = ?', [req.body, id], (err, result) => {
        if (!err) {
            console.log('editado con exito');
        } else {
            console.log(err);
        }
    })
}

ctrl.remove = (req, res) => {
    const { id } = req.params;
    conn.query('DELETE from Subcategorias WHERE id_subcategoria = ?', [id], (err, result) => {
        if (!err) {
            console.log('eliminado con exito');
        } else {
            console.log(err);
        }
    })
}

module.exports = ctrl;