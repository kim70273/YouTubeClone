const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectID,
        ref: 'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    content: {
        type: String
    }
    },{timestamps: true})//업데이트 날이 기록되도록 timestamps: true

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }