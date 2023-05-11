const router = require('express').Router();

const Inmueble = require('../../models/inmueble.model');


// OBTENER UN LISTADO DE TODOS LOS INMUEBLES

router.get('/', async (req, res) => {
    try {
        const inmuebles = await Inmueble.find();
        inmuebles.length === 0 ? res.json("No existen registros de inmuebles en la base de datos") : res.json(inmuebles);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

//  DAR DE ALTA UN NUEVO INMUEBLE

router.post('/', async (req, res) => {
    try {
        // Crea un objeto con los campos de búsqueda que te interesan.
        const searchCriteria = {
            piso: req.body.piso,
            letra: req.body.letra,
            extension: req.body.extension,
            numHabitaciones: req.body.numHabitaciones,
            nombrePropietario: req.body.nombrePropietario,
            emailContacto: req.body.emailContacto
        };

        // Busca si el inmueble ya existe en la base de datos.
        const inmuebleExistente = await Inmueble.findOne(searchCriteria);

        if (inmuebleExistente) {
            // Si el inmueble ya existe, envía un mensaje indicándolo.
            res.json({ message: "Ya existe un inmueble con los mismos datos, revíselo para evitar duplicidades" });
        } else {
            // Si el inmueble no existe, crea uno nuevo.
            const result = await Inmueble.create(req.body);
            res.json(result);
        }
    } catch (error) {
        res.json({ fatal: error.message });
    }
});



// ACTUALIZAR LOS DATOS DE UN INMUEBLE

router.put('/:inmuebleId', async (req, res) => {
    const { inmuebleId } = req.params;

    try {
        const inmueble = await Inmueble.findById(inmuebleId);
        if (!inmueble) {
            return res.status(404).json({ message: "El id del inmueble que usted quiere actualizar no existe" });
        }
        const result = await Inmueble.findByIdAndUpdate(inmuebleId, req.body, { new: true });
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});


// BORRAR LOS DATOS DE UN INMUEBLE

router.delete('/:inmuebleId', async (req, res) => {
    const { inmuebleId } = req.params;

    try {
        const result = await Inmueble.findByIdAndDelete(inmuebleId);

        if (!result) {
            return res.json({ fatal: 'El id del inmueble no existe' });
        }

        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

module.exports = router;