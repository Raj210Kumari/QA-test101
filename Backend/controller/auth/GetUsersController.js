const { authModel } = require("../../models/auth/auth.model");
const asyncHandler = require("express-async-handler");

const getUserController = asyncHandler(async (req, res) => {
  try {
    const users = await authModel.find();
    return res.send(users);
  } catch (error) {
    return res.status(500).send({ error: "Somthing Went Wrong!", msg: error });
  }
});

module.exports = {
  getUserController,
};
