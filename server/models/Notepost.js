const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');


const notepostSchema = new Schema({
    name: { type: String, required: true, unique: true },
    date: { type: Date, required: false},
    content: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});


const Notepost = mongoose.model('Notepost', notepostSchema);
module.exports = Notepost;