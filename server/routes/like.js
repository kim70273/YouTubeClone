const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//             Like
//=================================

//라우터를 만들면 항상 index.js에서 추가해줘야한다.

//여기서도 비디오에 관한 좋아요정보와 댓글에 대한 좋아요 정보가 나뉜다.
router.post('/getLikes', (req, res) => {
    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable)
    .exec((err,likes) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success:true,likes});
    })
}); 

router.post('/getDislikes', (req, res) => {
    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
    .exec((err,dislikes) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success:true,dislikes});
    })
}); 

router.post('/unLike', (req, res) => {
    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
    .exec((err,like) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success:true,like});
    })
}); 

router.post('/unDislike', (req, res) => {
    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
    .exec((err,dislike) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success:true,dislike});
    })
}); 

router.post('/like', (req, res) => {
    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }


    const like = new Like(variable);
    like.save((err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true, doc});
    })
}); 

router.post('/dislike', (req, res) => {
    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }


    const dislike = new Dislike(variable);
    dislike.save((err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true, doc});
    })
}); 

module.exports = router;
