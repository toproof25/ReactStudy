import React, { useState } from "react";

/*
 로그인 페이지 구현 컴포넌트

 DB -> './AppDatabase.js' 에서 유저 데이터 정보를 가져옵니다.
 ex) {id: 'test', password: '1234', name: "홍길동", adress: '경기도 용인시 기흥구 강남로 40', 
      phone: '010-1234-5678', email: 'test@gmail.com', gender: 'man',  year: 2000, month: 1, day: 1}

 아이디, 비밀번호, 이름, 주소, 폰번호, 이메일, 성별, 생년월일(년, 월, 일) 정보가 있습니다. 
 생각나는 정보들을 담았는데 더 추가하거나 해도 좋습니다.
    
 로그인과 회원가입 구현하고, 더 구현할 거 있으면 구현하면 좋을 거 같습니다(아이디 찾기, 비번 찾기?)
 

 --로그인--
 아이디, 비밀번호를 입력받고 Login버튼을 클릭 시 setLogin(true)를 실행하면 됩니다.

 로그인 성공 여부는 userData변수를 이용해서 
    입력한 id == DB id 
    입력한 password == DB password
 일치하는 데이터가 있으면 로그인 성공 / 없으면 로그인 실패
 함수 구현은 비동기 방식(11, 12주차 웹개발응용 수업 내용)에서 async, await방식을 사용해서 함수를 작성하면 됩니다.
 
 --회원가입--
 1. [아이디, 비밀번호, 이름, 주소, 폰번호, 이메일, 성별, 생년월일(년, 월, 일)]을 입력받습니다.
 2. AppDatabase.js에 [addClass, updateClass, removeClass] 처럼 userData와 setUserData를 활용해서 알맞게 CRUD를 하시면 됩니다.
 3. AppDatabase.js 밑에 return에 만드신 CRUD함수를 리턴값에 작성한 후 해당 컴포넌트에서 회원가입 동작에 맞게 설정해주시면 됩니다.

  css까지 하면 좋겠지만, 어렵거나 시간 없으시면 먼저 기능 구현하고 천천히 꾸며봅시다.

                            ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ 
  나중에 코드를 주실 때 꼭 AppLogin.js 이외에 수정한 부분을 주석으로 표시해주세용.

  DB 컴포넌트에 함수를 만들었다면 함수명(){} // 이름 (코드 설명) 
  ex) addUser(){} // 김상옥 (회원가입 시 유저 정보 추가)

  이런 느낌으로 [누가, 어떤 기능] 정보만 주석으로 표시해주면 코드를 합칠 때 편할 거 같습니다.
                            ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

 """제가 만든 코드에서 이해안가는 부분이 있다면 톡주시면 최대한 바로 답장해드리겠습니다"""
*/

export default function AppLogin({ setLogin, DB, handleSetsetUserId }) {
  const { userData } = DB;
  
  // handleSetsetUserId( UserID ) 이 함수에 로그인을 성공하는 사람의  userData.userID 값을 넣어주시면 됩니다.

  return (
    <div id="login">
      <h1 style={{fontSize: '50px'}}>[div id='login']안에 로그인 페이지 제작</h1>
      {userData.map( user => <div key={user.userID}>
            <div>id : {user.id}</div>
            <div>pw : {user.password}</div>
            <div>name : {user.name}</div>
            <div>adress : {user.adress}</div>
            <div>phone : {user.phone}</div>
            <div>email : {user.email}</div>
            <div>gender : {user.gender}</div>
            <div>year : {user.year}</div>
            <div>month : {user.month}</div>
            <div>day : {user.day}</div>
            <br />
        </div> )}
      <button
        style={{ width: "150px", height: "50px" }}
        onClick={() => {
          setLogin(true);
          handleSetsetUserId(1);
        }}
      >
        ----Login----
      </button>
    </div>
  );
}
