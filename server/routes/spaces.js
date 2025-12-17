const express = require('express');
const router = express.Router();
const { getMySpaces, createSpace } = require('../controllers/spaceController');
const requireAuth = require('../middlewares/authMiddleware');

// Todas las rutas aquí están protegidas
router.use(requireAuth);

router.get('/', getMySpaces);
router.post('/', createSpace);

module.exports = router;