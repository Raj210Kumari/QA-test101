const sprintRouter = require('express').Router();
const { body } = require("express-validator");
const {addSprintController} = require("../../controller/sprint/addSprint.controller");
const {deleteSprintController} = require("../../controller/sprint/deleteSprint.controller");
const {getUserSprintController} = require("../../controller/sprint/getUserSprint.controller");
const {updateSprintController} = require("../../controller/sprint/updateSprint.controller");
const {verifyToken} = require("../../middleware/verifyToken")


sprintRouter.route("/get").get( verifyToken,getUserSprintController);
sprintRouter.route("/add").post([
    body("task", "Please Enter sprint name").not().isEmpty(),
    body("date", "Please select start date").not().isEmpty(),
],verifyToken, addSprintController);
sprintRouter.route("/update/:sprintId").patch(verifyToken,updateSprintController);
sprintRouter.route("/delete/:sprintId").delete( verifyToken, deleteSprintController);

module.exports = {
    sprintRouter
}