const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const AwardSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["Vouchers", "Products", "Giftcards"] },
    name: String,
    pointNeeded: Number,
    imageUrl: String,
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);
AwardSchema.plugin(mongoosePaginate);

const Award = mongoose.model("award", AwardSchema);

module.exports = Award;
