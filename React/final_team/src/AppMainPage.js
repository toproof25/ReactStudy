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
        marginTop: '50px',
        height: '85%',
        backgroundColor: '#ffffff',
        color: '#000000',
      }}
    >
      <div>
        <div style={{overflow: 'hidden'}}>
          {images.map((image) => (
            <div
              key={image.id}
              style={{ marginRight: '20px', marginLeft: '20px', float: 'left' }}
            >
              <img
                src={image.uri}
                alt={image.title}
                style={{ width: 350, height: 350, marginBottom: 20 }}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '100px',
        }}
      >
        {/* 공지사항 */}
        <div>
          <h2 style={{ fontSize: '70px' }}>공지사항</h2>
          <div
            style={{
              backgroundColor: '#87CEFA',
              width: '100%',
              height: '10px',
            }}
          ></div>
          <table>
            <thead>
              {/* 공지사항 목록 */}
              <tr>
                <th style={{ fontSize: '40px', padding: '0 20px' }}>ID</th>
                <th style={{ fontSize: '40px', padding: '0 20px' }}>Title</th>
                <th style={{ fontSize: '40px', padding: '0 20px' }}>Name</th>
              </tr>
            </thead>
            <tbody>
              {notice.map((n) => (
                <tr key={n.id}>
                  {/* 공지사항 세부사항 */}
                  <td style={{ fontSize: '20px', padding: '0 30px' }}>
                    {n.id}
                  </td>
                  <td style={{ fontSize: '20px', padding: '0 30px' }}>
                    {n.title}
                  </td>
                  <td style={{ fontSize: '20px', padding: '0 30px' }}>
                    {n.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/*학사일정*/}
        <div style={{ marginLeft: '120px' }}>
          <h2 style={{ fontSize: '70px' }}>학사일정</h2>
          <div
            style={{
              backgroundColor: '#32CD32',
              width: '750px',
              height: '10px',
            }}
          ></div>
          {/* 학사일정 목록*/}
          <table>
            <thead>
              <tr>
                <th style={{ fontSize: '40px', padding: '0 20px' }}>Date</th>
                <th style={{ fontSize: '40px', padding: '0 20px' }}>Event</th>
              </tr>
            </thead>
            <tbody>
              {day.map((n) => (
                <tr key={n.ID}>
                  {/* 학사일정 내용 */}
                  <td style={{ fontSize: '20px', padding: '0 30px' }}>
                    {n.date}
                  </td>
                  <td style={{ fontSize: '20px', padding: '0 30px' }}>
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