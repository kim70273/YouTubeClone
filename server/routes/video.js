const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");

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


module.exports = router;
