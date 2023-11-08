// eslint-disable-next-line
import { React, useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [curPage, setCurPage] = useState("MyPage")

  const [cl, setCl] = useState([ 
    {id: 1, mainTitle: "웹개발응용", classData: {
        page: "웹개발응용 강의 내용",
        data: [
          {image: './logo192.png', title: "웹개발응용", name: "최권택", time: "화 / (11:50 ! 14:30)" },
          {image: './logo192.png', title: "웹개발응용2", name: "최권택", time: "화 / (11:50 ! 14:30)" },
          {image: './logo192.png', title: "웹개발응용3", name: "최권택", time: "화 / (11:50 ! 14:30)" }
        ]
      }
    },
    {id: 2, mainTitle: "모바일프로그래밍", classData: {
      page: "모바일프로그래밍 강의 내용",
      data: [
        {image: './logo192.png', title: "모바일프로그래밍", name: "양재형", time: "화 / (11:50 ! 14:30)" },
        {image: './logo192.png', title: "모바일프로그래밍", name: "양재형", time: "화 / (11:50 ! 14:30)" },
        {image: './logo192.png', title: "모바일프로그래밍", name: "양재형", time: "화 / (11:50 ! 14:30)" }
      ]
    }
  },
  {id: 3, mainTitle: "객체지향프로그래밍", classData: {
    page: "객체지향프로그래밍 강의 내용",
    data: [
      {image: './logo192.png', title: "객체지향프로그래밍", name: "최병호", time: "화 / (11:50 ! 14:30)" },
      {image: './logo192.png', title: "객체지향프로그래밍2", name: "최병호", time: "화 / (11:50 ! 14:30)" },
      {image: './logo192.png', title: "객체지향프로그래밍3", name: "최병호", time: "화 / (11:50 ! 14:30)" }
        ]
      }
    }
  ]);

  // 네비게이션 수업 추가, 수정, 삭제
  const addClass = () => {
    const mainTitle = prompt('강의 이름');
    const id = cl.length===0 ? 1 : cl[cl.length-1].id + 1;
    const value = {id, mainTitle, classData: {page: "", data: []} }
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


  const addClassData = (id, title, name, time) => {
    const image = './logo192.png';

    const value = {image, title, name, time}

    setCl(cl.map( c => {
      if(c.id === id){
        return {...c, classData: {page: c.classData.page, data: [...(c.classData.data), value] }}
      }
      return c
    } ) )
  }


  return (
    <div className='main'>

      <header>
        <Header setCurPage={setCurPage} />
      </header>

      <nav>
        <NavBox cl={cl} setCurPage={setCurPage} />
      </nav>

      <section>
        <MainPage curPage={curPage} cl={cl} addClass={addClass} updateClass={updateClass} removeClass={removeClass} addClassData={addClassData} />
      </section>

      <footer>
        바닥
      </footer>
      
    </div>
  );
}


// header
const Header = ({setCurPage}) => {
  return(
    <div>
      <h1> 00강의 사이트 </h1>
      <button onClick={()=>setCurPage("MyPage")} >마이페이지</button>
    </div>
  );
}

// nav
const NavBox = ({cl, setCurPage}) => <ul>
    { cl.map( (c)=> <NavList key={c.id}  id={c.id} mainTitle={c.mainTitle} setCurPage={setCurPage} /> ) }
</ul>
// nav li
const NavList = ({id=0, mainTitle='', setCurPage}) => <li>
  <button onClick={ ()=> {setCurPage(id)} }>{mainTitle}</button>
</li>


// main page Class
const MainPage = ({curPage=0, cl, addClass, updateClass, removeClass, addClassData}) => {

  // 마이페이지, 각 클래스 강좌 클릭 시 중앙 페이지가 바뀌는 함수
  const changePage  = () => {
    if (curPage==="MyPage") return <MyPage cl={cl} addClass={addClass} updateClass={updateClass} removeClass={removeClass} />
    else {
      return (
        cl.map( 
          (c)=> { 
            if(c.id === curPage) return <ClassNumber key={c.id} id={c.id} classData={c.classData} addClassData={addClassData}  /> } )
    )}
  }
  return ( <div> { changePage() } </div> )
}

// 각 강의 클릭 시
const ClassNumber = ({id, classData, addClassData}) => {

  const [isUpdate, setIsUpdate] = useState(false);

  const [title, setTitle] = useState();
  const [name, setName] = useState();
  const [time, setTime] = useState();

  const updatePage = () => {
    if(isUpdate) return <div>
      제목 <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} />
      이름 <input type='text' value={name} onChange={(e)=>setName(e.target.value)} />
      시간 <input type='text' value={time} onChange={(e)=>setTime(e.target.value)} />

      <button onClick={()=>{
        setIsUpdate(false); 
        addClassData(id, title, name, time);
        setTitle(''); setName(''); setTime(''); 
      }}>추가하기</button>
      <button onClick={()=>setIsUpdate(false)}>취소하기</button>
    </div>
    else return <button onClick={()=>setIsUpdate(!isUpdate)}>강의 내용 추가/수정하기</button>
  }

  return(
    <div>
      <h1 className='classTitle'>{classData.page}</h1>
      <ul>
        {classData.data.map( (cd) => {
          return <li className='classBox'> <ClassBox {...cd} /> </li>
        } ) }
      </ul>


      <div>
        {updatePage()}
      </div>
    </div>
  );
}
// 강의 정보
const ClassBox = ({image='', title='제목', name='이름', time='날짜/시간'}) => {
  return (
  <table>
    <tr> <td rowSpan={2}> <img src={image} alt='이미지 없음' width={'100px'} /> </td> <td> {title} </td> <td rowSpan={2}> {time} </td> </tr>
    <tr> <td> {name} </td> </tr>
  </table>
  );
}

// 마이페이지 ( 강좌 정보 추가, 수정, 삭제 등)
const MyPage = ({cl, addClass, updateClass, removeClass}) => {
  return (
    <div>
       <h1 className='classTitle'>마이페이지</h1>
       <ul>
        {cl.map( (c) => {
          return <li className='classBox'>
            {c.mainTitle}
            <button onClick={() => updateClass(c.id)}>수정</button>
            <button onClick={() => removeClass(c.id)}>삭제</button>
          </li>
        } ) }

      <button onClick={() => addClass()}>추가</button>
      </ul>
    </div>
  )
}

const UpdatePage = () => {
  return (
    <div>
      제목 <input type='text' />
      이름 <input type='text' />
      시간 <input type='text' />
    </div>
  )
}
