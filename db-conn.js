const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB is ready.", new Date());
});

module.exports = db;
