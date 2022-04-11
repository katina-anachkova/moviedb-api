const router = require('express').Router();
const { isGuest } = require('../middlewares/guards');
const { register, login, logout, getAllUsers, updateUser } = require('../services/users');
const mapErrors = require('../utils/mapper');

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password == '' || req.body.email == '') {
            throw new Error('Email and password are required');
        }

        const result = await register(req.body.email.toLowerCase(), req.body.password);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const result = await login(req.body.email.toLowerCase(), req.body.password);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await getAllUsers();
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});
 
router.put('/:id', async (req,res) => {
    const userId = req.params.id;
    const user = {
        favMovies: req.body.favMovies
    };

    try {
        const result = await updateUser(userId, user);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
})

module.exports = router;