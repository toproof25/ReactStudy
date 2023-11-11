import { React, useState } from 'react';
import './App.css';

export default function App() {
  const [curPage, setCurPage] = useState("MyPage")
  const [secondPage, setSecondPage] = useState(0)

  const [cl, setCl] = useState([ 
    {id: 1, mainTitle: "웹개발응용", classData: [
          {id: 1, image: './logo192.png', title: "HTML / CSS / JavaScript", name: "최권택", time: "화 / (11:50 ! 14:30)", step: "HTML, CSS, JS의 기초를 다룹니다." },
          {id: 2, image: './logo192.png', title: "React 설치", name: "최권택", time: "화 / (11:50 ! 14:30)", step: "React를 설치해봅니다"  },
          {id: 3, image: './logo192.png', title: "React 기본 문법", name: "최권택", time: "화 / (11:50 ! 14:30)", step: "React 기본 문법을 배우고 기초적인 웹을 만들어 봅니다"  }
        ]
    },
    {id: 2, mainTitle: "모바일프로그래밍", classData: [
        {id: 1, image: './logo192.png', title: "안드로이드 스튜디오 설치", name: "양재형", time: "화 / (11:50 ! 14:30)", step: "안드로이드 스튜디오와 자바를 설치합니다" },
        {id: 2, image: './logo192.png', title: "자바 문법", name: "양재형", time: "화 / (11:50 ! 14:30)", step: "자바의 기본적인 문법과 이론을 공부합니다" },
        {id: 3, image: './logo192.png', title: "버튼 구현", name: "양재형", time: "화 / (11:50 ! 14:30)", step: "실제 앱을 제작하기 위한 기본적은 버튼을 구현해봅니다" }
      ]
  },
  {id: 3, mainTitle: "객체지향프로그래밍", classData: [
      {id: 1, image: './logo192.png', title: "C++ 기초 문법", name: "최병호", time: "화 / (11:50 ! 14:30)", step: "C++에서 사용하는 기본 문법을 다룹니다" },
      {id: 2, image: './logo192.png', title: "C++ 제어문", name: "최병호", time: "화 / (11:50 ! 14:30)", step: "C++에서 사용하는 if, switch, for, while, do-while을 배우고 응용합니다" },
      {id: 3, image: './logo192.png', title: "C++ 클래스와 함수", name: "최병호", time: "화 / (11:50 ! 14:30)", step: "C++ 클래스와 함수를 이용하여 객체지향을 배워봅니다" }
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
  const updateClass = (id) => {
    const afTitle = prompt("바꾸고자 하는 제목")
    setCl(cl.map( c => {
      if(c.id === id) return {...c, mainTitle: afTitle};
      return c;
    } ) )
  }
  const removeClass = (id) => {
    setCl( cl.filter( c => c.id !== id ) );
  }

  // 세부 강의 내용 추가
  const addClassData = (id, title='제목', name='이름', time='날짜/시간') => {
    const image = './logo192.png';
    setCl(cl.map( c => {
      if(c.id === id){
        const id = c.classData[c.classData.length-1].id + 1
        return {...c, classData: [...c.classData, {id, image, title, name, time, step: '강의 내용'}] }
      }
      return c
    } ) )
  }


  return (
    <div className='main'>

      <header>
        <Header />
      </header>

      <nav>
        <NavBox cl={cl} setCurPage={setCurPage} setSecondPage={setSecondPage} />
      </nav>

      <section>
          <MainPage {...{curPage, cl, addClass, updateClass, removeClass, addClassData, secondPage, setSecondPage}}/>
      </section>

      <footer>
        바닥
      </footer>
      
    </div>
  );
}

// header
const Header = () => {
  return(
    <div>
      <h1> 사이트 제목 </h1>
    </div>
  );
}
// nav
const NavBox = ({cl, setCurPage, setSecondPage}) => ( <div>
  <button onClick={()=>setCurPage("MyPage")} >마이페이지</button>
  <ul>
    { cl.map( (c)=> <NavList key={c.id}  id={c.id} mainTitle={c.mainTitle} setCurPage={setCurPage} setSecondPage={setSecondPage} /> ) }
  </ul>
</div>);
// nav li
const NavList = ({id=0, mainTitle='', setCurPage, setSecondPage}) => <li>
  <button onClick={ ()=> {setCurPage(id); setSecondPage(0)} }>{mainTitle}</button>
</li>

/* ---------------------- 중앙 메인 페이지 ---------------------- */ 

// main page
const MainPage = ({curPage=0, cl, addClass, updateClass, removeClass, addClassData, secondPage, setSecondPage}) => {

  return ( <div>
    <div id='MainPage'> 
      <ChangePage {...{curPage, cl, addClass, updateClass, removeClass, addClassData, setSecondPage}} />
    </div> 
    <div id='MainPage2'> 
      <DetailPage {...{curPage, secondPage, cl}}/>
    </div> 
  </div>)
}

// 마이페이지, 각 클래스 강좌 클릭 시 중앙 페이지가 바뀌는 컴퍼넌트
const ChangePage = ({curPage=0, cl, addClass, updateClass, removeClass, addClassData, setSecondPage}) => {
  if (curPage==="MyPage") return <MyPage {...{cl, addClass, updateClass, removeClass}} />
  else {
    return (
      cl.map( 
        (c)=> { 
          if(c.id === curPage) return <ClassNumber key={c.id} id={c.id} title={c.mainTitle} classData={c.classData} addClassData={addClassData} setSecondPage={setSecondPage}  />
          else return null
      })
  )}
}

// 각 강의 클릭 시
const ClassNumber = ({id, title, classData, addClassData, setSecondPage}) => {
  return(
    <div>
      <h1 className='classTitle'>{title} 강의 내용</h1>
      <ul>
        {classData.map( (cd, index) => {
          return <li 
            key={cd.id}
            className='classBox'
            onClick={()=> setSecondPage(index) }
            > <ClassBox {...cd} /> </li>
        } ) }

        <div>
          <UpdatePage id={id} addClassData={addClassData} />
        </div>
      </ul>


    </div>
  );
}

// 강의 내용 추가 시 실행하는 함수
const UpdatePage = ({id, addClassData}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [title, setTitle] = useState();
  const [name, setName] = useState();
  const [time, setTime] = useState();
  
  if(isUpdate) return <div>
    <div className='classBox'>
      <table className='tableBox'>
        <tbody>
          <tr> 
            <td rowSpan={2}> 이미지 </td> 
            <td> 제목 <input type='text' size={10} value={title} onChange={(e)=>setTitle(e.target.value)} /></td> 
            <td rowSpan={2}> 시간 <input type='text' size={10} value={time} onChange={(e)=>setTime(e.target.value)} /></td>
          </tr>
          <tr> 
            <td> 이름 <input type='text' size={10} value={name} onChange={(e)=>setName(e.target.value)} /> </td> 
          </tr>
        </tbody>
      </table>
    </div>

    <button onClick={()=>{
      setIsUpdate(false); 
      addClassData(id, title, name, time);
      setTitle(''); setName(''); setTime(''); 
    }}>추가하기</button>
    <button onClick={()=>setIsUpdate(false)}>취소하기</button>
  </div>
  else return <button onClick={()=>setIsUpdate(!isUpdate)}>강의 내용 추가</button>
}

// 강의 정보
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

// DetailPage
const DetailPage = ({curPage, secondPage, cl}) => {

  return ( <div> 
    {
      cl.map( c => {
        if(c.id === curPage)  {
          const find = c.classData[secondPage]
          return <div key={c.id}>
            <h1>{secondPage+1}. {find.title}</h1>
            <img src={find.image} alt='사진없음' />
            <h3>{find.name}</h3>
            <h3>{find.time}</h3>
            <br /><hr /><br />
            <p>{find.step}</p>
          </div>
        }
        else return null
        
      })}
 
  </div> )
}



// 마이페이지 ( 강좌 정보 추가, 수정, 삭제 등)
const MyPage = ({cl, addClass, updateClass, removeClass}) => {
  return (
    <div>
       <h1 className='classTitle'>마이페이지</h1>
       <ul>
        {cl.map( (c) => {
          return <li className='classBox' key={c.id}>
            {c.mainTitle}
            <button onClick={() => updateClass(c.id)}>수정</button>
            <button onClick={() => removeClass(c.id)}>삭제</button>
          </li>
        } ) }
        <div>
          <AddLecture addClass={addClass} />
        </div>
      </ul>
      
    </div>
  )
}

// 강의 추가 시 실행하는 함수
const AddLecture = ({addClass}) => {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState('');
  
  if(isAdd) return <div>
    <div className='classBox'>
      제목 <input type='text' size={10} value={title} onChange={(e)=>setTitle(e.target.value)} />
    </div>

    <button onClick={()=>{
      setIsAdd(false); 
      addClass(title === '' ? "제목" : title);
      setTitle('');
    }}>추가하기</button>
    <button onClick={()=>setIsAdd(false)}>취소하기</button>
  </div>
  else return <button onClick={()=>setIsAdd(!isAdd)}>강의 추가</button>
}

/* ---------------------- 중앙 메인 페이지 END ---------------------- */ 