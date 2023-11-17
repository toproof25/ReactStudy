import React, { useState, useEffect } from "react";
import AppClassPage from "./AppClassPage.js";
import AppLogin from "./AppLogin.js";
import AppMainPage from "./AppMainPage.js";
import AppNotice from "./AppNotice.js";
import DB from './AppDatabase.js';
import "./App.css";

/*
hook, CRUD : 각 클래스와 강의 목록을 추가, 삭제, 수정이 가능하게 활용함
비동기 함수 async / await : 
  실제 DB에서 정보를 확인하여 가져오지는 않지만 [AppDatbase.js] 컴포넌트 하나를 DB처럼 사용하고, 각 CRUD작업에 딜레이를 줌
*/

/*
헤더에 이름 띄우기.
마이페이지 제작하기
*/


export default function App() {
  /*
    AppDatabase에서 정보를 모두 가져옴

    AppDatabase를 다른 컴포넌트에서 사용한다면, 컴포넌트 이동 시 값이 다시 초기화 됨 -> 컴포넌트 벗어날 때 상태가 초기화됨

    즉 벗어나지 않고계속 화면상에 존재하는 컴포넌트는 App컴포넌트
    App 최상위 컴포넌트 에서 AppDatabase를 불러오고, 받아온 정보를 하위 컴포넌트에 props로 넘겨준다면 AppDatabase에 있는 값들은 유지됨
  */
  const { classes, userData, notice, findUserName, addClass, updateClass, removeClass, addClassData, removeClassData, updateClassData } = DB();
  const DataBase = { classes, userData, notice, findUserName, addClass, updateClass, removeClass, addClassData, removeClassData, updateClassData };
  
  const [login, setLogin] = useState(false); // 로그인 여부를 확인
  const [userId, setUserId] = useState(null) // 현재 로그인한 사람의 정보
  const [page, setPage] = useState("Login"); // 현재 페이지 (메인, 공지사항, 강의목록)

  const handleOnClickSetPage = (pageText) => { // page변수를 관리하는 핸들러
    if (login) setPage(pageText);
    else alert("로그인을 먼저 해주세요.")
  }

  const handleSetsetUserId = (id) => { // page변수를 관리하는 핸들러
    setUserId(id);
  }

  useEffect(()=>{ // 로그인을 하면 메인페이지로 넘어가게끔
    if(login) setPage("MainPage");
  }, [login])

  return (
    <div className="main">
      <header>
        <Header {...{login, setLogin, userId, findUserName, handleOnClickSetPage}} />

        <button onClick={()=>setUserId(1)}>유저 1</button>
        <button onClick={()=>setUserId(2)}>유저 2</button>
      </header>

      <Main {...{ login, userId, setLogin, page, DataBase, handleSetsetUserId }} />

      <footer>
        <div>*김상옥 201904022 / 김윤서 202104025</div>
        <div>이용재 202002451 / 이정인 202084025</div>
      </footer>
    </div>
  );
}

/* ---------------------- 상단 ---------------------- */
// 상단 (사이트 제목, 로그인, 로그아웃 등)
const Header = ({ login, setLogin, userId, findUserName, handleOnClickSetPage }) => {
  return (
    <div>
      <img src="./logo512.png" alt="사이트 사진" />
      <h1> 기말 팀 프로젝트 </h1>
      {(() => {
        // 로그인이 되어 있을 때만 로그아웃 버튼이 상단에 배치됨
        if (login)
          return (<span>
            <span id="userName">{findUserName(userId)}</span>
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
          <li onClick={()=>handleOnClickSetPage("Class")}>마이페이지 아직x</li>
        </ul>
      </div>

    </div>
  );
};

const Main = ({ login, userId, setLogin, page, DataBase, handleSetsetUserId }) => {
  if (!login || page=="Login") { // 로그인 페이지
    return <AppLogin setLogin={setLogin} DB = {DataBase} handleSetsetUserId={handleSetsetUserId} />;
  }
  else if (page == "MainPage") { // 메인 페이지
    return <AppMainPage DB={DataBase} userId={userId} />
  }
  else if (page == "Notice") { // 공지사항 페이지
    return <AppNotice DB={DataBase} userId={userId} />
  } 
  else if (page == "Class") { // 강의목록 페이지
    return <AppClassPage DB = {DataBase} userId={userId} />;
  }
};
