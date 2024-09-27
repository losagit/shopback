//import
const express = require('express');
const cors = require('cors');
const app = express();

//config
const PORT = process.env.PORT || 3030
var corsPort = { origin: "shopclientv.vercel.app" };
//middleware
app.use(cors(corsPort));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//------------ routes -------------------
//Logistica
app.use('/api/unidades',require('./src/routes/logistica/unidad.routes'));
app.use('/api/categorias',require('./src/routes/logistica/categoria.routes'));
app.use('/api/subcategorias',require('./src/routes/logistica/subcategoria.routes'));
app.use('/api/productos',require('./src/routes/logistica/producto.routes'));
app.use('/api/catalogo',require('./src/routes/logistica/catalogo.routes'));
//compras
app.use('/api/compras',require('./src/routes/compras/compra.routes'));
app.use('/api/proveedores',require('./src/routes/compras/proveedor.routes'));
//administracion
app.use('/api/usuarios',require('./src/routes/admintracion/usuario.routes'));
//ventas
app.use('/api/clientes',require('./src/routes/ventas/cliente.routes'));
app.use('/api/ventas',require('./src/routes/ventas/venta.routes'));
//finanzas
app.use('/api/cajas',require('./src/routes/finanzas/caja.routes'));
app.use('/api/inicio',require('./src/routes/admintracion/inicio.routes'));
//running
app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
})
