const Module = require("../models/moduleModel");
const mongoose = require("mongoose");

//get all Modules
const getAllModules = async (req, res) => {
  const user_id = req.user._id;
  const modules = await Module.find({user_id}).sort({ createdAt: -1 });
  res.status(200).json({ modules });
};

//get a single Module
const getSingleModule = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid object Id" });
  }

  const module = await Module.findById(id);
  if (!module) {
    return res.status(404).json({ error: "Module not found" });
  }

  res.status(200).json({ module });
};

//create a Module
const createModule = async (req, res) => {
  const { title, code, semester, weight } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if(!code) {
    emptyFields.push("code");
  }
  if(!semester) {
    emptyFields.push("semester");
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
    const module = await Module.create({ title, code, semester, weight, user_id });
    res.status(200).json({ module });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete a Module
const deleteModule = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid object Id" });
  }

  const module = await Module.findOneAndDelete({ _id: id });

  if (!module) {
    return res.status(404).json({ error: "Module not found" });
  }

  res.status(200).json({ message: "Module deleted successfully" });
};

//update a Module
const updateModule = async (req, res) => {
  const { id } = req.params;
  const { title, code, semester } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid object Id" });
  }

  const module = await Module.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!module) {
    return res.status(404).json({ error: "Module not found" });
  }

  res.status(200).json({ message: "Module updated successfully" });
};

module.exports = {
    getAllModules,
    getSingleModule,
    createModule,
    deleteModule,
    updateModule,
};