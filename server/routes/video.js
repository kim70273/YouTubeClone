const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const { compareSync } = require('bcrypt');

let storage = multer.diskStorage({
    destination: (req, file, cd) => {//파일을 올리면 어디다가 저장할지
        cd(null, "uploads/");//업로드라는 폴더에 저장 된다.
    },
    filename: (req, file, cd) => {//저장할때 어떤 파일이름으로 저장할지
        cd(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cd) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.mp4'){//받을 수 있는 파일 형식
            return cd(res.status(400).end('only mp4 is allowed'), false);
        }
        cd(null, true);
    }
});//multer에 들어가는 옵션들. 파일이 오면 우선 여기를 거치게 된다.

const upload = multer({storage:storage}).single("file");
//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {// index.js에서 먼저 video로 간다음 여기서 uploadfiles로 감.
    //클라이언트에서 파일을 보냈으니까 req를 통해 파일을 받으면 된다.
    //비디오를 서버에 저장한다.
    //서버에 저장을 위해서 필요한것. npm i multer --save

    upload(req, res, err => {
        if(err) return res.json({success: false, err}); //success가 false가 되어 클라이언트 쪽에서 에러발생.
        return res.json({success:true, url: res.req.file.path, fileName: res.req.file.filename});
        //url로 파일이 저장된 경로를 클라이언트에 보내준다.
    })
}); 

router.post('/thumbnail', (req, res) => {
    //썸네일 생성하고 비디오 러닝타임도 가져오기.

    let filePath = "";
    let fileDuration = "";

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, (err, metadata) => {//ffprobe는 ffmpeg받을때 같이 받아진것.
        console.log(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    });

    //썸네일 생성
    ffmpeg(req.body.url)//클라이언트에서 받은 비디오 저장 경로
    .on('filenames', (filenames) => {// 썸네일의 파일 이름을 생성한다.
        console.log('Will generate ' + filenames.join(', '));
        console.log(filenames);

        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', () => {//썸네일 다 생성 후 에 무엇을 할지.
        console.log('Screenshots taken');
        return res.json({ success: true, url:filePath, fileDuration: fileDuration});
    })
    .on('error', (err) => {
        console.log(err);
        return res.json({success: false, err});
    })
    .screenshots({
        count: 3,//3개의 썸네일을 찍을 수 있다.
        folder: 'uploads/thumbnails',
        size: '320x240',//썸네일 사이즈
        filename: 'thumbnail-%b.png'//확장자를 뺀 파일 네임
    })
}); 

router.post('/uploadVideo', (req, res) => {
    //비디오 정보들을 저장한다.(몽고디비에 저장하는것)
    const video = new Video(req.body);//클라이언트에서 보낸 모든게 req.body안에 있다.

    //모든 정보들이 몽고디비에 저장 됨
    video.save((err, doc) => {
        if(err) return res.json({success: false, err})
        res.status(200).json({success:true})
    })

}); 


module.exports = router;
