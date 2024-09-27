const conn = require('../../config/database');
const generatePDF = require('../../lib/generarPDF');
const ctrl = {};

ctrl.numero = (req, res) => {
  const { tc,id_usuario ,id_empresa } = req.body;
  let sql = `SELECT serie,correlativo + 1 as correlativo 
  FROM Ventas vt
  left join Usuarios us on us.id_usuario = vt.id_usuario
  left join Empresas em on em.id_empresa = us.id_empresa
  where tipo_comprobante = ? and us.id_usuario = ? and em.id_empresa = ?
  ORDER BY correlativo DESC limit 1`
  conn.query(sql, [tc,id_usuario ,id_empresa], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }

  })
}

ctrl.lastId = (req, res) => {
  const {id} = req.params;
  let sql = `SELECT id_venta  FROM Ventas vt 
  left join Usuarios us on us.id_usuario = vt.id_usuario 
  left join Empresas em on em.id_empresa = us.id_empresa
  where em.id_empresa = ?
  ORDER BY vt.id_venta desc limit 1`
  conn.query(sql,[id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}

ctrl.list = (req, res) => {
  const { id } = req.params;
  let sql = `SELECT id_venta,date_format(fecha,'%d/%m/%Y') as fecha,tipo_comprobante,
  concat(serie,'-',correlativo) as numero,total,vt.estado,
  cl.nombre as cliente,cl.num_doc,us.nombre as vendedor 
  FROM Ventas vt 
  left join Clientes cl on cl.id_cliente = vt.id_cliente 
  left join Usuarios us on us.id_usuario = vt.id_usuario 
  left join Empresas em on em.id_empresa = us.id_empresa
  where us.id_usuario = ?
  group by vt.id_venta
  ORDER BY vt.id_venta desc`
  conn.query(sql, [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}


ctrl.create = (req, res) => {

  const venta = {
    fecha: req.body.fecha,
    tipo_comprobante: req.body.tipo_comprobante,
    serie: req.body.serie,
    correlativo: req.body.correlativo,
    id_cliente: req.body.id_cliente,
    id_usuario: req.body.id_usuario,
    total: req.body.total,
    estado: req.body.estado
  }

  let detalles = req.body.detalles;

  conn.query('INSERT INTO Ventas SET ?', venta, (err, result) => {
    if (!err) {
      console.log('guardado con exito');
      const idVenta = result.insertId;
      const consult = 'INSERT INTO Detalle_ventas(cantidad,precio_venta,id_unidad,id_producto,id_venta) values(?,?,?,?,?)'
      detalles.forEach(det => {
        conn.query(consult, [det.cantidad, det.precio_venta,det.id_unidad ,det.id_producto, idVenta], (error) => {
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
  conn.query(`update Ventas set estado = 'Anulado' where id_venta = ? `, [id], (err, result) => {
    if (!err) {
      console.log('anulado con exito');
    } else {
      console.log(err);
    }
  })
}

ctrl.generate = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT id_venta,date_format(fecha,'%d/%m/%Y') as fecha,tipo_comprobante,
  concat(serie,'-',correlativo) as numero,vt.estado,
  cl.nombre as cliente,cl.tipo_doc,cl.num_doc,cl.telefono,us.nombre  as usuario,
  round((total -(total*0.18)),2) as subtotal,round((total*0.18),2) as igv,
  round(total,2) as total,em.razon_social as emp_razon_social,em.ruc emp_ruc,
  em.direccion as emp_direccion,em.telefono,if(vt.estado='Anulado','Anulado',NULL) as estado
  FROM Ventas vt 
  left join Clientes cl on cl.id_cliente = vt.id_cliente 
  left join Usuarios us on us.id_usuario = vt.id_usuario 
  left join Empresas em on us.id_empresa = em.id_empresa 
  where id_venta = ?`;
  conn.query(sql, [id], async (err, rows, fields) => {
    if (!err) {
      const result = Object.values(JSON.parse(JSON.stringify(rows)));
      const consult = `select dv.cantidad,un.codigo as unidad,pr.nombre as producto,pr.descripcion,
      dv.precio_venta,(dv.cantidad * dv.precio_venta) as importe 
      from Detalle_ventas dv 
      left join Productos pr on pr.id_producto = dv.id_producto 
      left join Unidades un on un.id_unidad = dv.id_unidad
      where id_venta = ?`;
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