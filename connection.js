// import dotenv from "dotenv";
// import { MongoClient } from "mongodb";

// dotenv.config();

// const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri);

// let connection;
// try {
//   connection = await client.connect();
// } catch (error) {
//   console.log(error);
// }

// const db = connection.db("be_your_fitness_app");
// export default db;

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB Atlas:", error.message);
    process.exit(1);
  }
}

//insert data

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("be_your_fitness_app");
//     const users = database.collection("users");

//     const trainersResult = await users.insertMany(trainersData);
//     const trainerIds = Object.values(trainersResult.insertedIds);

//     console.log(`✅ ${trainersResult.insertedCount} entrenadores insertados`);

//     // Reemplazar trainer_index por el ObjectId correspondiente
//     const athletesWithTrainerId = athletesData.map((athlete) => ({
//       ...athlete,
//       trainer_id: trainerIds[athlete.trainer_index],
//     }));
//     athletesWithTrainerId.forEach((a) => delete a.trainer_index);

//     console.log("🚀 Insertando atletas...");
//     const athletesResult = await users.insertMany(athletesWithTrainerId);
//     console.log(`✅ ${athletesResult.insertedCount} atletas insertados`);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
