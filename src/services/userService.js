import { ObjectId } from "mongodb";
import db from "../../connection.js";

async function getAllUsers() {
  const collection = await db.collection("users");
  const users = await collection.find({}).toArray();
  if (!users) throw new Error("notfound");

  return users;
}

async function getUserById(id) {
  const collection = await db.collection("users");
  const query = { _id: ObjectId.createFromHexString(id) };
  const user = await collection.findOne(query);
  if (!user) throw new Error("notfound");

  return user;
}

export { getAllUsers, getUserById };
