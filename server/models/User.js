const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
        data: { type: String, required: false, default: null },
        contentType: { type: String, required: false },
    },
});

//Remove associated Noteposts before removing the User
userSchema.pre('remove', async function (next) {
    try {
        await Notepost.deleteMany({ owner: this._id });
        next();
    } catch (error) {
        next(error);
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;