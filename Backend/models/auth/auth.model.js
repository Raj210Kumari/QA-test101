const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const authModel = mongoose.model("auth", authSchema);
module.exports = {
  authModel,
};
