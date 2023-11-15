import React, {useState} from 'react';
import DB from './AppDatabase.js';
import './App.css';

/*
hook, CRUD : 각 클래스와 강의 목록을 추가, 삭제, 수정이 가능하게 활용함
비동기 함수 async / await : 
  실제 DB에서 정보를 확인하여 가져오지는 않지만 컴포넌트 하나를 DB처럼 사용하고, 
  각 CRUD작업에 딜레이를 줌
*/

export default function App() {

  const [curPage, setCurPage] = useState("MyPage") // 현재 선택한 화면
  const [secondPage, setSecondPage] = useState(0) // 선택한 강의
  const { cl, addClass, updateClass, removeClass, addClassData, removeClassData, updateClassData} = DB(); // 수업 정보와 함수들 (컴퍼넌트를 DB처럼 활용)

  // setCurPage, setSecondPage를 하나의 핸들함수로 수정
  const handleOnClickMyPage = ({curPageData = curPage, secondPageData = secondPage}) => {
    console.log(secondPageData, secondPage);
    setCurPage(curPageData); 
    setSecondPage(secondPageData);
  }

  // 클래스 개설
  const handleOnClickAddClass = async (title) => {
    const message = await addClass(title);
    alert(message)
  }
  // 클래스 수정
  const handleOnClickUpdateClass = async (id, mainTitle) => {
    const message = await updateClass(id, mainTitle);
    alert(message)
  }
  // 클래스 삭제
  const handleOnClickRemoveClass = async (id) => {
    const message = await removeClass(id);
    alert(message)
  }

  // 강의 개설
  const handleOnClickAddClassData = async (id, title='제목', name='이름', time='날짜/시간') => {
    const message = await addClassData(id, title, name, time);
    alert(message)
  }
  // 강의 삭제
  const handleOnClickRemoveClassData = async (curPage, secondPage) => {
    const message = await removeClassData(curPage, secondPage);
    setSecondPage(0);
    alert(message)
  }
  // 강의 수정
  const handleOnClickUpdateClassData = async (curPage, classId, title, name, time, step) => {
    const message = await updateClassData(curPage, classId, title, name, time, step);
    alert(message)
  }

  return (
    <div className='main'>
      <header>
        <Header />
      </header>

      <nav>
        <NavBox {...{cl, handleOnClickMyPage}} />
      </nav>

      <section>
        <MainPage {...{handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass, 
                      handleOnClickAddClassData, handleOnClickUpdateClassData, handleOnClickRemoveClassData, 
                      handleOnClickMyPage,
                      cl, curPage, secondPage}}/>
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
const NavBox = ({cl, handleOnClickMyPage}) => ( <div>
  <button id='myPage' onClick={()=>handleOnClickMyPage({curPageData: "MyPage", secondPageData: "MyPage"})} >마이페이지</button>
  <ul>
    { cl.map( (c)=> <NavList key={c.id} {...{id: c.id, mainTitle: c.mainTitle, handleOnClickMyPage}} /> ) }
  </ul>
</div>);
// 네비게이션 각 클래스 버튼
const NavList = ({id=0, mainTitle='', handleOnClickMyPage}) => <li>
  <button onClick={ ()=> handleOnClickMyPage({curPageData: id, secondPageData: 0}) }>{mainTitle}</button>
</li>


/* ---------------------- 중앙 메인 페이지 ---------------------- */ 
// 클래스 : 웹개발응용  (하나의 강의)
// 강의   : 강의 안에 각 수업목록 : HTML, CSS, JS기본, React기초, React기본 문법 등등 (각 구성 목록)

// 중앙 우측 ( 좌축: 강의 목록 / 우측 : 선택 강의 자세한 내용 )
const MainPage = ({curPage=0, cl, secondPage, handleOnClickMyPage, handleOnClickAddClassData, handleOnClickUpdateClassData, handleOnClickRemoveClassData, handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass}) => {

  return ( <div>
    <div id='MainPage'> 
      <ChangePage {...{curPage, cl, handleOnClickMyPage, handleOnClickAddClassData, handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass}} />
    </div> 
    <div id='SecondPage'> 
      <DetailPage {...{curPage, cl, secondPage, handleOnClickRemoveClassData, handleOnClickUpdateClassData}}/>
    </div> 
  </div>)
}

// 마이페이지, 각 클래스 화면을 띄움 ( 좌측 화면 )
const ChangePage = ({curPage=0, cl, handleOnClickMyPage, handleOnClickAddClassData, handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass}) => {
  if (curPage==="MyPage") return <MyPage {...{cl, handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass}} />
  else {
    return (
      cl.map( 
        (c)=> { 
          if(c.id === curPage) return <ClassNumber key={c.id} {...{id: c.id, title: c.mainTitle, classData: c.classData, handleOnClickMyPage, handleOnClickAddClassData}}  />
          else return null
      })
  )}
}
// 해당 클래스에 강의를 띄움 
const ClassNumber = ({id, title, classData, handleOnClickMyPage, handleOnClickAddClassData}) => {
  return(
    <div id='classNumber'>
      <h1 className='classTitle'>{title} 강의 목록</h1>
      <ul>
        {classData.map( (cd) => {
          return <li 
            key={cd.id}
            className='classBox'
            onClick={()=> handleOnClickMyPage({secondPageData: cd.id}) }
            > <ClassBox {...cd} /> </li>
        } ) }

        <div>
          <UpdatePage id={id} handleOnClickAddClassData={handleOnClickAddClassData} />
        </div>
      </ul>


    </div>
  );
}
// 강의 내용 추가 버튼 클릭 시 발생 / 강의를 추가하는 함수
const UpdatePage = ({id, handleOnClickAddClassData}) => {
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
      handleOnClickAddClassData(id, title, name, time);
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
const DetailPage = ({curPage, secondPage, cl, handleOnClickRemoveClassData, handleOnClickUpdateClassData}) => {
  return ( <div> 
    {
      cl.map( c => {
        if(c.id === curPage){
            if(secondPage === 0) return <div id='noChoice'>강의를 선택하세요</div>
            else{ 
              return(
                c.classData.map( data => {
                  if(data.id === secondPage) return <DetailUpdatePage key={data.id} {...{curPage, secondPage, handleOnClickRemoveClassData, handleOnClickUpdateClassData, classData: data}} />
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
const DetailUpdatePage = ({curPage, secondPage, classData, handleOnClickRemoveClassData, handleOnClickUpdateClassData}) => {

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
            <button onClick={()=>{handleOnClickUpdateClassData(curPage, secondPage, title, name, time, step); setUpdateClass(false)}}>저장</button>
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
          <button onClick={()=>{handleOnClickRemoveClassData(curPage, secondPage)}}>삭제하기</button>
        </div>
      </div>
    }
}

// 마이페이지 ( 강좌 정보 추가, 수정, 삭제 등)
const MyPage = ({cl, handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass}) => {
  return (
    <div id='MyPage'>
       <h1 className='classTitle'>마이페이지</h1>
       <ul>
        {cl.map( (c) => {
          return <UpdateLecture  key={c.id} cData={c} handleOnClickUpdateClass={handleOnClickUpdateClass} handleOnClickRemoveClass={handleOnClickRemoveClass}/>
        } ) }
        <div>
          <AddLecture handleOnClickAddClass={handleOnClickAddClass} />
        </div>
      </ul>
      
    </div>
  )
}
// 마이페이지 클래스 이름 수정
const UpdateLecture = ({cData, handleOnClickUpdateClass, handleOnClickRemoveClass}) => {

  const [isUpdate, setIsUpdate] = useState(false)
  const [mainTitle, setMainTitle] = useState(cData.mainTitle)

  if(isUpdate) return <li className='myPageClass'>
      <div className='mainTitle'><input type='text' value={mainTitle} onChange={(e)=>setMainTitle(e.target.value)} /></div>
      <div className='maPageBt'><button onClick={() => {handleOnClickUpdateClass(cData.id, mainTitle); setIsUpdate(false)}}>저장</button></div>
  </li>
  else return <li className='myPageClass'>
    <div>
      <div className='mainTitle'><span>{mainTitle}</span></div>
      <div className='maPageBt'>
        <button id="updateBt" onClick={() => setIsUpdate(true)}>수정</button>
        <button id="removeBt" onClick={() => handleOnClickRemoveClass(cData.id)}>삭제</button>
      </div>
    </div>
  </li>
}
// 클래스 추가 시 실행하는 함수
const AddLecture = ({handleOnClickAddClass}) => {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState('강의 이름');
  
  if(isAdd) return <div>
    <div className='classBox'>
      제목 <input type='text' size={10} value={title} onChange={(e)=>setTitle(e.target.value)} />
    </div>

    <button onClick={()=>{
      setIsAdd(false); 
      handleOnClickAddClass(title === '' ? "강의 이름" : title);
      //addClass(title === '' ? "강의 이름" : title);
      setTitle('강의 이름');
    }}>추가하기</button>
    <button onClick={()=>setIsAdd(false)}>취소하기</button>
  </div>
  else return <button className='addLecture' onClick={()=>setIsAdd(!isAdd)}>클래스 개설</button>
}
