import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router({mergeParams: true});

// This section will help you get a list of all the productos.
router.get("/", async (req, res) => {
  //new ObjectId(req.params.idproducto)} 
  let query = {id_tapado: req.params.idtapado };
  let collection = await db.collection("tapado_detalles");
  let results = await collection.find(query).toArray();
  res.send(results).status(200);
});

// This section will help you get a single product by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("tapado_detalles");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new product.
router.post("/", async (req, res) => {
  let newDocument = {
    id_tapado: req.params.idtapado,
    fecha: req.body.fecha,
    hora: req.body.hora,
    metodo_tr: req.body.metodo_tr,
    e1: req.body.e1,
    e2: req.body.e2,
    e3: req.body.e3,
    e4: req.body.e4,
    e5: req.body.e5,
    e6: req.body.e6,
    e7: req.body.e7,
    e8: req.body.e8,
    cumplimiento_mtr: req.body.cumplimiento_mtr,
    observacion_mtr: req.body.observacion_mtr,
    metodo_aa: req.body.metodo_aa,
    e1_ma: req.body.e1_ma,
    e2_ma: req.body.e2_ma,
    accion_correctiva: req.body.accion_correctiva,
    cumplimiento_maa: req.body.cumplimiento_maa,
  };
  let collection = await db.collection("tapado_detalles");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a product by id.
router.put("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      id_tapado: req.params.idtapado,
      fecha: req.body.fecha,
      hora: req.body.hora,
      metodo_tr: req.body.metodo_tr,
      e1: req.body.e1,
      e2: req.body.e2,
      e3: req.body.e3,
      e4: req.body.e4,
      e5: req.body.e5,
      e6: req.body.e6,
      e7: req.body.e7,
      e8: req.body.e8,
      cumplimiento_mtr: req.body.cumplimiento_mtr,
      observacion_mtr: req.body.observacion_mtr,
      metodo_aa: req.body.metodo_aa,
      e1_ma: req.body.e1_ma,
      e2_ma: req.body.e2_ma,
      accion_correctiva: req.body.accion_correctiva,
      cumplimiento_maa: req.body.cumplimiento_maa,
    }
  };

  let collection = await db.collection("tapado_detalles");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a product
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("tapado_detalles");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;