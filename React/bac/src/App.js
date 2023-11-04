import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [answer, setAnswer] = useState(['-','-','-','-']); // 정답 배열
  const [isStart, setIsStart] = useState(false);           // 게임 상황 확인
  const [playNum, setPlayNum] = useState([]);              // 현재 플레이 넘버 배열
  
  useEffect(()=>{
    console.log(playNum);
  }, [playNum])
  

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
    setPlayNum(result);
  }

  return (
    <div>
      
      <div id='title'>
        <span >Balls and Cows</span>
        <button onClick={gameStart}>시작하기</button>
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
        <span style={{margin: '5px', textAlign: 'center', fontSize: '30px'}}>작성 : </span>
        {playNum.map( (num, index)=> (
          <button key={index} className='numberBox' 
            onClick={(e) => {
              let number = parseInt(e.target.textContent) + 1;
              if(number === 10) number = 0;
              e.target.textContent = number;
              console.log("ㅎㅇㅎㅇㅎㅇ", e.target.textContent)
            }}
          >{num}</button> 
        ))}
        <button onClick={()=> console.log("확인하기") }>확인하기</button>
      </div>

    </div>
  );
}
