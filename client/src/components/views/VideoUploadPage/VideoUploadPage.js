import React, {useState} from "react";
import { Typography, Button, Form, message, Input, Icon} from "antd";//css를 쉽게하기위해서 가져온다.
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";//유저 정보 가져오기 위해
import { response } from "express";

const { Title } = Typography;
const { TextArea } = Input;

const privateOptions = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"},
];
const categoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"},
];

const VideoUploadPage = (props) => {
    //state를 만든뒤에 나중에 state에 있는 것을 서버로 보낸다.
    const user = useSelector(state => state.user);//state에서 user를 가져온다.(user에 대한 모든정보.)
    const [videoTitle, setVideoTitle] = useState("");
    const [description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);//pricate:0, public:1
    const [category, setCategory] = useState("Film & Animation");//옵션 고르기전에 처음에 값.
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [ThumbnailPath, setThubnailPath] = useState("");

    const onChange = (e) => {
        const {target: {name}} = e;
        const {target: {value}} = e;

        if(name === "title"){
            setVideoTitle(value);
        }
        else if(name === "description"){
            setDescription(value);
        }
        else if(name === "privateOption"){
            setPrivate(value);
        }
        else if(name === "categoryOption"){
            setCategory(value);
        }
    };

    const onDrop = (files) => {
        //files에 올린 파일의 정보들이 들어가 있다.
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0]);
        //Axios란 것을 통해 서버에 요청을 보낼 때, 위의 것을 같이 보내주지않으면
        //파일을 보낼 때 오류가 생긴다.

        Axios.post('/api/video/uploadfiles', formData, config)//서버쪽에 video.js 라우터를 만들어준다.
        .then( response => {//서버에 요청을하고 반응을 받아온다.
            if(response.data.success){
                let variable = {
                    url: response.data.url,//서버에서 받은 url
                    fileName: response.data.fileName,
                }
                
                setFilePath(response.data.url);

                Axios.post('/api/video/thumbnail', variable)//이 라우터도 또 따로 만들어 줘야 됨.
                .then(response => {
                    if(response.data.success){
                        setDuration(response.data.fileDuration);
                        setThubnailPath(response.data.url);
                    } else{
                        alert('썸네일 생성에 실패했습니다.');
                        console.log("er");
                    }
                })

            } else{
                alert('비디오 업로드를 실패했습니다.');
            }
        })
        //서버가 있는 쪽에 요청을 보낸다.
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = { //video 콜렉션에 보내줄 정보
            writer: user.userData._id,
            title: videoTitle,
            description: description,
            privacy: Private,
            filePath: FilePath,
            category: category,
            duration: Duration,
            thumbnail: ThumbnailPath,
        }

        Axios.post('/api/video/uploadVideo', variables)
        .then(response => {
            if(response.data.success){
                message.success('업로드에 성공했습니다.');
                setTimeout(() => {
                    props.history.push('/');
                },2000);
            } else{
                alert('비디오 업로드에 실패했습니다.');
            }
        })
    }

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/* Drop Zone */}

                    <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={1000000000}>
                    {({ getRootProps, getInputProps}) => (
                        <div style={{width: '300px', height: '240px', border:'1px solid lightgray', display:'flex',
                        alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <Icon type="plus" style={{ fontSize: '3rem'}} />
                        </div>
                    )}

                    </Dropzone>

                    {/* 가져온 비디오의 썸네일 부분 */}
                    { ThumbnailPath && 
                    <div>
                    <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                    </div>
                    }
                    
                </div>

                <br />
                <br />
                <label>Title</label>
                <Input name="title" onChange={onChange} value={videoTitle} />
                <br />
                <br />
                <label>Description</label>
                <TextArea name="description" onChange={onChange} value={description} />
                <br />
                <br />

                <select name="privateOption" onChange={onChange}>
                    {privateOptions.map((item, index) => (
                        <option key={index} value={item.value} >{item.label}</option>
                    ))}
                </select>
                <br />
                <br />
                <select name="categoryOption" onChange={onChange}>
                    {categoryOptions.map((item, index) => (
                        <option key={index} value={item.value} >{item.label}</option>
                    ))}
                </select>
                <br />
                <br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    );
}

export default VideoUploadPage;
//다른 파일에서도 이동할 수 있게 export 시켜줌.