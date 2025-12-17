// server/middlewares/authMiddleware.js
const supabase = require('../database/supabase');

const requireAuth = async (req, res, next) => {
    // 1. Buscar el token en el Header "Authorization"
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado. Falta el token.' });
    }

    // El formato suele ser "Bearer eyJhbGci..."
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Formato de token inválido' });
    }

    try {
        // 2. Preguntar a Supabase si este token es real y quién es el dueño
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }

        // 3. ¡Éxito! Guardamos al usuario en la petición (req)
        // Esto nos permite saber QUIÉN es en los siguientes controladores
        req.user = user;

        // 4. Dejar pasar
        next();

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al validar token' });
    }
};

module.exports = requireAuth;