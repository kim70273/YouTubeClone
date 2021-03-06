import React, { useEffect, useState } from 'react';
import { Card, Icon, Avatar, Col, Typography, Row} from "antd";
import Axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
    const [Video, setVideo] = useState([]);

    //몽고DB에서 비디오 정보들을 가져온다
    useEffect(() => {
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success){
                setVideo(response.data.videos);
            } else {
                alert('비디오 가져오기를 실패했습니다.');
            }
        })
    }, []);//배열이 비워져있으므로 처음 들어왔을때 한번만 실행된다.
    
    const renderCards = Video.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));
        return <Col lg={6} md={8} xs={24} key={index}> 
        <a href={`/video/${video._id}`}>
        <div style={{position: 'relative'}}>
            <img style={{width: '100%'}} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
            <div className="duration">
                <span>{minutes} : {seconds}</span>
            </div>
        </div>
        </a>
        <br />
        <Meta 
        avatar={
            <Avatar src={video.writer.image}  />
        }
        title={video.title}
        description="" 
        />
        <span>{video.writer.name}</span><br />
        <span style={{marginLeft: '3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
    </Col> 
    })
    
    return (
        <>
            <div style={{ width: '85%', margin: '3rem auto'}}>
                <Title level={2}> Recommended </Title>
                <hr />
                <Row gutter={[32,16]}>         
                    {renderCards}  
                </Row>
            </div>
        </>
    )
}

export default LandingPage
