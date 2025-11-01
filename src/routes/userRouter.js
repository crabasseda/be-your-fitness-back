import express from "express";
const router = express.Router();

import { getUserByIdController } from "../controller/userController.js";

// GET /users
router.get("/", async (req, res, next) => {
  try {
    const collection = await db.collection("users");
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

// GET /users/:id
router.get("/:id", getUserByIdController);

// POST /users

router.post("/users", async (req, res) => {
  const collection = await db.collection("users");
  const results = await collection.insertOne({});

  const inserted = await collection.findOne({ _id: results.insertedId });
  res.status(201).json(result);
});

// PATCH /users/:id

router.patch("/users/:id", async (req, res, next) => {
  const collection = await db.collection("users");
  const query = { _id: ObjectId.createFromHexString(req.params.id) };
  const updates = { $set: {} };

  const result = await collection.findOne(query);
});

export default router;
