import React, { useState, useEffect } from "react";
import "./AppMyPage.css";
import axios from 'axios';

export default function AppMainPage({userId}) {

  const [users, setUsers] = useState({});
  const [classes, setClasses] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:4000/users", {params: {userID: userId}})
    .then( response => setUsers(response.data[0]) )
    .catch(console.log)
  
    axios.get("http://localhost:4000/classes", {params: {userID: userId}})
    .then( response => setClasses(response.data[0].data))
    .catch(console.log)

  }, [])


  return (
    <div id="MyPage">
      <div id="MyPageTitle">마이 페이지</div>
     
      <ViewUserData {...users} />
      <ViewMyClass classes={classes} />

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

const ViewMyClass = ({classes}) => {
  return <div id="MyClassInfo"> 
  <div>내 수업 목록</div>
  {classes && classes.map( (cl, index) => <ClassView key={cl.id} title={cl.mainTitle} index={index+1}/>)} 
  </div>
}
const ClassView = ({title='', index=1}) => <div style={{textAlign: 'left'}}>{index}. {title}</div>