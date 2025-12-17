const express = require('express');
const router = express.Router();
const { getSpaceBySlug, createTestimonial, getWidgetData } = require('../controllers/publicController');

// Ruta para la Landing de Recolección (buscar por URL bonita)
// Ejemplo: GET /api/public/space/zapateria-carlos-1
router.get('/space/:slug', getSpaceBySlug);

// Ruta para enviar el testimonio
router.post('/testimonial', createTestimonial);

// Ruta para el Widget (buscar por ID técnico)
// Ejemplo: GET /api/public/widget/7ec84fb1-b25c...
router.get('/widget/:spaceId', getWidgetData);

module.exports = router;