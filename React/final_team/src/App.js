import { React, useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [curPage, setCurPage] = useState("myPage")

  const [cl, setCl] = useState([ 
    {id: 1, mainTitle: "웹개발응용", classData: {
        page: "웹개발응용 강의 내용",
        classData: [
          {image: './logo192.png', title: "웹개발응용", name: "최권택", time: "화 / (11:50 ! 14:30)" },
          {image: './logo192.png', title: "웹개발응용2", name: "최권택", time: "화 / (11:50 ! 14:30)" },
          {image: './logo192.png', title: "웹개발응용3", name: "최권택", time: "화 / (11:50 ! 14:30)" }
        ]
      }
    },
    {id: 2, mainTitle: "모바일프로그래밍", classData: {
      page: "모바일프로그래밍 강의 내용",
      classData: [
        {image: './logo192.png', title: "모바일프로그래밍", name: "양재형", time: "화 / (11:50 ! 14:30)" },
        {image: './logo192.png', title: "모바일프로그래밍", name: "양재형", time: "화 / (11:50 ! 14:30)" },
        {image: './logo192.png', title: "모바일프로그래밍", name: "양재형", time: "화 / (11:50 ! 14:30)" }
      ]
    }
  },
  {id: 3, mainTitle: "객체지향프로그래밍", classData: {
    page: "객체지향프로그래밍 강의 내용",
    classData: [
      {image: './logo192.png', title: "객체지향프로그래밍", name: "최병호", time: "화 / (11:50 ! 14:30)" },
      {image: './logo192.png', title: "객체지향프로그래밍2", name: "최병호", time: "화 / (11:50 ! 14:30)" },
      {image: './logo192.png', title: "객체지향프로그래밍3", name: "최병호", time: "화 / (11:50 ! 14:30)" }
        ]
      }
    }
  ]);

  // 네비게시연 수업 추가, 수정, 삭제
  const addClass = () => {
    const mainTitle = prompt('강의 이름');
    const id = cl[cl.length-1].id + 1;
    const value = {id, mainTitle, classData: {page: "", classData: []} }
    setCl( [...cl, value] );
  }
  const updateClass = () => {
    const beTitle = prompt("수정할 강의 이름")
    const afTitle = prompt("바꾸고자 하는 제목")
    setCl(cl.map( c => {
      if(beTitle === c.mainTitle) return {...c, mainTitle: afTitle};
      return c;
    } ) )
  }
  const removeClass = () => {
    const title = prompt('삭제할 강의 이름');
    setCl( cl.filter( c => c.mainTitle != title ) );
  }

  useEffect( ()=>{
    console.log(curPage)
  }, [curPage] )

  return (
    <div className='main'>

      <header>
        <Header />
      </header>

      <nav>
        <NavBox cl={cl} setCurPage={setCurPage} />
        <button onClick={addClass}>추가</button>
        <button onClick={updateClass}>수정</button>
        <button onClick={removeClass}>삭제</button>
      </nav>

      <section>
        { cl.map( (c)=> {
          if(c.mainTitle === curPage) return <ClassNumber key={c.id} data={c.classData} />
        } ) }
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
      <h1> 00강의 사이트 </h1>
    </div>
  );
}

// nav
const NavBox = ({cl, setCurPage}) => <ul>
    { cl.map( (c)=> <NavList key={c.id}  id={c.id} mainTitle={c.mainTitle} setCurPage={setCurPage} /> ) }
</ul>
// nav li
const NavList = ({id=0, mainTitle='', setCurPage}) => <li 
    key={id} onClick={ ()=> {setCurPage(mainTitle)} }>{mainTitle}
</li>


// n class
const ClassNumber = ({data=[]}) => {
  return(
    <div>
      <h1 className='classTitle'>{data.page}</h1>
      <ul>
        {data.classData.map( (cd) => {
          return <li className='classBox'> <ClassBox {...cd} /> </li>
        } ) }
      </ul>
    </div>
  );
}

// 강의 창 1개
const ClassBox = ({image='', title='', name='', time=''}) => {
  return (
  <table>
    <tr> <td rowSpan={2}> <img src={image} alt='이미지 없음' width={'100px'} /> </td> <td> {title} </td> <td rowSpan={2}> {time} </td> </tr>
    <tr> <td> {name} </td> </tr>
  </table>
  );
}
