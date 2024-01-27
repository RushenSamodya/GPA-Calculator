const express = require("express");
const {
  getAllSelectiveModules,
  createSelectiveModule,
  updateSelectiveModule,
  deleteSelectiveModule,
} = require("../controllers/selectiveModuleController");

const router = express.Router();

// Get all modules
router.get("/", getAllSelectiveModules);

// Post a module
router.post("/", createSelectiveModule);

// Delete a module
router.delete("/:id", deleteSelectiveModule);

// Update a module
router.patch("/:id", updateSelectiveModule);

module.exports = router;
