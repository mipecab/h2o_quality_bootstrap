import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router({mergeParams: true});

// This section will help you get a list of all the productos.
router.get("/", async (req, res) => {
  //new ObjectId(req.params.idproducto)} 
  let query = {id_lote: req.params.idlote };
  let collection = await db.collection("tapados");
  let results = await collection.find(query).toArray();
  res.send(results).status(200);
});

// This section will help you get a single product by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("tapados");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new product.
router.post("/", async (req, res) => {
  let newDocument = {
    id_lote: req.params.idlote,
    id_proveedor: req.body.id_proveedor,
    tipo_tapa: req.body.tipo_tapa,
    verificador: req.body.verificador,

  };
  let collection = await db.collection("tapados");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a product by id.
router.put("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      id_lote : req.params.idlote,
      id_proveedor: req.body.id_proveedor,
      tipo_tapa: req.body.tipo_tapa,
      verificador: req.body.verificador,

      
    }
  };

  let collection = await db.collection("tapados");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a product
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("tapados");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;