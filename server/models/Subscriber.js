const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    }
    },{timestamps: true})//업데이트 날이 기록되도록 timestamps: true

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }