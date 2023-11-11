import { React, useState } from 'react';
import './App.css';

export default function App() {
  // 현재 선택한 클래스
  const [curPage, setCurPage] = useState("MyPage")
  // 선택한 강의
  const [secondPage, setSecondPage] = useState(0)
  // 각 클래스와 강의 정보
  const [cl, setCl] = useState([ 
    {id: 1, mainTitle: "웹개발응용", classData: [
          {id: 1, image: './logo192.png', title: "HTML / CSS / JavaScript", 
                  name: "최권택", time: "화 / (11:50 ! 14:30)", step: "HTML, CSS, JS의 기초를 다룹니다." },

          {id: 2, image: './logo192.png', title: "React 설치",              
                  name: "최권택", time: "화 / (11:50 ! 14:30)", step: "React를 설치해봅니다"  },

          {id: 3, image: './logo192.png', title: "React 기본 문법",         
                  name: "최권택", time: "화 / (11:50 ! 14:30)", step: "React 기본 문법을 배우고 기초적인 웹을 만들어 봅니다"  }
        ]
    },
    {id: 2, mainTitle: "모바일 프로그래밍", classData: [
        {id: 1, image: './logo192.png', title: "안드로이드 스튜디오 설치", 
                name: "양재형", time: "화 / (11:50 ! 14:30)", step: "안드로이드 스튜디오와 자바를 설치합니다" },

        {id: 2, image: './logo192.png', title: "자바 문법",                
                name: "양재형", time: "화 / (11:50 ! 14:30)", step: "자바의 기본적인 문법과 이론을 공부합니다" },

        {id: 5, image: './logo192.png', title: "버튼 구현",                
                name: "양재형", time: "화 / (11:50 ! 14:30)", step: "실제 앱을 제작하기 위한 기본적은 버튼을 구현해봅니다" }
      ]
  },
  {id: 3, mainTitle: "객체지향 프로그래밍", classData: [
      {id: 1, image: './logo192.png', title: "C++ 기초 문법",     
              name: "최병호", time: "화 / (11:50 ! 14:30)", step: "C++에서 사용하는 기본 문법을 다룹니다" },

      {id: 2, image: './logo192.png', title: "C++ 제어문",       
              name: "최병호", time: "화 / (11:50 ! 14:30)", step: "C++에서 사용하는 if, switch, for, while, do-while을 배우고 응용합니다" },

      {id: 3, image: './logo192.png', title: "C++ 클래스와 함수", 
              name: "최병호", time: "화 / (11:50 ! 14:30)", step: "C++ 클래스와 함수를 이용하여 객체지향을 배워봅니다" }
        ]
    }
  ]);

  // 네비게이션 수업 추가, 수정, 삭제
  const addClass = (title="제목") => {
    const mainTitle = title

    const id = cl.length===0 ? 1 : cl[cl.length-1].id + 1;
    const value = {id, mainTitle, classData: [{id: 1, image: './logo192.png', title: "강의 제목", name: "이름", time: "날짜/시간", step: "강의 내용" }] }

    setCl( [...cl, value] );
  }
  const updateClass = (id, mainTitle) => {
    setCl(cl.map( c => {
      if(c.id === id) return {...c, mainTitle};
      return c;
    } ) )
  }
  const removeClass = (id) => {
    setCl( cl.filter( c => c.id !== id ) );
  }


  // 세부 강의 내용 추가, 수정, 삭제
  const addClassData = (id, title='제목', name='이름', time='날짜/시간') => {
    const image = './logo192.png';
    setCl(cl.map( c => {
      if(c.id === id){
        const id = c.classData.length===0 ? 1 : c.classData[c.classData.length-1].id + 1;
        return {...c, classData: [...c.classData, {id, image, title, name, time, step: '강의 내용'}] }
      }
      return c
    } ) )
  }
  const removeClassData = (curPage, classId) => {
    setCl( cl.map( c => {
      if(c.id === curPage) {
        setSecondPage(0)
        return {...c, classData: c.classData.filter( data => data.id !== classId ) }
      }
      else return c
    } ) );
  }
  const updateClassData = (curPage, classId, title, name, time, step) => {
    setCl( cl.map( c => {
      if(c.id === curPage) {
        return {...c, classData: c.classData.map( data => {
          if(data.id === classId) return {...data, title, name, time, step}
          else return data
        } ) }
      }
      else return c
    } ) );
  }


  return (
    <div className='main'>
      <header>
        <Header />
      </header>

      <nav>
        <NavBox {...{cl, setCurPage, setSecondPage}} />
      </nav>

      <section>
        <MainPage {...{curPage, cl, addClass, updateClass, removeClass, addClassData, removeClassData, updateClassData, secondPage, setSecondPage}}/>
      </section>

      <footer>
        <div>*김상옥 201904022 / 김윤서 202104025</div>
        <div>이용재 202002451 / 이정인 202084025</div>
      </footer>
      
    </div>
  );
}

/* ---------------------- 상단 ---------------------- */ 
// 상단 (사이트 제목, 로그인, 로그아웃 등)
const Header = () => {
  return(
    <div>

      <img src='./logo512.png' alt='사이트 사진' />
      <h1> 기말 팀 프로젝트 </h1>
      <input type='button' value={"로그인"} id='login' />

    </div>
  );
}

/* ---------------------- 중앙 좌측 네비게이션 ---------------------- */ 
// 중앙 좌측 네비게이션 (마이페이지, 각 클래스 등 네비게이션)
const NavBox = ({cl, setCurPage, setSecondPage}) => ( <div>
  <button id='myPage' onClick={()=>{setCurPage("MyPage"); setSecondPage("MyPage")}} >마이페이지</button>
  <ul>
    { cl.map( (c)=> <NavList key={c.id} {...{id: c.id, mainTitle: c.mainTitle, setCurPage, setSecondPage}} /> ) }
  </ul>
</div>);
// 네비게이션 각 클래스 버튼
const NavList = ({id=0, mainTitle='', setCurPage, setSecondPage}) => <li>
  <button onClick={ ()=> {setCurPage(id); setSecondPage(0)} }>{mainTitle}</button>
</li>

/* ---------------------- 중앙 메인 페이지 ---------------------- */ 
// 클래스 : 웹개발응용  (전체적인 제목)
// 강의   : HTML, CSS, JS기본, React기초, React기본 문법 등등 (각 구성 목록)

// 중앙 우측 ( 좌축: 강의 목록 / 우측 : 선택 강의 자세한 내용 )
const MainPage = ({curPage=0, cl, addClass, updateClass, removeClass, addClassData, removeClassData, updateClassData, secondPage, setSecondPage}) => {

  return ( <div>
    <div id='MainPage'> 
      <ChangePage {...{curPage, cl, addClass, updateClass, removeClass, addClassData, setSecondPage}} />
    </div> 
    <div id='SecondPage'> 
      <DetailPage {...{curPage, secondPage, cl, removeClassData, updateClassData}}/>
    </div> 
  </div>)
}

// 마이페이지, 각 클래스 화면을 띄움 ( 좌측 화면 )
const ChangePage = ({curPage=0, cl, addClass, updateClass, removeClass, addClassData, setSecondPage}) => {
  if (curPage==="MyPage") return <MyPage {...{cl, addClass, updateClass, removeClass}} />
  else {
    return (
      cl.map( 
        (c)=> { 
          if(c.id === curPage) return <ClassNumber key={c.id} {...{id: c.id, title: c.mainTitle, classData: c.classData, addClassData, setSecondPage}}  />
          else return null
      })
  )}
}
// 해당 클래스에 강의를 띄움 
const ClassNumber = ({id, title, classData, addClassData, setSecondPage}) => {
  return(
    <div>
      <h1 className='classTitle'>{title} 강의 목록</h1>
      <ul>
        {classData.map( (cd) => {
          return <li 
            key={cd.id}
            className='classBox'
            onClick={()=> setSecondPage(cd.id) }
            > <ClassBox {...cd} /> </li>
        } ) }

        <div>
          <UpdatePage id={id} addClassData={addClassData} />
        </div>
      </ul>


    </div>
  );
}
// 강의 내용 추가 버튼 클릭 시 발생 / 강의를 추가하는 함수
const UpdatePage = ({id, addClassData}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [title, setTitle] = useState('제목');
  const [name, setName] = useState('이름');
  const [time, setTime] = useState('날짜/시간');
  
  if(isUpdate) return <div>
    <div className='classBox'>
      <table className='tableBox'>
        <tbody>
          <tr> 
            <td rowSpan={2}> 이미지 </td> 
            <td> 제목 : <input type='text' size={10} value={title} onChange={(e)=>setTitle(e.target.value)} /></td> 
            <td rowSpan={2}> 시간 : <input type='text' size={10} value={time} onChange={(e)=>setTime(e.target.value)} /></td>
          </tr>
          <tr> 
            <td> 이름 : <input type='text' size={10} value={name} onChange={(e)=>setName(e.target.value)} /> </td> 
          </tr>
        </tbody>
      </table>
    </div>

    <button className='addLecture' onClick={()=>{
      setIsUpdate(false); 
      addClassData(id, title, name, time);
      setTitle('제목'); setName('이름'); setTime('날짜/시간'); 
    }}>추가하기</button>
    <button className='addLecture' onClick={()=>setIsUpdate(false)}>취소하기</button>
  </div>
  else return <button className='addLecture' onClick={()=>setIsUpdate(!isUpdate)}>강의 추가</button>
}
// 각 강의에 이미지, 제목, 시간 등을 리턴
const ClassBox = ({image='', title='제목', name='이름', time='날짜/시간'}) => {
  return (
  <div className='textBt'>
    <table className='tableBox'>
      <tbody>
        <tr>
          <td rowSpan={2}><img src={image} alt='이미지 없음' width={'100px'} /></td>
          <td> {title} </td>
          <td rowSpan={2}>{time}</td>
        </tr>
        <tr>
          <td>{name}</td>
        </tr>
      </tbody>
    </table>
  </div>
  );
}

// DetailPage (중앙 우측 페이지) 해당 강의의 자세한 내용을 출력
const DetailPage = ({curPage, secondPage, cl, removeClassData, updateClassData}) => {
  return ( <div> 
    {
      cl.map( c => {
        if(c.id === curPage){
            if(secondPage === 0) return <div id='noChoice'>강의를 선택하세요</div>
            else{ 
              return(
                c.classData.map( data => {
                  if(data.id === secondPage) return <DetailUpdatePage key={data.id} {...{curPage, secondPage, removeClassData, updateClassData, classData: data}} />
                  else return null
                } )
            )} 
        }
        else return null
      })
    } 
  </div> )
}
// 강의 수정, 삭제 기능을 담당
const DetailUpdatePage = ({curPage, secondPage, removeClassData, updateClassData, classData}) => {

    const [updateClass, setUpdateClass] = useState(false)

    const [title, setTitle] = useState(classData.title)
    const [name, setName] = useState(classData.name)
    const [time, setTime] = useState(classData.time)
    const [step, setStep] = useState(classData.step)

    // 선택한 강의가 없으면 -> else
    if(updateClass){
      return <div className='viewContent'>
          <div className='content'>
            <div className='classTitle'><input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} /></div>
            <div className='classImage'><img src={classData.image} alt='사진없음' /></div>
            <div className='className'><input type='text' value={name} onChange={(e)=>setName(e.target.value)} /></div>
            <div className='classTime'><input type='text' value={time} onChange={(e)=>setTime(e.target.value)} /></div>
            <br /><hr /><br />
            <div className='classContent'>강의 내용</div>
            <textarea
              value={step} 
              onChange={(e)=>setStep(e.target.value)}></textarea>
          </div>
          <div className='UpdateDataBt'>
            <button onClick={()=>{updateClassData(curPage, secondPage, title, name, time, step); setUpdateClass(false)}}>저장</button>
          </div>
      </div>
    }
    else if(secondPage !== 0 && !updateClass){
      return <div className='viewContent'>
        <div className='content'>
          <div  className='classTitle'>{classData.title}</div>
          <div className='classImage'><img src={classData.image} alt='사진없음' /></div>
          <div className='className'>{classData.name}</div>
          <div className='classTime'>{classData.time}</div>
          <br /><hr /><br />
          <div className='classContent'>강의 내용</div>
          <pre>{classData.step}</pre>
        </div>
        <div className='UpdateDataBt'>
          <button  onClick={()=>setUpdateClass(true)}>수정하기</button>
          <button onClick={()=>removeClassData(curPage, secondPage)}>삭제하기</button>
        </div>
      </div>
    }
}

// 마이페이지 ( 강좌 정보 추가, 수정, 삭제 등)
const MyPage = ({cl, addClass, updateClass, removeClass}) => {
  return (
    <div>
       <h1 className='classTitle'>마이페이지</h1>
       <ul>
        {cl.map( (c) => {
          return <UpdateLecture  key={c.id} cData={c} updateClass={updateClass} removeClass={removeClass}/>
        } ) }
        <div>
          <AddLecture addClass={addClass} />
        </div>
      </ul>
      
    </div>
  )
}
// 마이페이지 클래스 이름 수정
const UpdateLecture = ({cData, updateClass, removeClass}) => {

  const [isUpdate, setIsUpdate] = useState(false)
  const [mainTitle, setMainTitle] = useState(cData.mainTitle)

  if(isUpdate) return <li className='myPageClass'>
      <div className='mainTitle'><input type='text' value={mainTitle} onChange={(e)=>setMainTitle(e.target.value)} /></div>
      <div className='maPageBt'><button onClick={() => {updateClass(cData.id, mainTitle); setIsUpdate(false)}}>저장</button></div>
  </li>
  else return <li className='myPageClass'>
    <div>
      <div className='mainTitle'><span>{mainTitle}</span></div>
      <div className='maPageBt'>
        <button id="updateBt" onClick={() => setIsUpdate(true)}>수정</button>
        <button id="removeBt" onClick={() => removeClass(cData.id)}>삭제</button>
      </div>
    </div>
  </li>
}
// 클래스 추가 시 실행하는 함수
const AddLecture = ({addClass}) => {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState('강의 이름');
  
  if(isAdd) return <div>
    <div className='classBox'>
      제목 <input type='text' size={10} value={title} onChange={(e)=>setTitle(e.target.value)} />
    </div>

    <button onClick={()=>{
      setIsAdd(false); 
      addClass(title === '' ? "강의 이름" : title);
      setTitle('강의 이름');
    }}>추가하기</button>
    <button onClick={()=>setIsAdd(false)}>취소하기</button>
  </div>
  else return <button className='addLecture' onClick={()=>setIsAdd(!isAdd)}>강의 추가</button>
}
