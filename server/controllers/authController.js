// server/controllers/authController.js
const supabase = require('../database/supabase');

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    // 1. Validaciones básicas
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    try {
        // 2. Crear usuario en Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // 3. Respuesta exitosa
        // Nota: Gracias al trigger SQL, la tabla 'profiles' ya se llenó sola.
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                id: data.user.id,
                email: data.user.email
            }
        });

    } catch (err) {
        console.error('Error interno:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Se devuelve el token
        res.status(200).json({
            message: 'Login exitoso',
            token: data.session.access_token, // <--- ESTA ES TU LLAVE
            user: {
                id: data.user.id,
                email: data.user.email
            }
        });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error interno" })
    }
}


module.exports = { registerUser, loginUser };