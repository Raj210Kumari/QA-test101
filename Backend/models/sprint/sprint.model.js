const mongoose = require("mongoose");

const sprintSchema = mongoose.Schema(
  {
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required : true
    },
    task: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const sprintModel = mongoose.model("sprint", sprintSchema);
module.exports = {
  sprintModel,
};
