const express = require('express');
const { getAllModules, getSingleModule, createModule, deleteModule, updateModule, calculateSemesterGPA, calculateTotalGPA } = require('../controllers/moduleController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();


//require auth for all module routes
router.use(requireAuth);

// Get all modules
router.get('/', getAllModules );

// Get a single module
router.get('/:id', getSingleModule);

// Post a module
router.post('/', createModule);


// Delete a module
router.delete('/:id', deleteModule);

// Update a module
router.patch('/:id', updateModule);

// Calculate Total GPA
router.get('/calculate-total-gpa', calculateTotalGPA);

// Calculate Semester GPA
router.get('/calculate-semester-gpa/:semester', calculateSemesterGPA);


module.exports = router;