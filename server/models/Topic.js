const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Notepost = require('./Notepost');


const topicSchema = new Schema({
    name: { type: String, required: true, unique: true },
    date: { type: Date, required: false, default: Date.now },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    noteposts: [{ type: Schema.Types.ObjectId, ref: 'Notepost', default: [] }],
});


const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;