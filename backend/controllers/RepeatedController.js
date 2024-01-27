const mongoose = require("mongoose");
const RepeatedModule = require("../models/RepeatedModel");

// Get all Repeated modules
const getAllRepeatedModules = async (req, res) => {
    const user_id = req.user._id;
    const repeatedModules = await RepeatedModule.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json({ repeatedModules });
  };
  
  // Create a Repeated module
  const createRepeatedModule = async (req, res) => {
    const { title, code, weight } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if(!code) {
    emptyFields.push("code");
  }
  if(!weight) {
    emptyFields.push("weight");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //add the doc to the db
  try {
    const user_id = req.user._id;
    const repeatedModule = await RepeatedModule.create({ title, code, weight, user_id });
    res.status(200).json({ repeatedModule });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  };
  
  // Update a Repeated module
  const updateRepeatedModule = async (req, res) => {
    const { id } = req.params;
    const { title, code, weight } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid object Id" });
    }

    const RepeatedModule = await RepeatedModule.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!module) {
        return res.status(404).json({ error: "Module not found" });
    }

    res.status(200).json({ message: "Module updated successfully" });
  };
  
  // Delete a Repeated module
  const deleteRepeatedModule = async (req, res) => {
    const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid object Id" });
  }

  const RepeatedModule = await RepeatedModule.findOneAndDelete({ _id: id });

  if (!RepeatedModule) {
    return res.status(404).json({ error: "Repeated Module not found" });
  }

  res.status(200).json({ message: "Repeated Module deleted successfully" });
  };
  
  module.exports = {
    getAllRepeatedModules,
    createRepeatedModule,
    updateRepeatedModule,
    deleteRepeatedModule,
  };

