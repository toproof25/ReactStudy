import React, { useState, useEffect } from "react";
import axios from "axios";
/*

메인 페이지 컴포넌트

대충 구성만 하고, 아무 사진 넣고, 공지사항만 제목들만 나오게 하면 될 듯 (학교 홈페이지 공지사항 나오는 거 처럼)

*/

export default function AppMainPage({userId}) {

  //axios -> json 으로 데이터 받아오는 경우
  const [users, setUsers] = useState([]);
  const [notice, setNotice] = useState([]);

  // 컴포넌트 실행되면 json users, notice(공지사항)정보를 get해서 set 함
  useEffect(()=>{
    axios.get("http://localhost:4000/users", {params: {userID: userId}})
    .then( response => setUsers(response.data) )
    .catch(console.log)

    axios.get("http://localhost:4000/notice")
    .then( response => setNotice(response.data) )
    .catch(console.log)
  }, [])


  // div에 height: '85%'만 놔두고 나머지는 삭제해도 상관없습니다.
  return (
    <div style={{height: '85%', backgroundColor: 'yellowgreen'}}>
      <h1 style={{fontSize: '100px'}}>메인 페이지</h1>
      {notice.map( n => <div key={n.id}>
            <div>id : {n.id}</div>
            <div>title : {n.title}</div>
            <div>name : {n.name}</div>
            <div>date : {n.date}</div>
            <div>content : {n.content}</div>
            <br />
        </div> )}

        <br /><br />

        {users.map( user => <div key={user.userID}>
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
    </div>
  );
}
