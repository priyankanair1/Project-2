const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    activity: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activitytime: Date,
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    notes: [],

    priority: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);
