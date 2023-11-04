import React from 'react';
import { useState, useEffect } from 'react';

export default function AppTest() {
  
  const data = {age: 36, name: "김상옥"};
  const data2 = {...data, address: "처인구 유림동"};

  let height = 170;
  const data3 = {...data2, height}

  const [dataList, setDataList] = useState([]);

  useEffect( () => {
    console.log("실행딤")
    setDataList([ {...data}, {...data2}, {...data3} ]);
  }, [])

  useEffect( ()=>{
    console.log(dataList);
  }, [dataList])
  

  return (
    <div>
      <h1>메인</h1>
      <hr />
      
      {dataList.map( (x, index) => (
        //<AddList index={index} age={x.age}  name={x.name}  address={x.address} height={x.height} />
        <div onClick={ () => {
          console.log("이거는 ", index);
          setDataList(dataList.filter( (x, idx) => idx!=index));
        }}>
          <AddList index={index} {...x} />
        </div>
      ))}

      <button onClick={ ()=> setDataList([...dataList, {age: 11, name: "나나"}]) }>버튼 추가</button>
    </div>
  );
}

const AddList = ({index=0, age=0, name='', address='', height=0}) => {


  return (
    <div>
      <span> 순번 : {index} </span>
      <span> 나이 : {age} </span>
      <span> 이름 : {name} </span>
      <span> 주소 : {address} </span>
      <span> 키 : {height} </span>
    </div>);
}