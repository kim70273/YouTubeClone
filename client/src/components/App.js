import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}
//component={Auth(ㅁㅁㅁ, null)} null은 아무나 이 페이지에 들어갈 수 있는것.
//component={Auth(ㅁㅁㅁ, false)} false하면 로그인한 사람은 로그인 페이지 들어갈 수 없다.(들어가면 바로 나와진다.)
//component={Auth(ㅁㅁㅁ, true)} true하면 로그린한 사람만 이곳에 들어가게 하는 것.
//(Auth에 들어가보면 옵션을 확인 가능하다.)


export default App;
