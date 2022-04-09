const router = require('express').Router();
const api = require('../services/movies');
const { isAuth } = require('../middlewares/guards');
const mapErrors = require('../utils/mapper');

router.get('/', async (req, res) => {
    const data = await api.getAllFavourites();
    res.json(data);
});

router.post('/', isAuth(), async (req, res) => {

    // const movieId = req.params.id;

    const favourite = {
        movie: req.body.movie,
        owner: req.body.owner
    };

    try {
        const result = await api.addFavourite(favourite);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

module.exports = router;
