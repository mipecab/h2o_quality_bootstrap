import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the productos.
router.get("/", async (req, res) => {
  let collection = await db.collection("productos");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single product by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("productos");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new product.
router.post("/", async (req, res) => {
  let newDocument = {
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    nombreComercial: req.body.nombreComercial,
    registroSanitario: req.body.registroSanitario,
    categoria: req.body.categoria,
    descripcion: req.body.descripcion,
    ingredientes: req.body.ingredientes,
  };
  let collection = await db.collection("productos");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a product by id.
router.put("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      codigo: req.body.codigo,
      nombre: req.body.nombre,
      nombreComercial: req.body.nombreComercial,
      registroSanitario: req.body.registroSanitario,
      categoria: req.body.categoria,
      descripcion: req.body.descripcion,
      ingredientes: req.body.ingredientes,
    }
  };

  let collection = await db.collection("productos");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a product
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("productos");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;