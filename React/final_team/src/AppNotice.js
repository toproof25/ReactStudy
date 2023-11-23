import React, { useState, useEffect } from "react";
import axios from 'axios';

/*
 공지사항 페이지 컴포넌트

 axios, json을 활용하여 CRUD기능만 넣으면 될 거 같음

 db.json에 "notice"를 활용
*/

export default function AppNotice({name, userId}) {


  //axios -> json 으로 데이터 받아오는 경우
  const [notice, setNotice] = useState([]);

  // 컴포넌트 실행되면 json notice(공지사항) 정보를 get해서 setNotice 함
  useEffect(()=>{
    axios.get("http://localhost:4000/notice")
    .then( response => setNotice(response.data) )
    .catch(console.log)
  }, [])


  // 작성자 -> name
  // div에 height: '85%'만 놔두고 나머지는 삭제해도 상관없습니다.
  return (
    <div style={{height: '85%', backgroundColor: 'orange'}}>
      <h1 style={{fontSize: '100px'}}>공지사항 페이지</h1>
      {notice.map( n => <div key={n.id}>
            <div>id : {n.id}</div>
            <div>title : {n.title}</div>
            <div>name : {n.name}</div>
            <div>date : {n.date}</div>
            <div>content : {n.content}</div>
            <br />
        </div> )}

    </div>
  );
}
