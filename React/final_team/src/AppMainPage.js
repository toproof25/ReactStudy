import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AppMainPage({ userId }) {
  const [notice, setNotice] = useState([]);
  const [day, setDay] = useState([]);
  const [images, setImages] = useState([
    // 이미지 불러오기
    { id: 1, title: 'Image 1', uri: '/logo192.png' },
    { id: 2, title: 'Image 2', uri: '/logo192.png' },
    { id: 3, title: 'Image 3', uri: '/logo192.png' },
    { id: 4, title: 'Image 4', uri: '/logo192.png' },
  ]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/notice')
      .then((response) => setNotice(response.data))
      .catch(console.log);

    axios
      .get('http://localhost:4000/day')
      .then((response) => setDay(response.data))
      .catch(console.log);
  }, []);

  return (
    <div
      style={{
        height: '85%',
        backgroundColor: '#ffffff',
        color: '#000000',
      }}
    >
      <div >
        <div style={{margin: '0 auto', width: '1000px', textAlign: 'center'}}>

        <img
          src='main.png'
          alt='메인 이미지'
          style={{ width: '1000px', marginTop: '30px'}}
        />

        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '50px',
        }}
      >
        {/* 공지사항 */}
        <div >
          <h2 style={{ fontSize: '70px' }}>공지사항</h2>
          <div
            style={{
              backgroundColor: '#87CEFA',
              width: '100%',
              height: '10px',
            }}
          ></div>
          <table >
            <thead>
              {/* 공지사항 목록 */}
              <tr>
                <th style={{ fontSize: '40px', padding: '0 10px', width: '200px' }}>번호</th>
                <th style={{ fontSize: '40px', padding: '0 10px', width: '600px' }}>제목</th>
                <th style={{ fontSize: '40px', padding: '0 10px', width: '200px' }}>작성자</th>
              </tr>
            </thead>
            <tbody >
              {notice.map((n, index) => (
                <tr key={n.id} style={{height:'60px'}}>
                  {/* 공지사항 세부사항 */}
                  <td style={{ fontSize: '20px', padding: '0 30px', textAlign: 'center' }}>
                    {index+1}
                  </td>
                  <td style={{ fontSize: '20px', padding: '0 30px', textAlign: 'center' }}>
                    {n.title}
                  </td>
                  <td style={{ fontSize: '20px', padding: '0 30px', textAlign: 'center' }}>
                    {n.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/*학사일정*/}
        <div style={{ marginLeft: '100px' }}>
          <h2 style={{ fontSize: '70px' }}>업데이트</h2>
          <div
            style={{
              backgroundColor: '#32CD32',
              width: '100%',
              height: '10px',
            }}
          ></div>
          {/* 학사일정 목록*/}
          <table>
            <thead>
              <tr>
                <th style={{ fontSize: '40px', padding: '0 20px' }}>Date</th>
                <th style={{ fontSize: '40px', padding: '0 20px' }}>Update</th>
              </tr>
            </thead>
            <tbody>
              {day.map((n) => (
                <tr key={n.ID} style={{height:'60px'}}>
                  {/* 학사일정 내용 */}
                  <td style={{ fontSize: '16px', textAlign: 'center', padding: '0 30px', width: '20%' }}>
                    {n.date}
                  </td>
                  <td style={{ fontSize: '16px', padding: '0 30px', width: '80%' }}>
                    {n.event}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}