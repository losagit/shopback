const conn = require('../../config/database');
const ctrl = {};

ctrl.graficoventaMes = (req, res) => {
  const {id} = req.params;
  let sql = `select total,fecha
  from Ventas vt
  left join Usuarios us on us.id_usuario = vt.id_usuario
  left join Empresas em on em.id_empresa = us.id_empresa
  where em.id_empresa = ?
  group by fecha,total`
  conn.query(sql,[id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}
ctrl.graficocompraMes = (req, res) => {
  const {id} = req.params;
  let sql = `select total,fecha
  from Compras cp
  left join Usuarios us on us.id_usuario = cp.id_usuario
  left join Empresas em on em.id_empresa = us.id_empresa
  where em.id_empresa = ?
  group by fecha,total`
  conn.query(sql,[id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}

ctrl.ventaMes = (req, res) => {
  const {id} = req.params;
  let sql = `select sum(total) as Ventas_mes 
    from Ventas vt
    left join Usuarios us on us.id_usuario = vt.id_usuario
    left join Empresas em on em.id_empresa = us.id_empresa
    where us.id_usuario = ? and vt.estado = 'Emitido'
    and fecha between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') AS DATE) and LAST_DAY(NOW())`
  conn.query(sql,[id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}
ctrl.ventaDia = (req, res) => {
  const {id} = req.params;
  let sql = `select sum(total) as Ventas_dia 
  from Ventas vt
  left join Usuarios us on us.id_usuario = vt.id_usuario
  left join Empresas em on em.id_empresa = us.id_empresa
  where us.id_usuario = ? and
  fecha = curdate() and vt.estado = 'Emitido'
  `
  conn.query(sql, [id],(err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}

ctrl.compraMes = (req, res) => {
  const {id} = req.params;
  let sql = `select sum(total) as Compras_mes 
  from Compras cp
  left join Usuarios us on us.id_usuario = cp.id_usuario
  left join Empresas em on em.id_empresa = us.id_empresa
  where us.id_usuario = ? and  
  fecha between CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') AS DATE) and LAST_DAY(NOW());`
  conn.query(sql,[id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}



ctrl.compraDia = (req, res) => {
  const {id} = req.params;
  let sql = `select sum(total) as Compras_dia 
  from Compras cp
  left join Usuarios us on us.id_usuario = cp.id_usuario
  left join Empresas em on em.id_empresa = us.id_empresa
  where us.id_usuario = ? and   
  fecha = curdate()`
  conn.query(sql,[id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}

module.exports = ctrl;