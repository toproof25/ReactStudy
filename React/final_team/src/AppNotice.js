import React, { useState, useEffect } from "react";
import axios from 'axios';

/*
 공지사항 페이지 컴포넌트

 공지사항을 목록으로 보여주고, 각 공지사항에 대해서 작성, 수정, 추가 기능이 들어가면 됩니다.
 이러닝 캠퍼스에 공지사항 들어가면 나오는 화면정도로 해서 간단하게 작업하면 됩니다.
 화면 구성이나 그런거는 알아서 구성하시면 됩니다. 정 어렵다면 AppClassPage컴포넌트 참고해서 작성해면 될 거 같습니다.


                            ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ 
  나중에 코드를 주실 때 꼭 AppNotice.js 이외에 수정한 부분을 주석으로 표시해주세용.

  함수를 만들었다면 함수명(){} // (코드 설명) 
  ex) addUser(){} // (공지사항 리스트 기능)

  이런 느낌으로  어떤 기능인지만 주석으로 표시해주면 코드를 합칠 때 편할 거 같습니다.
                            ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

 """제가 만든 코드에서 이해안가는 부분이 있다면 톡주시면 최대한 바로 답장해드리겠습니다"""
*/

export default function AppNotice({userId}) {
  const [notice, setNotice] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:4000/notice")
    .then( response => setNotice(response.data) )
    .catch(console.log)
  }, [])

  useEffect(()=>{
    console.log(notice)
  }, [notice])

  // userData.userID 와 userId 값이 같은 사람의 이름을 작성자로 넣으면 됩니다. (로그인한 사람의 이름)

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
