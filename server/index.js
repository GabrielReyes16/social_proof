// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Importar rutas
const authRoutes = require('./routes/auth');
const spaceRoutes = require('./routes/spaces');
const publicRoutes = require('./routes/public');

// MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));

// RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/public', publicRoutes);
// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API Social Proof funcionando' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});