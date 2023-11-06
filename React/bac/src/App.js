import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const [answer, setAnswer] = useState(['-','-','-','-']); // 정답 배열
  const [isStart, setIsStart] = useState(false);           // 게임 상황 확인
  const [playNum, setPlayNum] = useState([]);              // 현재 플레이 넘버 배열
  
  const playRef = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const gameStart = () => {
    /* 
      게임 스타트 버튼 누를 때 실행되는 함수
      난이도 설정 후 숫자 배정
    */
    if(isStart) return false;

    let difficulty;
    while(difficulty<1 || difficulty>10 || isNaN(difficulty)){
      difficulty = prompt("맞출 숫자 개수 설정(1개 ~ 10개) : ");
    }

    let numArr = [1,2,3,4,5,6,7,8,9,0]
    let result = [];
    for(let i=1; i<=difficulty; i++){
      let numIndex = Math.floor(Math.random() * numArr.length);
      result = [...result, numArr[numIndex]]
      // eslint-disable-next-line
      numArr = (numArr.filter( (num) => num !== numArr[numIndex]))
    }

    let amout = result.length
    setAnswer(result);
    setIsStart(true);

    result = []
    for(let i=1; i<=amout; i++){
      result = [...result, 0];
    }

    setPlayNum([...playNum, {id: 1, nums: result, SBF: [0,0,0]}]);
    
  }

  return (
    <div>
      
      <div id='title'>
        <span >Balls and Cows</span>
        <button onClick={gameStart}>시작하기</button>
        <button onClick={()=>{
          //console.log(answer, "정답들")
          console.log(playNum, "플레이넘버들")
          // console.log(playRef)
          // for(let i=0; i<answer.length; i++){
          //   console.log(playRef[i].current.value, "----playRef")
          // }
        }}>정보확인</button>
      </div>

      <br />
      <hr />

      <div>
        <span style={{margin: '5px', textAlign: 'center', fontSize: '30px'}}>정답 : </span>
        {answer.map( (answer, index)=> (
          <span className='answerBox' key={index}>
            <span style={{opacity : isStart ? '0%' : '100%'}}>{answer}</span>
          </span>
        ))}
        <button onClick={()=>setIsStart(false)}>정답 보기</button>
      </div>

      <div>      
        {playNum.map( (play, index)=> {
          return <div style={{border: 'solid 1px blue', position: 'relative'}}>

            <span style={{margin: '5px', textAlign: 'center', fontSize: '30px'}}>작성 : </span>
            
            {play.nums.map( (num, index)=> {
              return <span>
                <input 
                  type='button' 
                  value={num}
                  className='numberBox' 
                  ref={playRef[index]}
                  onClick={(e) => {
                    let number = parseInt(e.target.value) + 1;
                    if(number === 10) number = 0;
                    e.target.value = number;
                  }} // onClick end
                /></span>
            }) } 

            <ul style={{display: 'inline-block', border: 'solid 1px red', position: 'absolute', top:'25%', right: '10%'}}>
              <li>S : {play.SBF[0]}</li>
              <li>B : {play.SBF[1]}</li>
              <li>F : {play.SBF[2]}</li>
            </ul>

          </div>
        }) } 
      </div>

      <button onClick={()=> {
        const id = playNum[playNum.length-1].id + 1
        let nums = []
        for(let i=0; i<answer.length; i++){
          nums = [...nums, parseInt(playRef[i].current.value)]
        }

        let S=0, B=0, F=0
        for(let i=0; i<answer.length; i++){
          if(answer.indexOf(nums[i]) >= 0){
            if(answer[i] === nums[i])
              S += 1;
            else
              B += 1;
          }
          else{
            F += 1;
          }
        }
        const SBF = [S,B,F]


        const resultArr = playNum.map( (play, idx) => {
          if(idx === playNum.length-1){
            console.log(nums)
            return {id: play.id, nums, SBF}
          }
          else return play
        })

        setPlayNum([...resultArr, {id, nums, SBF: [0,0,0]}]) // 새로 추가

      } }>확인하기</button>
      
    </div>
  );
}
