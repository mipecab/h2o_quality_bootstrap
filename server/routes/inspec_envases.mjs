import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router({mergeParams: true});

// This section will help you get a list of all the productos.
router.get("/", async (req, res) => {
  //new ObjectId(req.params.idproducto)} 
  let query = {id_lote: req.params.idlote };
  let collection = await db.collection("inspec_envases");
  let results = await collection.find(query).toArray();
  res.send(results).status(200);
});

// This section will help you get a single product by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("inspec_envases");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new product.
router.post("/", async (req, res) => {
  let newDocument = {
    id_lote : req.params.idlote,
    codigo_envase: req.body.codigo_envase,
    paca1: req.body.paca1,
    paca2: req.body.paca2,
    paca3: req.body.paca3,
    fecha: req.body.fecha,
    hora: req.body.hora, 
    correcciones: req.body.correcciones,
    observaciones: req.body.observaciones,
    responsable: req.body.responsable
  };
  let collection = await db.collection("inspec_envases");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a product by id.
router.put("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      id_lote : req.params.idlote,
      codigo_envase: req.body.codigo_envase,
      paca1: req.body.paca1,
      paca2: req.body.paca2,
      paca3: req.body.paca3,
      fecha: req.body.fecha,
      hora: req.body.hora, 
      correcciones: req.body.correcciones,
      observaciones: req.body.observaciones,
      responsable: req.body.responsable
    }
  };

  let collection = await db.collection("inspec_envases");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a product
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("inspec_envases");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;