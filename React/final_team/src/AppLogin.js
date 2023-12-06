import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AppLogin({ setLogin, handleSetUserId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/users')
      .then((response) => setUsers(response.data))
      .catch(console.log);
  }, []);

  console.log(users);

  return (
    <div id="login" style={{ height: '85%' }}>
      <Login
        setLogin={setLogin}
        handleSetUserId={handleSetUserId}
        users={users}
        setUsers={setUsers}
      />
      {users.map((user) => (
        <div key={user.id}>{/* 사용자 정보 */}</div>
      ))}
    </div>
  );
}

const Login = ({ setLogin, handleSetUserId, users, setUsers }) => {
  // 로그인하는거 귀찮아서 초기값 입력해둠
  const [loginID, setLoginID] = useState('qwer');
  const [password, setPassword] = useState('qwer1234');

  const handleLogin = () => {
    const user = users.find(
      (u) => u.loginID === loginID && u.password === password
    );
    if (user) {
      setLogin(true);
      handleSetUserId(user.userID);
    } else {
      console.log('ID또는 비밀번호를 잘못 입력했습니다.');
    }
  };

  const handleRegister = () => {
    const id = users[users.length - 1].id + 1;
    const userID = users[users.length - 1].userID + 1;

    const createUser = {
      id,
      userID,
      loginID: 'new',
      password: '1234',
      name: '회원가입',
      email: '강남@kangnam.ac.kr',
      year: '2002',
      month: '1',
      day: '12',
    };

    // 여기서 위 변수 createUser를  { ...createUser } 이렇게 구조분해로 보내주면 json에 정상적으로 추가가 됩니다.
    axios
      .post('http://localhost:4000/users', { ...createUser })
      .then((response) => {
        setUsers([...users, response.data]);
        console.log('회원가입이 완료되었습니다.', response.data);
      })
      .catch((error) => {
        console.error('회원가입에 실패했습니다.', error);
      });
  };

  return (
    <div>
      <h1 style={{ fontSize: '40px' }}> 로그인하세요</h1>
      <div>
        <label>아이디 : </label>
        <input
          type="loginID"
          value={loginID}
          onChange={(e) => setLoginID(e.target.value)}
        />
      </div>
      <div>
        <label>비밀번호 :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          style={{ width: '130px', height: '45px' }}
          onClick={handleLogin}
        >
          로그인
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <h1 style={{ fontSize: '30px' }}> 사용자정보를 입력하세요</h1>
      <div>
        <label>사용할ID : </label>
        <input
          type="loginID"
          value={loginID}
        />
      </div>
      <div>
        <label>비밀번호 : </label>
        <input
          type="password"
          value={password}
        />
      </div>
      <div>
        <label>이름 : </label>
        
      </div>
      <div>
        <label>이메일 : </label>
        
      </div>
      <div>
        <label>생년 : </label>
        
      </div>
      <div>
        <label>월 : </label>
        
      </div>
      <div>
        <label>일 : </label>
        
      </div>
      <button
        style={{ width: '130px', height: '45px' }}
        onClick={handleRegister}
      >
        회원가입
      </button>
    </div>
  );
}