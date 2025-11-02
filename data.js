// data.js

export const trainersData = [
  {
    name: "Laura",
    surname: "Martínez",
    email: "laura.martinez@example.com",
    username: "lauram",
    password: "$2b$10$abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
    role: 1, // trainer
    trainer_id: null,
  },
  {
    name: "Carlos",
    surname: "Gómez",
    email: "carlos.gomez@example.com",
    username: "carlosg",
    password: "$2b$10$123456abcdef7890123456abcdef7890123456abcdef7890123456ab",
    role: 1, // trainer
    trainer_id: null,
  },
];

export const athletesData = [
  {
    name: "Ana",
    surname: "Ruiz",
    email: "ana.ruiz@example.com",
    username: "anaruiz",
    password: "$2b$10$987654abcdef3210987654abcdef3210987654abcdef3210987654ab",
    role: 0, // athlete
    trainer_index: 0, // entrenadora Laura
  },
  {
    name: "Javier",
    surname: "Torres",
    email: "javier.torres@example.com",
    username: "javiert",
    password: "$2b$10$654321abcdef0987654321abcdef0987654321abcdef0987654321ab",
    role: 0, // athlete
    trainer_index: 1, // entrenador Carlos
  },
  {
    name: "Marta",
    surname: "López",
    email: "marta.lopez@example.com",
    username: "martal",
    password: "$2b$10$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefab",
    role: 0, // athlete
    trainer_index: 0, // entrenadora Laura
  },
];

export const routinesData = [];
