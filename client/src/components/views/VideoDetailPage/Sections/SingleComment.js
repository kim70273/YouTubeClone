import React, { useState } from 'react';
import {Comment, Avatar, Button, Input} from 'antd';
import Axios from 'axios';
import {useSelector} from 'react-redux';//리덕스 훅을 사용.
import LikeDislikes from './LikeDislikes';

const { TextArea } = Input;

const SingleComment = ({refreshFunction, comment, videoId, responseTo}) => {
    const user = useSelector(state => state.user);

    const [OpenReply, setOpenReply] = useState(false);//처음에는 숨겨져 있어야한다.
    const [CommentValue, setCommentValue] = useState("");

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
    }
    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        
        const variables = {//responseTo 정보가 추가된다.
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId,
            responseTo: responseTo
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                refreshFunction(response.data.result);
                setCommentValue("");
                setOpenReply(false);
            } else {
                alert('댓글을 저장하지 못 했습니다.');
            }
        })
    }
    //답글을 누르면 대댓글 작성창이 나타나고 없어지는 function을 만들어야한다.
    const actions = [
        <LikeDislikes commentId={comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> 답글</span>
    ]
    return (
        <div>
            <Comment 
                actions={actions}
                author={comment.writer.name}
                avatar={<Avatar src={comment.writer.image} alt/>} 
                content={<p>{comment.content}</p>} />

                {OpenReply &&
                <form style={{display: 'flex'}} onSubmit={onSubmit} >
                <textarea 
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder="댓글을 작성해 주세요."
                    />
                    <br/>
                    <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>작성</button>
                </form>
                }
        </div>
    )
}

export default SingleComment;