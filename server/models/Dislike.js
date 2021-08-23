const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref:'Comment',
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref:'Video',
    }
    },{timestamps: true})//업데이트 날이 기록되도록 timestamps: true

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }