const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({

    writer: {
        type: Schema.Type.ObjectId, //이렇게 쓰면 유저스키마의 해당아이디의 모든정보를 가져올 수 있다.
        ref: 'User'//User 모델에서 불러온다.
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }
},{timestamps: true})//업데이트 날이 기록되도록 timestamps: true

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }