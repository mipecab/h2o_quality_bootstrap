import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken"
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import ubicaciones from "./routes/ubicaciones.mjs"
import productos from "./routes/productos.mjs";
import profisicoquimicas from "./routes/profisicoquimicas.mjs";
import promicrobiologicas from "./routes/promicrobiologicas.mjs";
import prootrascaracteristicas from "./routes/prootrascaracteristicas.mjs";
import lotes from "./routes/lotes.mjs";
import inspec_envases from "./routes/inspec_envases.mjs";
import proveedores from "./routes/proveedores.mjs";
import tapados from "./routes/tapados.mjs";
import tapado_detalles from "./routes/tapado_detalles.mjs";

import inspec_llenado from "./routes/inspec_llenado.mjs";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5050;
const app = express();

// import routes - JWT - Register/Login
const authRoutes = require('./routes/auth');


app.use(cors());
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// you can nest routers by attaching them as middleware:
productos.use('/:idproducto/fisicoquimicas', profisicoquimicas);
productos.use('/:idproducto/microbiologicas', promicrobiologicas);
productos.use('/:idproducto/otrascaracteristicas', prootrascaracteristicas);
lotes.use('/:idlote/tapados', tapados);
tapados.use('/:idtapado/tapado_detalles', tapado_detalles);

app.use("/proveedores", proveedores);
lotes.use('/:idlote/inspec_envases', inspec_envases);
lotes.use('/:idlote/inspec_llenado', inspec_llenado);

app.use("/record", records);
// import routes
// import routes

// Conexión a Base de datos -usado para JWT
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ppwhw8x.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))
// -usado para JWT
const verifyToken = require('./routes/verify-token');

// route middlewares -usado para JWT
app.use('/api/user', authRoutes);
app.use("/admin/ubicaciones", verifyToken, ubicaciones); // verifyToken Se solicita primero token JWT

app.use("/productos", verifyToken, productos); //verifyToken Se solicita primero token JWT
app.use("/lotes", lotes);
app.use("/tapados", tapados);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});