const router = require('express').Router();

const Inmueble = require('../../models/inmueble.model');


// OBTENER UN LISTADO DE TODOS LOS INMUEBLES

router.get('/', async (req, res) => {
    try {
        const inmuebles = await Inmueble.find();
        res.json(inmuebles);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

//  DAR DE ALTA UN NUEVO INMUEBLE

router.post('/', async (req, res) => {
    try {
        const result = await Inmueble.create(req.body);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// ACTUALIZAR LOS DATOS DE UN INMUEBLE

router.put('/:inmuebleId', async (req, res) => {
    const { inmuebleId } = req.params;

    try {
        const result = await Inmueble.findByIdAndUpdate(
            inmuebleId, req.body, { new: true }
        );
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