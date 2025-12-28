import express from "express";

const router = express.Router();
const EXERCISE_DB_BASE_URL = "https://exercisedb-api1.p.rapidapi.com/api/v1";

async function fetchExerciseDB(endpoint) {
  const response = await fetch(`${EXERCISE_DB_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.EXERCISEDB_API_KEY,
      "X-RapidAPI-Host": "exercisedb-api1.p.rapidapi.com",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ExerciseDB API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// GET /api/exercises
router.get("/exercises", async (req, res, next) => {
  try {
    const { offset = "0", limit = "25", equipments, bodyParts } = req.query;

    const params = new URLSearchParams({ offset, limit });

    if (equipments) {
      params.set("equipments", equipments);
    }
    if (bodyParts) {
      params.set("bodyParts", bodyParts);
    }

    const data = await fetchExerciseDB(`/exercises?${params}`);
    res.json(data);
  } catch (error) {
    console.error("Error fetching exercises:", error.message);
    next(error);
  }
});

// GET /api/exercises/:id
router.get("/exercises/:id", async (req, res, next) => {
  try {
    const data = await fetchExerciseDB(`/exercises/${req.params.id}`);
    res.json(data);
  } catch (error) {
    console.error("Error fetching exercise:", error.message);
    next(error);
  }
});

// GET /api/equipments
router.get("/equipments", async (req, res, next) => {
  try {
    const data = await fetchExerciseDB("/equipments");
    res.json(data);
  } catch (error) {
    console.error("Error fetching equipments:", error.message);
    next(error);
  }
});

// GET /api/bodyparts
router.get("/bodyparts", async (req, res, next) => {
  try {
    const data = await fetchExerciseDB("/bodyparts");
    res.json(data);
  } catch (error) {
    console.error("Error fetching bodyparts:", error.message);
    next(error);
  }
});

export default router;
