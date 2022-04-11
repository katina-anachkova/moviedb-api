const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: false },
    hashedPassword: { type: String, required: false },
    favMovies: { type: Array, required: false}
});


userSchema.index({ email: 1}, {
    collation: {
        locale: 'en',
        strength: 1
    }
});

const User = model('User', userSchema);

module.exports = User;