import React, {useState} from 'react';
import AppClassPage from './AppClassPage.js';
import AppLogin from './AppLogin.js';

import './App.css';
/*
hook, CRUD : 각 클래스와 강의 목록을 추가, 삭제, 수정이 가능하게 활용함
비동기 함수 async / await : 
  실제 DB에서 정보를 확인하여 가져오지는 않지만 [AppDatbase.js] 컴포넌트 하나를 DB처럼 사용하고, 각 CRUD작업에 딜레이를 줌
  
*/

export default function App() {

  const [login, setLogin] = useState(false) // 로그인 여부를 확인
  
  return (
    <div className='main'>
      <header>
        <Header login={login} setLogin={setLogin} />
      </header>

      <Main {...{login, setLogin}} />
      
      <footer>
        <div>*김상옥 201904022 / 김윤서 202104025</div>
        <div>이용재 202002451 / 이정인 202084025</div>
      </footer>
      
    </div>
  );
}

/* ---------------------- 상단 ---------------------- */ 
// 상단 (사이트 제목, 로그인, 로그아웃 등)
const Header = ({login, setLogin}) => {
  return(
    <div>
      <img src='./logo512.png' alt='사이트 사진' />
      <h1> 기말 팀 프로젝트 </h1>
      {(()=>{ 
        // 로그인이 되어 있을 때만 로그아웃 버튼이 상단에 배치됨
        if(login) return <input type='button' value={"로그아웃"} id='login' onClick={()=>setLogin(false)} /> }
      )()}
      

    </div>
  );
}

const Main = ({login, setLogin}) => {
  if(!login){ // 로그인 상태가 아닐 경우 로그인 페이지
    return <AppLogin setLogin={setLogin}/>
  }
  else{ // 로그인 상태이면서 강의 목록을 클릭 할 경우 (아직은 구현 x)
    return <AppClassPage />
  }
}