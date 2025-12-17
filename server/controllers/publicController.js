const supabase = require('../database/supabase');

// 1. Obtener info pública del espacio (Para la Landing de Recolección)
// El cliente entra a: tusaas.com/v/zapateria-carlos-1
const getSpaceBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const { data, error } = await supabase
            .from('spaces')
            .select('id, name, settings, slug') // SOLO pedimos datos seguros
            .eq('slug', slug)
            .single(); // Esperamos solo uno

        if (error || !data) {
            return res.status(404).json({ error: 'Espacio no encontrado' });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// 2. Guardar un nuevo testimonio (Cuando el cliente envía el form)
const createTestimonial = async (req, res) => {
    const { spaceId, authorName, content, stars, type, videoUrl } = req.body;

    // Validación básica
    if (!spaceId || !authorName || !type) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    try {
        const { data, error } = await supabase
            .from('testimonials')
            .insert([
                {
                    space_id: spaceId,
                    author_name: authorName,
                    content: content,
                    stars: stars || 5,
                    type: type, // 'video' o 'text'
                    video_url: videoUrl, // Puede ser null si es solo texto
                    status: 'pending' // SIEMPRE pendiente por seguridad
                }
            ]);

        if (error) throw error;

        res.status(201).json({ message: 'Testimonio recibido, pendiente de aprobación.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al guardar testimonio' });
    }
};

// 3. Obtener testimonios para el Widget (El script embebido)
const getWidgetData = async (req, res) => {
    const { spaceId } = req.params;

    try {
        const { data, error } = await supabase
            .from('testimonials')
            .select('id, author_name, author_avatar, content, video_url, stars, type')
            .eq('space_id', spaceId)
            .eq('status', 'approved') // FILTRO CRÍTICO: Solo aprobados
            .order('created_at', { ascending: false }); // Los más nuevos primero

        if (error) throw error;

        // También necesitamos la config visual (colores) del espacio
        const { data: spaceData } = await supabase
            .from('spaces')
            .select('settings')
            .eq('id', spaceId)
            .single();

        res.json({
            testimonials: data,
            settings: spaceData ? spaceData.settings : {}
        });

    } catch (err) {
        res.status(500).json({ error: 'Error cargando widget' });
    }
};

module.exports = { getSpaceBySlug, createTestimonial, getWidgetData };