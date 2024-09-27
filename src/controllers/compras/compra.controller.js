const conn = require('../../config/database');
const generatePDF = require('../../lib/generarPDF');
const ctrl = {};

ctrl.lastId = (req, res) => {
  let sql = "select id_compra from Compras order by id_compra desc limit 1"
  conn.query(sql, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}

ctrl.list = (req, res) => {
  const {id} = req.params;
  let sql = `SELECT id_compra,date_format(fecha,'%d/%m/%Y') as fecha,tipo_comprobate,concat(serie,'-',correlativo) as numero,total,cp.estado,
pv.razon_social as proveedor,pv.ruc,us.nombre as usuario 
FROM dbshop.Compras cp 
inner join Proveedores pv on pv.id_proveedor = cp.id_proveedor 
inner join Usuarios us on us.id_usuario = cp.id_usuario
left join Empresas em on em.id_empresa = us.id_empresa
where em.id_empresa = ?
group by cp.id_compra
ORDER BY cp.id_compra desc`
  conn.query(sql,[id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}
ctrl.create = (req, res) => {

  const compra = {
    fecha: req.body.fecha,
    tipo_comprobate: req.body.tipo_comprobante,
    serie: req.body.serie,
    correlativo: req.body.correlativo,
    id_proveedor: req.body.id_proveedor,
    id_usuario: req.body.id_usuario,
    total: req.body.total,
    estado: req.body.estado
  }

  let detalles = req.body.detalles;

  conn.query('INSERT INTO Compras SET ?', compra, (err, result) => {
    if (!err) {
      console.log('guardado con exito');
      const idCompra = result.insertId;
      const consult = 'INSERT INTO Detalle_compras(cantidad,precio_compra,precio_venta,id_unidad,id_producto,id_compra) values(?,?,?,?,?,?)'
      detalles.forEach(det => {
        conn.query(consult, [det.cantidad, det.precio_compra,det.precio_venta ,det.id_unidad,det.id_producto, idCompra], (error) => {
          if (!err) {
            console.log('detalles guardados');
          } else {
            console.log(err);
          }
        })
      });
    } else {
      console.log(err);
    }
  })
}

ctrl.cancel = (req, res) => {
  const { id } = req.params;
  conn.query(`update Compras set estado = 'Anulado' where id_compra = ? `, [id], (err, result) => {
    if (!err) {
      console.log('anulado con exito');
    } else {
      console.log(err);
    }
  })
}

ctrl.generate = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT date_format(fecha,'%d/%m/%Y') as fecha,tipo_comprobate,
  concat(serie,'-',correlativo) as numero,pv.razon_social as proveedor,pv.ruc,pv.direccion,
  us.nombre  as usuario,round((total -(total*0.18)),2) as subtotal,round((total*0.18),2) as igv,
  round(total,2) as total,em.razon_social as emp_razon_social,
  em.ruc emp_ruc,em.direccion as emp_direccion,em.telefono,if(cp.estado='Anulado','Anulado',NULL) as estado
  FROM dbshop.Compras cp 
  left join Proveedores pv on pv.id_proveedor = cp.id_proveedor 
  left join Usuarios us on us.id_usuario = cp.id_usuario 
  left join Empresas em on us.id_empresa = em.id_empresa 
  where id_compra = ?`;
  conn.query(sql, [id], async (err, rows, fields) => {
    if (!err) {
      const result = Object.values(JSON.parse(JSON.stringify(rows)));
      const consult = `select dc.cantidad,un.codigo as unidad,pr.nombre as producto,pr.descripcion,
      round(dc.precio_compra / dc.cantidad,1) as valor_unitario,dc.precio_compra
      from Detalle_compras dc 
      left join Productos pr on pr.id_producto = dc.id_producto
      left join Unidades un on un.id_unidad = dc.id_unidad
      where id_compra =?`;
      conn.query(consult, [id], async (err, rows) => {
        if (!err) {
          const dets = Object.values(JSON.parse(JSON.stringify(rows)));
          result[0].detalles = dets;
          const pdf = await generatePDF(result[0]);
          res.set("Content-Type", "application/pdf");
          res.send(pdf);
        } else {
          console.log(err);
        }
      })
    } else {
      console.log(err);
    }
  })
}


module.exports = ctrl;