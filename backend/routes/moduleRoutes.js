const express = require('express');
const { getAllModules, getSingleModule, createModule, deleteModule, updateModule } = require('../controllers/moduleController');
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


module.exports = router;