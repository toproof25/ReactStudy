import React, { useState, useEffect } from "react";
import AppClassPage from "./AppClassPage.js";
import AppLogin from "./AppLogin.js";
import AppMainPage from "./AppMainPage.js";
import AppNotice from "./AppNotice.js";
import AppMyPage from "./AppMyPage.js";
import AppViewClass from "./AppViewClass.js";

import axios from "axios";
import "./css/App.css";

export default function App() {
  const [login, setLogin] = useState(false) // 로그인 여부를 확인
  const [userId, setUserId] = useState(null) // 현재 로그인한 사람의 정보
  const [page, setPage] = useState("Login") // 현재 페이지 (메인, 공지사항, 강의목록)
  const [name, setName] = useState('')      // 현재 로그인한 사람 이름

  const handleOnClickSetPage = (pageText) => { // 각 페이지 이동 클릭 시 핸들
    if (login) setPage(pageText);
    else alert("로그인을 먼저 해주세요.")
  }

  const handleSetUserId = (id) => { // userID를 관리하는 핸들러
    setUserId(id);
  }

  useEffect(()=>{ // 로그인을 하면 메인페이지로 넘어가게끔 / 로그인 시 name에 로그인 한 사람의 이름을 저장
    if(login) {
      setPage("MainPage")
      axios.get("http://localhost:4000/users", {params: {userID: userId}})
      .then( response => setName(response.data[0].name) )
      .catch(console.log)
    }
    else{
      setName('');
    }
  }, [login])

  return (
    <div className="main">
      <header>
        <Header {...{login, setLogin, name, handleOnClickSetPage}} />
      </header>

      <Main {...{ login, userId, name, setLogin, page, handleSetUserId }} />

      <footer>
        <div>(팀장)김상옥 201904022 / 김윤서 202104025</div>
        <div>이용재 202002451 / 이정인 202084025</div>
      </footer>
    </div>
  );
}

/* ---------------------- 상단 ---------------------- */
// 상단 (사이트 제목, 로그인, 로그아웃 등)
const Header = ({ login, setLogin, name, handleOnClickSetPage }) => {
  return (
    <div>
      <img src="./logo512.png" alt="사이트 사진" />
      <h1> 유사팀 강의 사이트 </h1>
      {(() => {
        // 로그인이 되어 있을 때만 로그아웃 버튼이 상단에 배치됨
        if (login)
          return (<span>
            <span id="HeaderUserName">{name}님 반갑습니다</span>
            <input
              type="button"
              value={"로그아웃"}
              id="login"
              onClick={() => setLogin(false)}
            />
            </span>
          );
      })()}

      <div>
        <ul id="header_nav">
          <li onClick={()=>handleOnClickSetPage("MainPage")}>메인 페이지</li>
          <li onClick={()=>handleOnClickSetPage("Notice")}>공지사항</li>
          <li onClick={()=>handleOnClickSetPage("ViewClass")}>강의 조회</li>
          <li onClick={()=>handleOnClickSetPage("Class")}>강의 수정</li>
          <li onClick={()=>handleOnClickSetPage("MyPage")}>마이페이지</li>
        </ul>
      </div>

    </div>
  );
};

const Main = ({ login, userId, name, setLogin, page, handleSetUserId }) => {
  if (!login || page==="Login") { // 로그인 페이지
    return <AppLogin setLogin={setLogin} handleSetUserId={handleSetUserId} />;
  }
  else if (page === "MainPage") { // 메인 페이지
    return <AppMainPage userId={userId} />
  }
  else if (page === "Notice") { // 공지사항 페이지
    return <AppNotice userId={userId} name={name} />
  } 
  else if (page === "Class") { // 강의목록 페이지
    return <AppClassPage userId={userId} userName={name} />;
  }
  else if (page === "MyPage") { // 마이 페이지
    return <AppMyPage userId={userId} />;
  }
  else if (page === "ViewClass") { // 강의 조회
    return <AppViewClass userName={name} />;
  }
};
