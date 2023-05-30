import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("lotes");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("lotes");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    codigo_lote: req.body.codigo_lote,
    cantidad_producida: req.body.cantidad_producida,
    contenido_neto: req.body.contenido_neto,
    id_producto: req.body.id_producto,
    fecha_produccion: req.body.fecha_produccion,
    hora: req.body.hora,
    fecha_vencimiento: req.body.fecha_vencimiento,
    turno: req.body.turno,
    impresion_ink_jet: req.body.impresion_ink_jet,
    verificador: req.body.verificador,
    fecha_inicio: req.body.fecha_inicio,
    fecha_final: req.body.fecha_final,
    codigo_producto: req.body.codigo_producto,
    verificador_recibe: req.body.verificador_recibe,
    fecha_rec_ruta: req.body.fecha_rec_ruta,
    pacas_enfardadas: req.body.pacas_enfardadas,
    unidades_finales: req.body.unidades_finales,
    observaciones: req.body.observaciones,

  };
  let collection = await db.collection("lotes");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.put("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
        codigo_lote: req.body.codigo_lote,
        cantidad_producida: req.body.cantidad_producida,
        contenido_neto: req.body.contenido_neto,
        id_producto: req.body.id_producto,
        fecha_produccion: req.body.fecha_produccion,
        hora: req.body.hora,
        fecha_vencimiento: req.body.fecha_vencimiento,
        turno: req.body.turno,
        impresion_ink_jet: req.body.impresion_ink_jet,
        verificador: req.body.verificador,
        fecha_inicio: req.body.fecha_inicio,
        fecha_final: req.body.fecha_final,
        codigo_producto: req.body.codigo_producto,
        verificador_recibe: req.body.verificador_recibe,
        fecha_rec_ruta: req.body.fecha_rec_ruta,
        pacas_enfardadas: req.body.pacas_enfardadas,
        unidades_finales: req.body.unidades_finales,
        observaciones: req.body.observaciones,
    }
  };

  let collection = await db.collection("lotes");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("lotes");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;