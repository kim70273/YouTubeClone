const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             comment
//=================================

//라우터를 만들면 항상 index.js에서 추가해줘야한다.

router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body);//클라이언트에서 받아온 정보를 다 넣고 저장
    //모든 정보를 몽고디비에 저장
    comment.save((err, comment) => {
        if(err) return res.json({success: false, err})
        Comment.find({'_id': comment._id})//모든 writer정보를 찾기 위해 
        .populate('writer')
        .exec((err, result) => {
            if(err) return res.json({success: false, err});
            return res.status(200).json({success: true, result});
        })
    });
}); 

router.post('/getComments', (req, res) => {
    Comment.find({'postId': req.body.videoId})
    .populate('writer')
    .exec((err, comments) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true, comments});
    })
}); 

module.exports = router;
