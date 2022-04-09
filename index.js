const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const catalogController = require('./controllers/catalog');
const usersController = require('./controllers/users');
const favouritesController = require('./controllers/favourites')
const auth = require('./middlewares/auth');

start();

async function start() {
    try {
        await mongoose.connect('mongodb+srv://katy:OldSchool1225@mk-it-cluster.1fkxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database ready');
    } catch (err) {
        console.error('Database connection failed');
        process.exit(1);
    }

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(auth());
    app.use('/data/catalog', catalogController);
    app.use('/data/likes', favouritesController);
    app.use('/users', usersController);

    app.get('/', (req, res) => res.json({ message: 'REST service operational'}));

    app.listen(3030, () => console.log('REST service started on port 3030'));
}