import React, { useState, useEffect } from "react";
import axios from 'axios';

/*
 로그인 페이지 구현 컴포넌트

 로그인은 현재 로그인하는 id와 password가
  users에 loginID 와 password가 맞는 정보가 있다면 setLogin(true) 실행하고, handleSetsetUserId(user.userID) 실행

 회원가입, axios.post로 users에 새로운 데이터 추가
*/

export default function AppLogin({ setLogin, handleSetsetUserId }) {

  const [users, setUsers] = useState([]);

  // 컴포넌트 실행되면 json users정보를 get해서 setUsers를 함
  useEffect(()=>{
    axios.get("http://localhost:4000/users")
    .then( r => setUsers(r.data) )
    .catch(console.log)
  }, [])


  return (
    <div id="login" style={{height: '85%'}}>
      <h1 style={{fontSize: '50px'}}>[div id='login']안에 로그인 페이지 제작</h1>
      {users.map( user => <div key={user.id}>
            <div>id : {user.loginID}</div>
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
