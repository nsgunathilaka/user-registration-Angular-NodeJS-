require("dotenv").config();

module.exports = {
  HOST: process.env.DATABASE_URL,
  USER: "root",
  PASSWORD: "",
  DB: "interviewapp",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
