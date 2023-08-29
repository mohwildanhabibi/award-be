const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
