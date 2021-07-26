import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Subscribe = ({userTo}) => {

    const [SubscribeNumber,setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        let variable = {userTo}
        Axios.post('/api/subscribe/subscribeNumber', variable)
        .then( response => {
            if(response.data.success){
                setSubscribeNumber(response.data.subscriberNumber);
            } else {
                alert('구독자 수 정보를 가져오는데 실패했습니다.');
            }
        })

        //내가 구독하고 있는지 아닌지 정보를 불러와야한다.(useFrom의 정보도 필요하다.)
        let subscribedVariable = {userTo,
                                   userFrom:localStorage.getItem('userId')}
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
        .then( response => {
            if(response.data.success){
                setSubscribed(response.data.subscribed);
            } else {
                alert('구독 정보를 가져오는데 실패했습니다.');
            }
        })

    },[]);

    const onSubscribe = () => {

        let subscribeVariable = {
            userTo,
            userFrom:localStorage.getItem('userId')
        }

        if(Subscribed){//구독중일때
            Axios.post('/api/subscribe/unSubscribe',subscribeVariable )
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber-1);
                    setSubscribed(false);
                } else {
                    alert('구독 취소에 실패했습니다.');
                }
            })
        } else { //구독중이 아닐때
            Axios.post('/api/subscribe/subscribe',subscribeVariable )
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber+1);
                    setSubscribed(true);
                } else {
                    alert('구독에 실패했습니다.');
                }
            })
        }
    }

    return (
        <div>
            <button
             style={{backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px',
                    color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}
             onClick={onSubscribe}>
                 {SubscribeNumber} {Subscribed ? "구독중" : "구독하기"}
            </button>
        </div>
    )
}

export default Subscribe;