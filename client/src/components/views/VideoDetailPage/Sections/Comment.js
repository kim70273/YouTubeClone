import Axios from 'axios';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';//리덕스 훅을 사용.
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const Comment = ({refreshFunction, commentLists, videoId}) => {
    const user = useSelector(state => state.user);
    //state에서 state유저 정보를 가져와서 user에 넣는다.(user 데이터 모든걸 가져옴)
    //const videoId = props.match.params.videoId;
    //videoId 비디오 디테일 페이지에서 props로 넘겨줘도 상관없음
    const [commentValue, setCommentValue] = useState("");

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                refreshFunction(response.data.result);
                setCommentValue("");
            } else {
                alert('댓글을 저장하지 못 했습니다.');
            }
        })
    }
    return (
        <div>
            <br />
            <p> 댓글</p>
            <hr />

            {/* 댓글 리스트 (우선 답글이 아닌 댓글 화면에 출력)*/}
            {commentLists && commentLists.map((comment, index) => (
                (!comment.responseTo && 
                <React.Fragment>
                <SingleComment key={index} refreshFunction={refreshFunction} comment={comment} videoId={videoId} responseTo={comment._id}/>
                <ReplyComment key={comment._id} refreshFunction={refreshFunction} parentCommentId={comment._id} videoId={videoId} commentLists={commentLists} />
                </React.Fragment>
                )
                ))}

            {/* Root Comment Form */}
            <form style={{display: 'flex'}} onSubmit={onSubmit} >
                <textarea 
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="댓글을 작성해 주세요."
                    />
                    <br/>
                    <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>작성</button>
            </form>
        </div>
    )
}

export default Comment;