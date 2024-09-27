const conn = require('../../config/database');
const ctrl = {};

ctrl.list = (req, res) => {
    const { id } = req.params;
	const query = `select pr.id_producto,pr.codigo,pr.nombre,pr.descripcion,
    sc.nombre as subcategoria,ct.nombre as categoria 
    from Productos pr
    left join Subcategorias sc on sc.id_subcategoria = pr.id_subcategoria
    left join Categorias ct on ct.id_categoria = sc.id_categoria
    left join Empresas em on em.id_empresa = ct.id_empresa
    where em.id_empresa = ?`
    conn.query(query,[id] ,(err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}
ctrl.listCatalogo = (req, res) => {
    const { id } = req.params;
	const query = `select pr.codigo,pr.nombre as producto,pr.descripcion,ps.*,un.cantidad_unidad,un.codigo as codigosunat,un.nombre as unidad from Presentaciones ps
    left join Productos pr on pr.id_producto = ps.id_producto
    left join Unidades un on un.id_unidad = ps.id_unidad
    left join Empresas em on un.id_empresa = em.id_empresa
    where em.id_empresa = ?`
    conn.query(query,[id] ,(err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}
ctrl.listStock = (req, res) => {
    const {id} = req.params;
	const query = 'call spStock(?);'
    conn.query(query,[id] ,(err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
}

ctrl.create = (req, res) => {
    conn.query('INSERT INTO Productos SET ?', req.body, (err, result) => {
        if (!err) {
            console.log('guardado con exito');
        } else {
            console.log(err);
        }
    })
}
ctrl.createCatalogo = (req, res) => {
    conn.query('INSERT INTO Presentaciones(precio_venta,id_producto,id_unidad) values(?,?,?)', [req.body.precio_venta,req.body.id_producto,req.body.id_unidad], (err, result) => {
        if (!err) {
            console.log('guardado con exito');
        } else {
            console.log(err);
        }
    })
}
ctrl.edit = (req, res) => {
    const { id } = req.params;
    console.log(id);
    conn.query('UPDATE Productos SET ? WHERE id_producto = ?', [req.body, id], (err, result) => {
        if (!err) {
            console.log('editado con exito');
        } else {
            console.log(err);
        }
    })
}
ctrl.editCatalogo = (req, res) => {
    const { id } = req.params;
    console.log(id);
    conn.query('UPDATE Catalogo SET ? WHERE id_presentacion = ?', [req.body, id], (err, result) => {
        if (!err) {
            console.log('editado con exito');
        } else {
            console.log(err);
        }
    })
}
ctrl.remove = (req, res) => {
    const { id } = req.params;
    conn.query('DELETE from Productos WHERE id_producto = ?', [id], (err, result) => {
        if (!err) {
            console.log('eliminado con exito');
        } else {
            console.log(err);
        }
    })
}
ctrl.removeCatalogo = (req, res) => {
    const { id } = req.params;
    conn.query('DELETE from Presentaciones WHERE id_presentacion = ?', [id], (err, result) => {
        if (!err) {
            console.log('eliminado con exito');
        } else {
            console.log(err);
        }
    })
}

module.exports = ctrl;