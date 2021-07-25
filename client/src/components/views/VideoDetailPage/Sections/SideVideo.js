import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const SideVideo = () => {

    const [sideVideos, setSideVideos] = useState();

    //비디오 정보 가져오기위해 useEffect사용
    useEffect(() => {
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success){
                setSideVideos(response.data.videos);
                //모든 비디오들의 데이터가 들어간다.
            } else {
                alert('비디오 가져오기를 실패했습니다.');
            }
        })
    }, []);

    return (
        <div style={{display:'flex', marginBottom:'1rem', padding:'0 2rem'}}>
            
            <div style={{width: '40%', marginBottom:'1rem'}}>
                <a href>
                    <img style={{width:'100%'}} src alt />
                </a>
            </div>

            <div style={{width:'50%'}}>
                <a href>
                    <span style={{fontSize:'1rem', color:'black'}}>videoTitle</span><br />
                    <span>작성자</span><br />
                    <span>조회수</span><br />
                    <span>시간</span>
                </a>
            </div>


        </div>
    )
}

export default SideVideo;