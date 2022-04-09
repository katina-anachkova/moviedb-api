const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    movie: { type: ObjectId, ref: 'Item' },
    owner: { type: ObjectId, ref: 'User' },
});

const Like = model('Like', schema);

module.exports = Like;