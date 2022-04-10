const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    movie: { type: Object },
    userId: { type: ObjectId, ref: 'User' },
});

const Favourite = model('Favourite', schema);

module.exports = Favourite;