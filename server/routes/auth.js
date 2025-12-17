// server/routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Definir la ruta POST para registrar
router.post('/register', registerUser);
router.post('/login', loginUser)

module.exports = router;