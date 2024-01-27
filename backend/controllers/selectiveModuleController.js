const mongoose = require("mongoose");
const SelectiveModule = require("../models/selectiveModel");

// Get all selective modules
const getAllSelectiveModules = async (req, res) => {
    try {
      const selectiveModules = await SelectiveModule.find().sort({ createdAt: -1 });
      res.status(200).json({ selectiveModules });
    } catch (error) {
      res.status(500).json({ error: 'Error getting selective modules' });
    }
  };
  
  // Create a selective module
  const createSelectiveModule = async (req, res) => {
    const { title, isSpecial, code, weight } = req.body;
  
    try {
      const selectiveModule = await SelectiveModule.create({ title, isSpecial, code, weight });
      res.status(200).json({ selectiveModule });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Update a selective module
  const updateSelectiveModule = async (req, res) => {
    const { id } = req.params;
    const { title, isSpecial, code, weight } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid object Id" });
    }
  
    try {
      const selectiveModule = await SelectiveModule.findOneAndUpdate({ _id: id }, { title, isSpecial, code, weight }, { new: true });
  
      if (!selectiveModule) {
        return res.status(404).json({ error: "Selective module not found" });
      }
  
      res.status(200).json({ selectiveModule });
    } catch (error) {
      res.status(500).json({ error: 'Error updating selective module' });
    }
  };
  
  // Delete a selective module
  const deleteSelectiveModule = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid object Id" });
    }
  
    try {
      const selectiveModule = await SelectiveModule.findOneAndDelete({ _id: id });
  
      if (!selectiveModule) {
        return res.status(404).json({ error: "Selective module not found" });
      }
  
      res.status(200).json({ message: "Selective module deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting selective module' });
    }
  };
  
  module.exports = {
    getAllSelectiveModules,
    createSelectiveModule,
    updateSelectiveModule,
    deleteSelectiveModule,
  };

