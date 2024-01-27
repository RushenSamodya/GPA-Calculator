const express = require("express");
const {
  getAllRepeatedModules,
  createRepeatedModule,
  updateRepeatedModule,
  deleteRepeatedModule,
} = require("../controllers/RepeatedController");

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//require auth for all module routes
router.use(requireAuth);

// Get all modules
router.get("/", getAllRepeatedModules);

// Post a module
router.post("/", createRepeatedModule);

// Delete a module
router.delete("/:id", deleteRepeatedModule);

// Update a module
router.patch("/:id", updateRepeatedModule);

module.exports = router;
