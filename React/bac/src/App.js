import React, { useState, useEffect } from 'react';

export default function App() {
  const [answer, setAnswer] = useState(['-','-','-','-']);
  const [isStart, setIsStart] = useState(false);

  const [playNum, setPlayNum] = useState([]);
  
  useEffect(()=>{
    console.log(playNum);
  }, [playNum])
  
  const gameStart = () => {
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
      
      <h1>Balls and Cows</h1>

      <button onClick={gameStart}>시작하기</button>
      <hr />

      <div>
        <span style={{margin: '5px', textAlign: 'center', fontSize: '30px'}}>정답 : </span>
        {answer.map( (answer)=>  <span
          style={{display: 'inline-block', margin: '5px', border: 'solid 1px #ff0000', textAlign: 'center', lineHeight: '100px', fontSize: '30px', width: '100px', height: '100px'}}>
            <span style={{opacity : isStart ? '0%' : '100%'}}>{answer}</span>
          </span>
        )}
        <button onClick={()=>setIsStart(false)}>정답 보기</button>
      </div>

      <div>
        <span style={{margin: '5px', textAlign: 'center', fontSize: '30px'}}>작성 : </span>
        {playNum.map( (num)=>  <span
          style={{display: 'inline-block', margin: '5px', border: 'solid 1px #ff0000', textAlign: 'center', lineHeight: '100px', fontSize: '30px', width: '100px', height: '100px'}}
          onClick={(e) => { 
            console.log("ㅎㅇㅎㅇㅎㅇ")
            e.target.text = "dasa"
           }}
          >{num}
          </span>
        )}
      </div>

    </div>
  );
}
