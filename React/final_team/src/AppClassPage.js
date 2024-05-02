import React, { useState, useEffect } from 'react';
import "./css/AppClassPage.css";
import axios from 'axios';

export default function AppClassPage({userName, userId}) {
  
  const name = userName

  const [curPage, setCurPage] = useState("MyPage") // 현재 선택한 화면
  const [secondPage, setSecondPage] = useState(0) // 선택한 강의
  const [cl, setCl] = useState([])

  useEffect(()=>{
    console.log(cl)
  }, [cl])

  useEffect(()=>{  
    getClaases()

    
  }, [])

  const getClaases = () => {
    axios.get("http://localhost:4000/classes", {params: {userID: userId}})
    .then( response => setCl(response.data[0].data))
    .catch(()=>{
      
      axios.get("http://localhost:4000/classes")
      .then( response => {
        const id = response.data.length === 0 ? 1 : response.data[response.data.length - 1].id + 1;
        const createData = {
          id,
          userID: userId,
          data:[]
        }
        return createData
      })
      .then( createData => axios.post('http://localhost:4000/classes', createData))
      .catch(console.log)
      
    })
  }

  // setCurPage, setSecondPage를 하나의 핸들함수로 수정
  const handleOnClickMyPage = ({ curPageData = curPage, secondPageData = secondPage }) => {
    setCurPage(curPageData);
    setSecondPage(secondPageData);
  }

  // 클래스 개설
  const handleOnClickAddClass = ({title, content}) => {

    const mainTitle = title
    const id = cl.length === 0 ? 1 : cl[cl.length - 1].id + 1;
    const data = { 
      id,
      mainTitle, 
      image: "./logo192.png", 
      name,
      content,
      classData: [
        { 
          id: 1, 
          title: "강의 제목", 
          time: "월요일(00:00~00:01)", 
          step: "강의 내용",
          url: "https://www.youtube.com/"
        }
      ] 
    }
    const newCl = [...cl, data]

    // get을 통해서 id를 받아오고, id를 통해서 pacth를 한다
    axios.get("http://localhost:4000/classes", {params: {userID: userId}})
    .then( response => {
      if(response.data && response.data.length > 0){
        const id = response.data[0].id;
        return id;
      }
      else throw new Error("userId에 해당하는 data가 없습니다");
    })
    .then( id => {
      return axios.patch('http://localhost:4000/classes/'+id, {data: newCl})
    } )
    .then( () => {
      alert("["+title+"] 를 추가하는데 성공하였습니다")
      getClaases();
    } )
    .catch(console.log)
  }


  // 클래스 수정
  const handleOnClickUpdateClass = (id, mainTitle, content) => {

    const updateData =  cl.map( c => {
      if(c.id === id) return {...c, mainTitle, content}
      else return c
    })

    // get을 통해서 id를 받아오고, id를 통해서 pacth를 한다
    axios.get("http://localhost:4000/classes", {params: {userID: userId}})
    .then( response => {
      if(response.data && response.data.length > 0){
        const id = response.data[0].id;
        return id;
      }
      else throw new Error("userId에 해당하는 data가 없습니다");
    })
    .then( id => {
      return axios.patch('http://localhost:4000/classes/'+id, {data: updateData})
    } )
    .then( () => {
      alert("["+mainTitle+"] 으로 수정하는데 성공하였습니다")
      getClaases();
    } )
    .catch(console.log)

  }
  // 클래스 삭제
  const handleOnClickRemoveClass = (id) => {

    const deleteData = cl.filter( c => c.id !== id )

    // get을 통해서 id를 받아오고, id를 통해서 pacth를 한다
    axios.get("http://localhost:4000/classes", {params: {userID: userId}})
    .then( response => {
      if(response.data && response.data.length > 0){
        const id = response.data[0].id;
        return id;
      }
      else throw new Error("userId에 해당하는 data가 없습니다");
    })
    .then( id => {
      return axios.patch('http://localhost:4000/classes/'+id, {data: deleteData})
    } )
    .then( () => {
      alert("삭제되었습니다")
      getClaases();
    } )
    .catch(console.log)

  }

  // 강의(수업) 개설
  const handleOnClickAddClassData = ({id, title = '제목', time = '월요일(00:00~00:01)', step = "강의 내용", urlStr=''}) => {

    const createClassData = cl.map( data => {
        if (data.id === id) {
          const classId = data.classData.length === 0 ? 1 : data.classData[data.classData.length - 1].id + 1;
          return { ...data, classData: [...data.classData, { id:classId, title, name, time, step, urlStr }] }
        }
        return data
      } 
    )

    // get을 통해서 id를 받아오고, id를 통해서 pacth를 한다
    axios.get("http://localhost:4000/classes", {params: {userID: userId}})
    .then( response => {
      if(response.data && response.data.length > 0){
        const id = response.data[0].id;
        return id;
      }
      else throw new Error("userId에 해당하는 data가 없습니다");
    })
    .then( id => {
      return axios.patch('http://localhost:4000/classes/'+id, {data: createClassData})
    } )
    .then( () => {
      alert("["+title+"] 수업을 추가하는데 성공하였습니다")
      getClaases();
    } )
    .catch(console.log)
  }

  // 강의(수업 내용) 수정
  const handleOnClickUpdateClassData = ({curPage, classId, title, time, step, urlStr='https://www.youtube.com/'}) => {

    let url = urlStr
    if(url.indexOf('embed') === -1){
      let changeUrl = urlStr
      const index = changeUrl.indexOf('watch?v=') + 8
      changeUrl = changeUrl.slice(index, changeUrl.length)
      const secondIndex = changeUrl.indexOf('&')
      if(secondIndex !== -1){
        changeUrl = changeUrl.slice(0, secondIndex)
      }
      url = "https://www.youtube.com/embed/"+changeUrl
    }

    const updateClassData = cl.map( data => {
        if (data.id === curPage) {
          return {...data, classData: data.classData.map( c => {
            if (c.id === classId) return { ...c, title, time, step, url }
            else return c
          })
          }
        }
        else return data
      }
    )

    // get을 통해서 id를 받아오고, id를 통해서 pacth를 한다
    axios.get("http://localhost:4000/classes", {params: {userID: userId}})
    .then( response => {
      if(response.data && response.data.length > 0){
        const id = response.data[0].id;
        return id;
      }
      else throw new Error("userId에 해당하는 data가 없습니다");
    })
    .then( id => {
      return axios.patch('http://localhost:4000/classes/'+id, {data: updateClassData})
    } )
    .then( () => {
      alert("수업 내용을 수정하였습니다")
      getClaases();
    } )
    .catch(console.log)

  }

  // 강의(수업) 삭제
  const handleOnClickRemoveClassData = (curPage, secondPage) => {
    const deleteClassData = cl.map( data => {
        if (data.id === curPage) return { ...data, classData: data.classData.filter(c => c.id !== secondPage) }
        else return data
      }
    )

    // get을 통해서 id를 받아오고, id를 통해서 pacth를 한다
    axios.get("http://localhost:4000/classes", {params: {userID: userId}})
    .then( response => {
      if(response.data && response.data.length > 0){
        const id = response.data[0].id;
        return id;
      }
      else throw new Error("userId에 해당하는 data가 없습니다");
    })
    .then( id => {
      return axios.patch('http://localhost:4000/classes/'+id, {data: deleteClassData})
    } )
    .then( () => {
      alert("수업을 삭제하였습니다")
      setSecondPage(0)
      getClaases();
    } )
    .catch(console.log)
  }


  return (
    <span>
      <nav>
        <NavBox {...{ cl, handleOnClickMyPage }} />
      </nav>

      <section>
        <MainPage {...{
          handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass,
          handleOnClickAddClassData, handleOnClickUpdateClassData, handleOnClickRemoveClassData,
          handleOnClickMyPage,
          cl, curPage, secondPage, name
        }} />
      </section>
    </span>
  );
}

/* ---------------------- 중앙 좌측 네비게이션 ---------------------- */
// 중앙 좌측 네비게이션 (마이페이지, 각 클래스 등 네비게이션)
const NavBox = ({ cl, handleOnClickMyPage }) => {
  const [curNav, setCurNav] = useState(0);
  return <div>
    <button 
      id='MyClassPageButton' 
      style={{
        backgroundColor: curNav===0 ? '#444' : '',
        border: curNav===0 ? '4px solid orange' : '',
      }} 
      onClick={
        () => {
          handleOnClickMyPage({ curPageData: "MyPage", secondPageData: "MyPage" });
          setCurNav(0);
      }} >마이 강의</button>
    <hr style={{margin: '0 auto 40px auto', marginBottom: '40px', width: "90%"}}/>
    <ul>
      {cl.map((c) => <NavList key={c.id} {...{ id: c.id, mainTitle: c.mainTitle, handleOnClickMyPage, curNav, setCurNav }} />)}
    </ul>
</div>}
// 네비게이션 각 클래스 버튼
const NavList = ({ id = 0, mainTitle = '', handleOnClickMyPage, curNav, setCurNav }) => <li>
  <button 
    style={{
      backgroundColor: id===curNav ? '#444' : '',
      border: id===curNav ? '4px solid orange' : '',
    }} 
    onClick={() => {
      setCurNav(id);
      handleOnClickMyPage({ curPageData: id, secondPageData: 0 });
    }}
  >{mainTitle}</button>
</li>


/* ---------------------- 중앙 메인 페이지 ---------------------- */
// 클래스 : 웹개발응용  (하나의 강의)
// 강의   : 강의 안에 각 수업목록 : HTML, CSS, JS기본, React기초, React기본 문법 등등 (각 구성 목록)

// 중앙 우측 ( 좌축: 강의 목록 / 우측 : 선택 강의 자세한 내용 )
const MainPage = ({ curPage = 0, cl, secondPage, name, handleOnClickMyPage, handleOnClickAddClassData, handleOnClickUpdateClassData, handleOnClickRemoveClassData, handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass }) => {

  return (<div>

    <div id='MainPage' style={{width: curPage==='MyPage' ? '100%' : '50%'}}>
      <ChangePage {...{ curPage, cl, name, handleOnClickMyPage, handleOnClickAddClassData, handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass }} />
    </div>
    <div id='SecondPage' style={{width: curPage==='MyPage' ? '0%' : '50%'}}>
      <DetailPage {...{ curPage, cl, secondPage, handleOnClickRemoveClassData, handleOnClickUpdateClassData }} />
    </div>
  </div>)
}

// 마이페이지, 각 클래스 화면을 띄움 ( 좌측 화면 )
const ChangePage = ({ curPage = 0, cl, handleOnClickMyPage, handleOnClickAddClassData, handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass, name }) => {
  if (curPage === "MyPage") return <MyPage {...{ cl, handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass }} />
  else {
    return (
      cl.map(
        (c) => {
          if (c.id === curPage) return <ClassNumber key={c.id} {...{ id: c.id, title: c.mainTitle, classData: c.classData, handleOnClickMyPage, handleOnClickAddClassData, name, image: c.image }} />
          else return null
        })
    )
  }
}

// 해당 클래스에 강의를 띄움 
const ClassNumber = ({ id, title, image, name, classData, handleOnClickMyPage, handleOnClickAddClassData }) => {
  const [curClass, setCurClass] = useState(0);
  return (
    <div id='classNumber'>
      <h1 className='classTitle'>{title} 수업 목록</h1>
      <ul>
        {classData.map((cd) => {
          return <li
            key={cd.id}
            className='classBox'
            style={{backgroundColor: curClass===cd.id ? 'orange' : ''}}
            onClick={
              () => {
                handleOnClickMyPage({ secondPageData: cd.id });
                setCurClass(cd.id)
            }}
          > <ClassBox {...cd} name={name} image={image} /> </li>
        })}

        <div>
          <UpdatePage id={id} handleOnClickAddClassData={handleOnClickAddClassData} name={name} />
        </div>
      </ul>


    </div>
  );
}
// 강의 내용 추가 버튼 클릭 시 발생 / 강의를 추가하는 함수
const UpdatePage = ({ id, handleOnClickAddClassData, name }) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [title, setTitle] = useState('제목');

  const [select, setSelect] = useState('월') // 요일
  const [btime, setBtime] = useState('00:00') // 시작 시간
  const [atime, setAtime] = useState('00:01') // 끝나는 시간

  if (isUpdate) return <div>
    <div className='classBox'>
      <table className='tableBox'>
        <tbody>
          <tr>
            <td rowSpan={2}> 이미지 </td>
            <td> 제목 : <input type='text' size={10} value={title} onChange={(e) => setTitle(e.target.value)} /></td>
            <td rowSpan={2}> 
              <div>
                <span>요일/시간 : </span> 
                <select value={select} onChange={(e) => setSelect(e.target.value)}>
                  <option value='월'>월</option>
                  <option value='화'>화</option>
                  <option value='수'>수</option>
                  <option value='목'>목</option>
                  <option value='금'>금</option>
                </select>
              </div>
              <input style={{width: '110px'}} type='time' value={btime} onChange={(e) => setBtime(e.target.value)} />
              <input style={{width: '110px'}} type='time' value={atime} onChange={(e) => setAtime(e.target.value)} />
            </td>
          </tr>
          <tr>
            이름 : {name}
            {/*<td> 이름 : <input type='text' size={10} value={name} onChange={(e) => setName(e.target.value)} /> </td>*/}
          </tr>
        </tbody>
      </table>
    </div>

    <button className='addLecture' onClick={() => {
      setIsUpdate(false);
      handleOnClickAddClassData({id, title, name, time: select+"요일"+'('+btime+"~"+atime+')'});
      setTitle('제목'); setSelect('월'); setBtime('00:00'); setAtime('23:59');
    }}>추가하기</button>
    <button className='addLecture' onClick={() => setIsUpdate(false)}>취소하기</button>
  </div>
  else return <button className='addLecture' onClick={() => setIsUpdate(!isUpdate)}>강의 추가</button>
}

// 각 강의에 이미지, 제목, 시간 등을 리턴
const ClassBox = ({ image = '', title = '제목', name = '이름', time = '날짜/시간'}) => {
  return (
    <div className='textBt'>
      <table className='tableBox'>
        <tbody>
          <tr>
            <td rowSpan={2} ><img src={image} alt='이미지 없음' style={{width: '100%'}} /></td>
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
const DetailPage = ({ curPage, secondPage, cl, handleOnClickRemoveClassData, handleOnClickUpdateClassData }) => {
  return (<div>
    {
      cl.map(c => {
        if (c.id === curPage) {
          if (secondPage === 0) return <div key={c.id} id='noChoice'>강의를 선택하세요</div>
          else {
            return (
              c.classData.map(data => {
                if (data.id === secondPage) return <DetailUpdatePage key={data.id} {...{ curPage, secondPage, image: c.image, name: c.name, handleOnClickRemoveClassData, handleOnClickUpdateClassData, classData: data }} />
                else return null
              })
            )
          }
        }
        else return null
      })
    }
  </div>)
}
// 강의 수정, 삭제 기능을 담당
const DetailUpdatePage = ({ curPage, secondPage, image, name, classData, handleOnClickRemoveClassData, handleOnClickUpdateClassData }) => {

  const [updateClass, setUpdateClass] = useState(false)

  console.log(name)

  const [title, setTitle] = useState(classData.title)
  const [step, setStep] = useState(classData.step)
  const [urlStr, setUrlStr] = useState(classData.url)

  const timeStr = classData.time
  const [select, setSelect] = useState(timeStr[0]) // 요일
  const [btime, setBtime] = useState(timeStr.slice(timeStr.indexOf('(')+1, timeStr.indexOf('~'))) // 시작 시간
  const [atime, setAtime] = useState(timeStr.slice(timeStr.indexOf('~')+1, timeStr.indexOf(')'))) // 끝나는 시간

  // 선택한 강의가 없으면 -> else
  if (updateClass) {
    return <div className='viewContent'>
      <div className='content'>
        <div className='classTitle'><span style={{fontSize: '20px'}}>제목 : </span><input type='text' value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div className='classImage'><img src={image} alt='사진없음' /></div>
        <div className='className'><span style={{fontSize: '20px'}}>{name}</span></div>

        <span style={{fontSize: '20px'}}>요일/시간 : </span>
        <select value={select} onChange={(e) => setSelect(e.target.value)}>
          <option value='월'>월</option>
          <option value='화'>화</option>
          <option value='수'>수</option>
          <option value='목'>목</option>
          <option value='금'>금</option>
        </select>
        <input type='time' value={btime} onChange={(e) => setBtime(e.target.value)} />
        <input type='time' value={atime} onChange={(e) => setAtime(e.target.value)} />

        
        <br /><hr /><br />
        <div className='classUrl'><span style={{fontSize: '20px'}}>url : </span><input type='url' value={urlStr} onChange={(e) => setUrlStr(e.target.value)} /></div>
        <div className='classContent'>강의 내용</div>
        <textarea
          value={step}
          onChange={(e) => setStep(e.target.value)}>
        </textarea>
      </div>
      <div className='UpdateDataBt'>
        <button onClick={() => { handleOnClickUpdateClassData({curPage, classId: secondPage, title, time: select+"요일"+'('+btime+"~"+atime+')', step, urlStr}); setUpdateClass(false) }}>저장</button>
      </div>
    </div>
  }
  else if (secondPage !== 0 && !updateClass) {
    return <div className='viewContent'>
      <div className='content'>
        <div className='classTitle'>{classData.title}</div>
        <div className='classImage'><img src={image} alt='사진없음' /></div>
        <div className='className'>{name}</div>
        <div className='classTime'>{classData.time}</div>
        <br /><hr /><br />
        <div>
          <div>{urlStr === undefined && "영상이 없습니다"}</div>
          <iframe src={classData.url} style={{width: '600px', height: '400px'}}></iframe>
        </div>
        <div className='classContent'>강의 내용</div>
        <pre>{classData.step}</pre>
      </div>
      <div className='UpdateDataBt'>
        <button onClick={() => setUpdateClass(true)}>수정하기</button>
        <button onClick={() => { handleOnClickRemoveClassData(curPage, secondPage) }}>삭제하기</button>
      </div>
    </div>
  }
}

// 강의 마이페이지 ( 강좌 정보 추가, 수정, 삭제 등)
const MyPage = ({ cl, handleOnClickAddClass, handleOnClickUpdateClass, handleOnClickRemoveClass }) => {
  return (
    <div id='MyClassPage'>
      <h1 className='classTitle'>내 강의 목록</h1>
      <ul>
        {cl.map((c) => {
          return <UpdateLecture key={c.id} cData={c} handleOnClickUpdateClass={handleOnClickUpdateClass} handleOnClickRemoveClass={handleOnClickRemoveClass} />
        })}
        <div>
          <AddLecture handleOnClickAddClass={handleOnClickAddClass} />
        </div>
      </ul>

    </div>
  )
}
// 강의 마이페이지 클래스 이름 수정
const UpdateLecture = ({ cData, handleOnClickUpdateClass, handleOnClickRemoveClass }) => {

  const [isUpdate, setIsUpdate] = useState(false)
  const [mainTitle, setMainTitle] = useState(cData.mainTitle)
  const [content, setContent] = useState(cData.content)

  if (isUpdate) return <li className='myPageClass'>
    <div className='mainTitle'>
      <input type='text' value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} />
      <span className='maPageBt'><button onClick={() => { handleOnClickUpdateClass(cData.id, mainTitle, content); setIsUpdate(false) }}>저장</button></span>
      <hr style={{margin: '5px 0'}}/>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{backgroundColor: 'lightgray', width: '1000px', height: '63px', fontSize: '15px'}}>
      </textarea>
    </div>
    
  </li>
  else return <li className='myPageClass' style={{overflow: 'auto'}}>
    <div>
      <div className='mainTitle'>
        [{mainTitle}]
        <span className='maPageBt'>
          <button id="updateBt" onClick={() => setIsUpdate(true)}>수정</button>
          <button id="removeBt" onClick={() => handleOnClickRemoveClass(cData.id)}>삭제</button>
        </span>
      </div>
      <hr />
      <div><pre>{content}</pre></div>
    </div>
  </li>
}
// 클래스 추가 시 실행하는 함수
const AddLecture = ({ handleOnClickAddClass }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState('강의 이름');
  const [content, setContent] = useState('강의 설명')

  if (isAdd) return <div>
    <div className='classBox'>
      제목 <input type='text' size={10} value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{backgroundColor: 'lightgray', width: '1000px', height: '63px', fontSize: '15px', margin: '5px'}}>
      </textarea>
    </div>

    <button onClick={() => {
      setIsAdd(false);
      handleOnClickAddClass({title, content});
      setTitle('강의 이름');
    }}>추가하기</button>
    <button onClick={() => setIsAdd(false)}>취소하기</button>
  </div>
  else return <button className='addLecture' onClick={() => setIsAdd(!isAdd)}>클래스 개설</button>
}
