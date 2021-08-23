import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';

const VideoDetailPage = (props) => {
    //해당 비디오의 아이디는 url에 나타나 있다.
    const videoId = props.match.params.videoId;//app.js라우터에서 :videoId를 했기때문에 이렇게 가져올 수 있음.
    const videoVariable = {videoId: videoId}
    
    const [VideoDetail, setVideoDetail] = useState([]);

    const [Comments, setComments] = useState([]);

    useEffect(() => {
        //해당 비디오릐 아디이를 보내고
        //그 비디오 정보들을 가져온다.

        Axios.post('/api/video/getVideoDetail', videoVariable)
        .then(response => {
            console.log(response.data);
            if(response.data.success){
                setVideoDetail(response.data.videoDetail);
                //비디오 세부정보를 받아오고 이 정보를 이용한다.
            } else {
                alert('비디오 정보를 가져오기를 실패했습니다.');
            }
        })

        //같은 variable로 이 video에 해당하는 모든 댓글을 가져온다,
        Axios.post('/api/comment/getComments', videoVariable)
        .then(response => {
            console.log(response.data);
            if(response.data.success){
                setComments(response.data.comments)
            } else {
                alert('댓글 정보를 가져오기를 실패했습니다.');
            }
        })
    },[]);

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment));
    }

    //기능이 많아서 코드가 길어지는 부분은 따로 컴포넌트를 생성한다.
    if(VideoDetail.writer){
        
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <List.Item actions={[<Subscribe userTo={VideoDetail.writer._id} />]} ></List.Item>
        //본인것에는 구독 버튼이 나오지 않는다,

        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{width: '100%', padding: '3rem 4rem'}}>
    
                        <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
    
                        <List.Item actions={[<LikeDislikes videoId={videoId} userId={localStorage.getItem('userId')} />, subscribeButton]} >
                            <List.Item.Meta
                            avatar={<Avatar src={VideoDetail.writer.image} />}
                            title={VideoDetail.writer.name}
                            description={VideoDetail.description}
                            />
                        </List.Item>
    
                        {/*밑에는 댓글 부분*/}
                        <Comment refreshFunction={refreshFunction} commentLists={Comments} videoId={videoId} />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    {/*Side Video 깔끔하게하기 위해 컴포넌트하나를 만듬. */}
                    <SideVideo />
                </Col>
    
            </Row>
        )
    } else {
        return (
            <div>...loading</div>
        )
    }
    
}

export default VideoDetailPage;