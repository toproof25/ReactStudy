import React, { useState } from "react";

/*
 메인 페이지 컴포넌트

 메인 페이지에 달력이나, 일정, 사진, 공지사항 등..  학교 홈페이지 참고해서 간단하게 구성하면 됩니다.
 일정이나 사진 같은 거는 가상의 홈페이지?니까 일단 아무 사진이나 일정에 아무말이나 적으면서 작업하면 될 거 같습니다.

                            ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ 
  나중에 코드를 주실 때 꼭 AppMainPage.js 이외에 수정한 부분을 주석으로 표시해주세용.

  함수를 만들었다면 함수명(){} // (코드 설명) 
  ex) addUser(){} // (공지사항 리스트 기능)

  이런 느낌으로  어떤 기능인지만 주석으로 표시해주면 코드를 합칠 때 편할 거 같습니다.
                            ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

 """제가 만든 코드에서 이해안가는 부분이 있다면 톡주시면 최대한 바로 답장해드리겠습니다"""
*/

export default function AppMainPage({DB, userId}) {
  const { notice, userData } = DB; // 공지사항, 유저정보(이름)

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
    </div>
  );
}
