import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AppViewClass() {

  const [classData, setClassData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/classes')
      .then( (response) => {setClassData(response.data.map( cl => cl.data) )})
      .catch(console.log);
  }, []);


  useEffect(()=>{
    console.log(classData, 'class')
  }, [classData])

  return (
    <div id='ViewClass' style={{height: '85%', overflow: 'auto'}}>
      <h1 style={{ fontSize: '50px', marginLeft: '30px', marginTop: '20px' }}>강의 조회</h1>

      <div style={{padding: '20px 15px 0 100px'}}>

        {
          classData.map( (cd) => { 
            if(cd.length === 0) return null
            else return(
              <div key={cd.id} style={{width: '100%', marginBottom: '10px'}}>
                <h1>{cd[0].name} 강의</h1>
                <div style={{overflow: 'hidden'}}>{cd.map( data => <ViewClass key={data.id} {...data} image={data.image} />)}</div>
                <hr />
              </div>
            )}
          )
        }

      </div>
    </div>
  );
}

const ViewClass = ({image, mainTitle, name, content}) => {

  const [test, setTest] = useState(false);

  return (
    <div 
      style={{
        float: 'left', 
        border: '1px solid rgb(0,0,0, 0.1)',
        width: '200px', height: '300px',
        position: 'relative',
        margin: '15px'
      }} 
      onMouseEnter={()=>setTest(true)}
      onMouseLeave={()=>setTest(false)}
    >
      <div style={{height: '200px'}}><img src={image} alt='사진오류' style={{width: '200px'}} /></div>
      <div style={{fontSize: '20px', fontWeight:'bold', marginLeft: '5px'}} ><span>{mainTitle}</span></div>
      <div style={{fontSize: '14px', marginLeft: '5px', marginTop:'10px'}} ><span >{name}</span></div>

      {/* 마우스 div에 올라가면 나오는 화면 */}
      <div style={{
        visibility: test ? '' : 'hidden',
        color: '#fff',
        backgroundColor : 'rgb(0,0,0, 0.85)',
        width: '100%',height: '100%', 
        position: 'absolute', top: '0px', left: '0px'}}
      >
      <div style={{textAlign: 'center', margin: '40px 0 20px 0', fontSize:'20px'}}>{mainTitle}</div> 
      <hr />
      <div style={{textAlign: 'center', margin: '20px 0', fontSize:'16px'}}>{content}</div> 

      </div>
    </div>
  )
}