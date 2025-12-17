const supabase = require('../database/supabase');

const getMySpaces = async (req, res) => {
    // Gracias al middleware, ya sabemos quién es el usuario:
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from('spaces')
            .select('*')
            .eq('user_id', userId); // FILTRO CLAVE: Solo sus espacios

        if (error) throw error;

        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener espacios' });
    }
};

const createSpace = async (req, res) => {
    const userId = req.user.id;
    const { name, slug } = req.body;
    if (!name || !slug) {
        return res.status(400).json({ error: ' Nombre y slug sob obligatorios' });
    }
    try {
        //Aqui se insertará el espacio
        const { data, error } = await supabase.from('spaces').insert([
            {
                user_id: userId,
                name: name,
                slug: slug
            }
        ])
            .select();

        if (error) {
            //Validar error por duplicidad en postgres
            if (error.code === '23505') {
                return res.status(400).json({ error: ' Este slug ya está en uso, elige otro.' })
            }
            throw error
        }
        res.status(201).json({ message: 'Espacio creado', space: data[0] })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el espacio' })
    }
}

module.exports = { getMySpaces, createSpace };