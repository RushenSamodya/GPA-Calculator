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

// Calculate Semester GPA
const calculateSemesterGPA = async (req, res) => {
  const { semester } = req.params;
  const user_id = req.user._id;

  try {
    // Fetch modules for the specific semester and user
    const modules = await Module.find({ user_id, semester });

    if (!modules || modules.length === 0) {
      return res.status(404).json({ error: `No modules found for Semester ${semester}` });
    }

    // Calculate Semester GPA based on the weighted average
    const totalWeightedCredits = modules.reduce((acc, module) => {
      return acc + module.weight * calculateGPAFromResult(module.result);
    }, 0);

    const totalWeight = modules.reduce((acc, module) => {
      return acc + module.weight;
    }, 0);

    const semesterGPA = totalWeightedCredits / totalWeight;

    //total gpa here as well
    const allModules = await Module.find({ user_id });
    const totalWeightedCreditsAll = allModules.reduce((acc, module) => {
      return acc + module.weight * calculateGPAFromResult(module.result);
    }, 0);
    
    const totalWeightAll = allModules.reduce((acc, module) => {
      return acc + module.weight;
    }, 0);
    
    const totalGPA = totalWeightedCreditsAll / totalWeightAll;

    res.status(200).json({ semesterGPA, totalGPA, totalWeightAll  });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating Semester GPA' });
  }
};

// Helper function to convert result to GPA
const calculateGPAFromResult = (result) => {
  // Implement your logic to convert the result to GPA
  // Example: A, A-, B+, B, B-, C+, C, C-, D, F
  // You can assign GPA values accordingly

  // For simplicity, assuming an arbitrary mapping
  const gpaMapping = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D': 1.0,
    'F': 0.0,
  };

  return gpaMapping[result] || 0.0;
};

// Calculate Total GPA
const getTotalGPA = async (req, res) => {
  const user_id = req.user._id;

  try {
    // Fetch all modules for the specific user
    const modules = await Module.find({ user_id });

    if (!modules || modules.length === 0) {
      return res.status(404).json({ error: 'No modules found for the user' });
    }

    // Calculate Total GPA based on the weighted average of all modules
    const totalWeightedCredits = modules.reduce((acc, module) => {
      return acc + module.weight * calculateGPAFromResult(module.result);
    }, 0);

    const totalWeight = modules.reduce((acc, module) => {
      return acc + module.weight;
    }, 0);

    const totalGPA = totalWeightedCredits / totalWeight;

    res.status(200).json({ totalGPA });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating Total GPA' });
  }
};


module.exports = {
  getAllModules,
  getSingleModule,
  createModule,
  deleteModule,
  updateModule,
  calculateSemesterGPA,
  getTotalGPA,
};