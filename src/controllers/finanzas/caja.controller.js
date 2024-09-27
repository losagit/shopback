const conn = require('../../config/database');
const ctrl = {};

ctrl.list = (req, res) => {
  const {id} = req.params;
  let sql = `select cj.*,us.nombre as usuario from Cajas cj
  left join Usuarios us on cj.id_usuario = us.id_usuario
  left join Empresas em on em.id_empresa = us.id_empresa
  where em.id_empresa = ?`
  conn.query(sql,[id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}
ctrl.listId = (req, res) => {
  const {id} = req.params;
  let sql = `select * from Cajas where id_caja = ?`
  conn.query(sql,[id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}

ctrl.listArqueo = (req, res) => {
  const {id} = req.params;
  let sql = `select id_arqueo,date_format(fecha,'%d/%m/%Y') as fecha,
  monto_inicial,total_ventas,monto_final,ac.id_caja
  from Arqueo_caja ac
  left join Cajas cj on cj.id_caja = ac.id_caja
  where cj.id_caja= ?
  order by id_arqueo desc`
  conn.query(sql,[id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}

ctrl.open = (req, res) => {
  const sql = `INSERT INTO Arqueo_caja set ?`
  conn.query(sql, req.body, (err, result) => {
      if (!err) {
          console.log('registro con exito');
          const sql = `update Cajas set estado = 'abierta' where id_caja = ?`
          conn.query(sql, [req.body.id_caja], (err, result) => {
            if (!err) {
                console.log('caja abierta');
            } else {
                console.log(err);
            }
        })
      } else {
          console.log(err);
      }
  })
}
ctrl.close = (req, res) => {
  const sql = `UPDATE Arqueo_caja SET ? WHERE id_arqueo = ?`
  conn.query(sql, [req.body,req.body.id_arqueo], (err, result) => {
      if (!err) {
          console.log('editado con exito');
          const sql = `update Cajas set estado = 'cerrada' where id_caja = ?`
          conn.query(sql, [req.body.id_caja], (err, result) => {
            if (!err) {
                console.log('caja cerrada');
            } else {
                console.log(err);
            }
        })
      } else {
          console.log(err);
      }
  })
}

ctrl.create = (req, res) => {

  const sql = `INSERT INTO Cajas set ?`
  conn.query(sql, req.body, (err, result) => {
      if (!err) {
          console.log('guardado con exito');
      } else {
          console.log(err);
      }
  })
}
ctrl.edit = (req, res) => {
  const { id } = req.params;
  conn.query('UPDATE Cajas SET ? WHERE id_caja = ?', [req.body, id], (err, result) => {
      if (!err) {
          console.log('editado con exito');
      } else {
          console.log(err);
      }
  })
}

ctrl.remove = (req, res) => {
  const { id } = req.params;
  conn.query('DELETE from Cajas WHERE id_caja = ?', [id], (err, result) => {
      if (!err) {
          console.log('eliminado con exito');
      } else {
          console.log(err);
      }
  })
}


module.exports = ctrl;