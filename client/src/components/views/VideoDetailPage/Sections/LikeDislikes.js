import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

//엔트디자인을 이용하여 버튼을 만든다.
const LikeDislikes = ({videoId, userId, commentId}) => {
    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);

    let variable = {};

    if(videoId){
        variable = { videoId,
                    userId }
    } else {
        variable = { commentId ,
                    userId }
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
        .then(response => {
            if(response.data.success){
                //얼마나 많은 좋아요를 받았는지.
                setLikes(response.data.likes.length);
                //내가 좋아요를 눌렀는지.
                response.data.likes.map((like) => {
                    if(like.userId === userId){
                        setLikeAction('liked')
                    }
                })
            } else {
                alert('좋아요 정보를 가져오는데 실패했습니다.');
            }
        })

        Axios.post('/api/like/getDislikes', variable)
        .then(response => {
            if(response.data.success){
                //얼마나 많은 싫어요를 받았는지.
                setDislikes(response.data.dislikes.length);
                //내가 싫어요를 눌렀는지.
                response.data.dislikes.map((dislike) => {
                    if(dislike.userId === userId){
                        setDislikeAction('disliked')
                    }
                })
            } else {
                alert('싫어요 정보를 가져오는데 실패했습니다.');
            }
        })
    },[]);

    const onClickLike = () => {
        //1.좋아요와 싫어요 아무것도 안누른상태
        //2.좋아요가 눌러진 상태
        //3.싫어요가 눌러진 상태
        if(LikeAction==='liked'){
            Axios.post('/api/like/unLike', variable)
            .then(response => {
                if(response.data.success){
                    setLikeAction(null);
                    setLikes(Likes-1);
                } else {
                    alert('좋아요 취소에 실패했습니다.');
                }
            })
        } else if(DislikeAction === 'disliked'){
            Axios.post('/api/like/unDislike', variable)
            .then(response => {
                if(response.data.success){
                    setDislikeAction(null);
                    setDislikes(Dislikes-1);
                } else {
                    alert('좋아요에 실패했습니다.');
                }
            })

            Axios.post('/api/like/like', variable)
            .then(response => {
                if(response.data.success){
                    setLikeAction('liked');
                    setLikes(Likes+1);
                } else {
                    alert('좋아요에 실패했습니다.');
                }
            })
        } else {
            Axios.post('/api/like/like', variable)
            .then(response => {
                if(response.data.success){
                    setLikeAction('liked');
                    setLikes(Likes+1);
                } else {
                    alert('좋아요에 실패했습니다.');
                }
            })
        }
    }

    const onClickDislike = () => {
        if(LikeAction==='liked'){//좋아요 취소후 싫어요
            Axios.post('/api/like/unLike', variable)
            .then(response => {
                if(response.data.success){
                    setLikeAction(null);
                    setLikes(Likes-1);
                } else {
                    alert('싫어요에 실패했습니다.');
                }
            })

            Axios.post('/api/like/dislike', variable)
            .then(response => {
                if(response.data.success){
                    setDislikeAction('disliked');
                    setDislikes(Dislikes+1)
                } else {
                    alert('싫어요에 실패했습니다.');
                }
            })
        } else if(DislikeAction === 'disliked'){//싫어요 취소
            Axios.post('/api/like/unDislike', variable)
            .then(response => {
                if(response.data.success){
                    setDislikeAction(null);
                    setDislikes(Dislikes-1)
                } else {
                    alert('싫어요 취소에 실패했습니다.');
                }
            })

        } else {
            Axios.post('/api/like/dislike', variable)
            .then(response => {
                if(response.data.success){
                    setLikeAction('disliked');
                    setDislikes(Dislikes+1)
                } else {
                    alert('싫어요에 실패했습니다.');
                }
            })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction==='liked' ? 'filled' : 'outlined'}
                        onClick = {onClickLike}
                        />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}> {Likes} </span>

            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="disLike">
                    <Icon type="dislike"
                        theme={DislikeAction==='disliked' ? 'filled' : 'outlined'}
                        onClick={onClickDislike}
                        />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}> {Dislikes} </span>

            </span>
        </div>
    )
}

export default LikeDislikes;