import React, { useState, useEffect } from "react";
import AppClassPage from "./AppClassPage.js";
import AppLogin from "./AppLogin.js";
import AppMainPage from "./AppMainPage.js";
import AppNotice from "./AppNotice.js";
import AppMyPage from "./AppMyPage.js";
import axios from "axios";
import "./App.css";

/*
로그인 페이지 
  - 로그인 기능 (아이디랑 비밀먼호 일치하면 로그인 성공)
  - 회원가입 기능 (유저 정보를 받아서 추가하기)
  -  + 추가기능 하고싶으면 제작

메인 페이지
  - 대충 구성만 잡고, 공지사항 제목들 보이기 (학교 메인 페이지에 있는 공지사항처럼?)

공지사항 페이지 (이러닝 캠퍼스 -> 이용안내 -> 공지사항 페이지 느낌처럼)
  - 공지사항 [번호, 제목, 작성자, 작성일]을 순서로 공지사항을 보이게 하기
  - 공지사항을 작성할 수 있어야함 (추가 C)
  - 각 공지사항 클릭 시 해당 공지사항 내용을 볼 수 있게 (읽기 R)
  - 각 공지사항을 수정, 삭제할 수 있어야함 (수정, 삭제 UD)

강의목록 페이지
  - 각 로그인 유저에 강의 목록을 보여줌
  - 각 강의에 대해서 추가, 수정 삭제 가능
  - 각 강의 수업 목록을 보여줌
  - 각 수업 목록에 대해서 추가, 수정, 삭제 가능

마이 페이지
  - 내 회원 정보 리스트
  - 내 강의 목록 리스트
*/

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
        <div>*김상옥 201904022 / 김윤서 202104025</div>
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
          <li onClick={()=>handleOnClickSetPage("Class")}>강의 목록</li>
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
    return <AppClassPage userId={userId} />;
  }
  else if (page === "MyPage") { // 마이 페이지
    return <AppMyPage userId={userId} />;
  }
};
