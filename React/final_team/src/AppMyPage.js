import React, { useState } from "react";

export default function AppMainPage({DB, userId}) {
  const { classes, userData } = DB; // 내 수업 목록, 유저정보(이름)

  const myData = userData.filter( user => user.userID === userId )[0]
  const myClass = classes.filter( cl => cl.userID === userId )[0].data

  console.log(myData, 'dada')
  console.log(myClass, 'dada')

  return (
    <div id="MyPage">
      <div id="MyPageTitle">마이 페이지</div>
     
      <ViewUserData {...myData} />
      <ViewMyClass myClass={myClass} />

    </div>
  );
}

const ViewUserData = ({id, password, name, adress, phone, email, gender, year, month, day}) => {
  return <div id="MyInfo">

    <div>개인정보</div>
    <ul>
      <li id="myId">     <span>아이디 : </span>   <span>{id}</span></li>
      <li id="myPw">     <span>비밀번호 : </span> <span>{password}</span></li>
      <li id="myName">   <span>이름 : </span>     <span>{name}</span></li>
      <li id="myAdress"> <span>주소 : </span>     <span>{adress}</span></li>
      <li id="myPhone">  <span>번호 : </span>     <span>{phone}</span></li>
      <li id="myEmail">  <span>이메일 : </span>   <span>{email}</span></li>
      <li id="myGender"> <span>성별 : </span>     <span>{gender}</span></li>
      <li id="myYMD"> <span>생년월일 : </span>  <span>{year}/</span><span>{month}/</span><span>{day}</span></li>
    </ul>
  </div>
}

const ViewMyClass = ({myClass}) => {return <div id="MyClassInfo"> 
  <div>내 수업 목록</div>
  {myClass.map( (cl, index) => <ClassView key={cl.id} title={cl.mainTitle} index={index+1}/>)} 
</div>}
const ClassView = ({title='', index=1}) => <div style={{textAlign: 'left'}}>{index}. {title}</div>