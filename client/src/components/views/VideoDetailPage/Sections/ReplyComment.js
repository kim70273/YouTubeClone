import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

const ReplyComment = ({refreshFunction, parentCommentId, videoId, commentLists  }) => {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;
        commentLists.map((comment) =>{
            if(comment.responseTo === parentCommentId) commentNumber++;
        })
        setChildCommentNumber(commentNumber);
    },[commentLists])
    //부모로부터 오는 commentLists가 바뀔때 마다 다시 실행됨

    const renderReplyComment = (parentCommentId) => 
        commentLists.map((comment, index) => (
            <>
                {
                comment.responseTo === parentCommentId &&
                <div style={{width: '80%', marginLeft:'40px'}}>
                <SingleComment key={index} refreshFunction={refreshFunction} comment={comment} videoId={videoId} responseTo={comment._id} />
                <ReplyComment  key={comment._id} refreshFunction={refreshFunction} parentCommentId={comment._id} videoId={videoId} commentLists={commentLists} />
                {console.log(OpenReplyComments ,parentCommentId, comment.responseTo)}
                </div>
                }
            </>
        ))
    

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
            <p style={{ fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange} >
            View {ChildCommentNumber} more conmment(s)
            </p>
            }
            
            {OpenReplyComments && renderReplyComment(parentCommentId)}
        </div>
    )
}

export default ReplyComment;