import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const SideVideo = () => {

    const [sideVideos, setSideVideos] = useState([]);

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

    //여러개의 side video 카드가 필요하니까 map 메소드를 이용한다.
    const renderSideVideo = sideVideos.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));

        return <div key={index} style={{display:'flex', marginBottom:'1rem', padding:'0 2rem'}}>
            
            <div style={{width: '40%', marginRight:'1rem'}}>
                <a href={`/video/${video._id}`}>
                    <img style={{width:'100%', height:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                </a>
            </div>

            <div style={{width:'50%'}}>
                <a href={`/video/${video._id}`} style={{color:'gray'}}>
                    <span style={{fontSize:'1rem', color:'black'}}>{video.title}</span><br />
                    <span>{video.writer.name} </span><br />
                    <span>{video.views} views </span><br />
                    <span>{minutes} : {seconds} </span>
                </a>
            </div>


        </div>
    })

    return (
        <React.Fragment>

            {renderSideVideo}

        </React.Fragment>
        
    )
}

export default SideVideo;