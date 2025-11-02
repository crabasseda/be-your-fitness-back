import { ObjectId } from "mongodb";
import db from "../../connection.js";

async function getAllRoutines() {
  const collection = await db.collection("routines");
  const routines = await collection.find({}).toArray();
  if (!routines) throw new Error("notfound");

  return routines;
}

async function getRoutineById(id) {
  const collection = await db.collection("routines");
  const query = { _id: ObjectId.createFromHexString(id) };
  const routine = await collection.findOne(query);
  if (!routine) throw new Error("notfound");

  return routine;
}

async function postRoutine(routineData) {
  const collection = await db.collection("routines");
  const results = await collection.insertOne({
    name: routineData.name,
    type: routineData.type,
    created_by: ObjectId.createFromHexString(routineData.created_by),
  });
  const inserted = await collection.findOne({ _id: results.insertedId });
  return inserted;
}

export { getAllRoutines, getRoutineById, postRoutine };
