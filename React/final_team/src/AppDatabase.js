import { useState } from 'react';

export default function AppDatabase() {

  // 유저 정보
  const [userData, setUserData] = useState([
    { userID: 1, id: 'test', password: '1234', name: "홍길동", adress: '경기도 용인시 기흥구 강남로 40', phone: '010-1234-5678', email: 'test@gmail.com', gender: 'man', year: 2000, month: 1, day: 1 },
    { userID: 2, id: 'qwer', password: 'qwer1234', name: "김철수", adress: '경기 용인시 기흥구 강남로 3', phone: '010-1122-3344', email: 'qwer@naver.com', gender: 'woman', year: 1999, month: 5, day: 26 }
  ]);

  // 공지사항 정보
  const [notice, setNotice] = useState([
    {id: 1, title: "공지사항 테스트 useState입니다.", name: "작성자", date: "2023-11-16", content: "공지사항 내용"},
    {id: 2, title: "공지사항22 테스트22 useState입니다.22", name: "작성자22", date: "2023-11-18", content: "공지사항 내용2222"}
  ])

  // 각 클래스와 강의 정보
  const [classes, setClasses] = useState([
    { // 1번 유저의 클래스 목록과 각 클래스의 강의 목록 데이터
      userID: 1,
      data: [
        {
          id: 1, 
          mainTitle: "웹개발응용", 
          classData: 
          [
            {id: 1, image: './logo192.png', title: "HTML / CSS / JavaScript",
              name: "최권택", time: "화요일(11:50 ~ 14:20)", step: "HTML, CSS, JS의 기초를 다룹니다."},
            {id: 2, image: './logo192.png', title: "React 설치",
              name: "최권택", time: "화요일(11:50 ~ 14:20)", step: "React를 설치해봅니다"},
            {id: 3, image: './logo192.png', title: "React 기본 문법",
              name: "최권택", time: "화요일(11:50 ~ 14:20)", step: "React 기본 문법을 배우고 기초적인 웹을 만들어 봅니다"}
          ]
        },
        {
          id: 2, 
          mainTitle: "모바일 프로그래밍", 
          classData: 
          [
            {id: 1, image: './logo192.png', title: "안드로이드 스튜디오 설치",
              name: "양재형", time: "화요일(14:30 ~ 17:20)", step: "안드로이드 스튜디오와 자바를 설치합니다"},
            {id: 2, image: './logo192.png', title: "자바 문법",
              name: "양재형", time: "화요일(14:30 ~ 17:20)", step: "자바의 기본적인 문법과 이론을 공부합니다"},
            {id: 5, image: './logo192.png', title: "버튼 구현",
              name: "양재형", time: "화요일(14:30 ~ 17:20)", step: "실제 앱을 제작하기 위한 기본적은 버튼을 구현해봅니다"}
          ]
        },
        {
          id: 3, 
          mainTitle: "객체지향 프로그래밍", 
          classData: 
          [
            {id: 1, image: './logo192.png', title: "C++ 기초 문법",
              name: "최병하", time: "목요일(9:00 ~ 14:30)", step: "C++에서 사용하는 기본 문법을 다룹니다"},
            {id: 2, image: './logo192.png', title: "C++ 제어문",
              name: "최병하", time: "목요일(9:00 ~ 14:30)", step: "C++에서 사용하는 if, switch, for, while, do-while을 배우고 응용합니다"},
            {id: 3, image: './logo192.png', title: "C++ 클래스와 함수",
              name: "최병하", time: "목요일(9:00 ~ 14:30)", step: "C++ 클래스와 함수를 이용하여 객체지향을 배워봅니다"}
          ]
        }
      ]
    }, 

    { // 2번 유저의 클래스 목록과 각 클래스의 강의 목록 데이터
      userID: 2,
      data: [
        {
          id: 1, 
          mainTitle: "가상현실프로그래밍", 
          classData: 
          [
            {id: 1, image: './logo192.png', title: "가상현일이란?",
              name: "백성용", time: "수요일(9:00~11:40)", step: "가상현일이 무엇일까요"},
            {id: 2, image: './logo192.png', title: "유니티 설치",
              name: "백성용", time: "수요일(9:00~11:40)", step: "유니티를 통해 가상현실 게임 개발하기"},
            {id: 3, image: './logo192.png', title: "VR장비 세팅",
              name: "백성용", time: "수요일(9:00~11:40)", step: "오큘러스 퀘스트를 세팅합니다"}
          ]
        },
        {
          id: 2, 
          mainTitle: "인성과학문IV", 
          classData: 
          [
            {id: 1, image: './logo192.png', title: "인성과학문 영상 강의",
              name: "강현우", time: "목요일(14:40~15:30)", step: "인성과학문"},
            {id: 2, image: './logo192.png', title: "인성과학문 영상 강의2",
              name: "강현우", time: "목요일(14:40~15:30)", step: "인성과학문2"},
            {id: 5, image: './logo192.png', title: "인성과학문 영상 강의3",
              name: "강현우", time: "목요일(14:40~15:30)", step: "인성과학문3"}
          ]
        },
        {
          id: 3, 
          mainTitle: "3D모델링", 
          classData: 
          [
            {id: 1, image: './logo192.png', title: "블렌더 설치",
              name: "신은하", time: "금요일(11:40 ~ 2:30)", step: "블렌더를 설치합니다"},
            {id: 2, image: './logo192.png', title: "간단한 모델링",
              name: "신은하", time: "금요일(11:40 ~ 2:30)", step: "간단한 캐릭터를 모델링 합니다"},
            {id: 3, image: './logo192.png', title: "뼈 추가하기",
              name: "신은하", time: "금요일(11:40 ~ 2:30)", step: "모델링에 뼈를 추가하여 움직입니다."}
          ]
        }
      ]
    }
  ]);

  // 딜레이를 주기 위한 함수
  /* 
    딜레이를 주는 이유 :
        실제 웹 사이트에서 로그인이나 장바구니에 물건을 추가하는 등 작업을 수행할 때 딜레이가 있음 
        -> 그러한 작업 시 서버에 연결하고, DB에 데이터를 추가하거나 수정하는 등의 작업이 이루어지는 만큼의 딜레이가 존재
        --> 해당 프로젝트에서는 실제 DB가 아닌 컴포넌트를 DB처럼 사용하기에 고의적으로 딜레이를 걸어서 실제 웹사이트에서 작업을 하는 것 같은 같은 효과를 줌.
        ---> (팀플 -> 배운 걸 활용) 비동기 방식을 활용하기 위해 사용해봄
  */
  const sleep = (time) => { return new Promise((resolve) => setTimeout(resolve, time * 1000)); }


  // 클래스 추가, 수정, 삭제
  const addClass = async (userId, title = "제목") => {
    const mainTitle = title
    const cl = classes.filter( c => c.userID === userId )[0].data
    const id = cl.length === 0 ? 1 : cl[cl.length - 1].id + 1;
    const data = [...cl, { id, mainTitle, classData: [{ id: 1, image: './logo192.png', title: "강의 제목", name: "이름", time: "날짜/시간", step: "강의 내용" }] }]

    await sleep(0.3);
    setClasses(
      classes.map( c => {
        if (c.userID === userId) return {...c, data}
        else return c
      })
    )
    return '클래스 개설가 개설 되었습니다.';
  }
  const updateClass = async (userId, id, mainTitle) => {
    await sleep(0.2);
    setClasses(
      classes.map( c => {
        if (c.userID === userId) return {
          ...c, 
          data: c.data.map( 
            data => {
              if (data.id === id) return { ...data, mainTitle }; 
              return data; 
        } ) }
        else return c
      }) 
    )
    return '클래스 이름이 수정되었습니다.';
  }
  const removeClass = async (userId, id) => {
    const cl = classes.filter( c => c.userID === userId )[0].data
    const title = cl.filter(c => c.id === id)[0].mainTitle

    await sleep(0.5);
    setClasses(
      classes.map( c => {
        if (c.userID === userId) return {...c, data: c.data.filter( d => d.id !== id ) }
        else return c
      })
    )
    return title + ' 클래스를 삭제하였습니다.'
  }


  // 세부 강의 내용 추가, 수정, 삭제
  const addClassData = async (userId, id, title, name, time) => {
    const image = './logo192.png';

    await sleep(0.3);

    setClasses(
      classes.map( cl => {
        if (cl.userID === userId) return {
          ...cl, 
          data: cl.data.map( 
            data => {
              if (data.id === id) {
                const id = data.classData.length === 0 ? 1 : data.classData[data.classData.length - 1].id + 1;
                return { ...data, classData: [...data.classData, { id, image, title, name, time, step: '강의 내용' }] }
              }
              return data
            } 
        )}
        else return cl
      })
    )
    return '새로운 강의를 개설하였습니다.'
  }
  const removeClassData = async (userId, curPage, classId) => {
    await sleep(0.5);

    setClasses(
      classes.map( cl => {
        if (cl.userID === userId) return {
          ...cl, 
          data: cl.data.map( 
            data => {
              if (data.id === curPage) return { ...data, classData: data.classData.filter(c => c.id !== classId) }
              else return data
            }
        )}
        else return cl
      })
    )

    return '강의를 삭제하였습니다.'
  }
  const updateClassData = async (userId, curPage, classId, title, name, time, step) => {
    
    await sleep(0.2);
    setClasses(
      classes.map( cl => {
        if (cl.userID === userId) return {
          ...cl, 
          data: cl.data.map( 
            data => {
              if (data.id === curPage) {
                return {
                  ...data, classData: data.classData.map(
                    c => {
                      if (c.id === classId) return { ...c, title, name, time, step }
                      else return c
                  })
                }
              }
              else return data
            }
        )}
        else return cl
      })
    )

    return '강의 내용을 수정하였습니다.'
  }

  // ------------------------------- ↓↓ 새로운 함수 추가 ↓↓ -------------------------------//

  // 공지사항 notice, setNotice에 관련된 CRUD 필요

  // 회원정보 userData, setUserData에 관련된 CRUD 필요


  return {
    classes, userData, notice,
    addClass, updateClass, removeClass,
    addClassData, removeClassData, updateClassData
  }
}



