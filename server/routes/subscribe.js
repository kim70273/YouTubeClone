const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

//=================================
//             subscribe
//=================================

//라우터를 만들면 항상 index.js에서 추가해줘야한다.

router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({'userTo': req.body.userTo})
    .exec((err, subscribe) => {//subscribe에 userTo를 구독하는 모든 case가 들어있다.
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true, subscriberNumber: subscribe.length});
    })
}); 

router.post('/subscribed', (req, res) => {
    Subscriber.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
    .exec((err, subscribe) => {//하나의 정보라도 있으면 구독중인것. 
        if(err) return res.status(400).send(err);
        let result = false;
        if(subscribe.length>0) result=true;
        return res.status(200).json({success: true, subscribed: result});
    })
}); 

router.post('/unSubscribe', (req, res) => {
    Subscriber.findOneAndDelete({userTo: req.body.userTo , userFrom: req.body.userFrom})
    .exec((err, doc) => {
        if(err) return res.status(400).json({success: false, err});
        return res.status(200).json({success: true, doc});
    })
}); 

router.post('/subscribe', (req, res) => {
    const subscribe = new Subscriber(req.body); //DB에 userTo와 userFrom을 저장하기 위해
    subscribe.save((err, doc) => {
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true, doc});
    });
}); 


module.exports = router;
