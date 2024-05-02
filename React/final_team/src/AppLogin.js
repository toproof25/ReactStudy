import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function AppLogin({ setLogin, handleSetUserId }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:4000/users')
      .then((response) => setUsers(response.data))
      .catch(console.log);
  }, []);


  return (
    <div id="login" style={{ height: '85%' }}>

      {page 
      ? 
        <Login
          setLogin={setLogin}
          handleSetUserId={handleSetUserId}
          users={users}
          setUsers={setUsers}
          setPage = {setPage}
        />
      : 
        <CreateUserView users={users} setUsers={setUsers} setPage={setPage} />
      }
    </div>
  );
}

function CreateUserView({users, setUsers, setPage}){

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [newid, setID] = useState('');
  const [newpassword, setnewPassword] = useState('');

  const handleRegister = () => {
    // 기존 id에서 +1을 한 값을 사용
    const id = users[users.length - 1].id + 1;
    // 회원고유번호
    const userID = users[users.length - 1].userID + 1;

    const createUser = {
      id,
      userID,
      loginID: newid,
      password: newpassword,
      name,
      address,
      phone,
      email,
      gender,
      year,
      month,
      day,
    };

    // 여기서 위 변수 createUser를  { ...createUser } 이렇게 구조분해로 보내주면 json에 정상적으로 추가가 됩니다.
    axios
      .post('http://localhost:4000/users', { ...createUser })
      .then((response) => {
        setUsers([...users, response.data]);
        alert('회원가입이 완료되었습니다.', response.data);
      })
      .catch((error) => {
        alert('회원가입에 실패했습니다.', error);
      });

      setPage(true)
  };

  return (
    <div style={{margin: '0 auto', width: '500px', paddingTop:'300px', paddingRight: '200px',textAlign: 'right'}}>
      <h1 style={{ fontSize: '30px' }}> 사용자정보를 입력하세요</h1>
      <div>
        <label>사용할ID : </label>
        <input
          type="newid"
          value={newid}
          onChange={(e) => setID(e.target.value)}
        />
      </div>
      <div>
        <label>비밀번호 : </label>
        <input
          type="newpassword"
          value={newpassword}
          onChange={(e) => setnewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>이름 : </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>주소 : </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label>핸드폰 번호 : </label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label>이메일 : </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>성별 : </label>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>
      <div>
        <label>생년 : </label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div>
        <label>월 : </label>
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <div>
        <label>일 : </label>
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <button
        style={{ width: '130px', height: '45px' }}
        onClick={()=>setPage(true)}
      >
        취소
      </button>
      <button
        style={{ width: '130px', height: '45px' }}
        onClick={handleRegister}
      >
        계정 생성
      </button>
    </div>
  );

}

function Login({ setLogin, handleSetUserId, users, setPage }) {
  const [loginID, setLoginID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = users.find(
      (u) => u.loginID === loginID && u.password === password
    );
    if (user) {
      setLogin(true);
      handleSetUserId(user.userID);
    } else {
      alert('ID또는 비밀번호를 잘못 입력했습니다.');
    }
  };

  return (
    <div>
      <div style={{margin: '0 auto', width: '500px', paddingTop:'300px', paddingRight: '200px',textAlign: 'right'}}>
        <h1 style={{ fontSize: '40px', paddingRight: '100px'}}> 로그인</h1>
        <div>
          <label style={{fontSize: '30px'}}>아이디 : </label>
          <input
            type="loginID"
            value={loginID}
            onChange={(e) => setLoginID(e.target.value)}
            style={{width: '200px', height:'25px', fontSize:'20px', paddingLeft: '10px'}}
          />
        </div>
        <div>
          <label style={{fontSize: '30px'}}>비밀번호 : </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width: '200px', height:'25px', fontSize:'20px', paddingLeft: '10px'}}
          />
          <button
            style={{ width: '130px', height: '45px', fontSize: '30px', margin: '10px'}}
            onClick={handleLogin}
          >
            로그인
          </button>
          <button
            style={{ width: '130px', height: '45px', fontSize: '30px', margin: '10px'}}
            onClick={()=>setPage(false)}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

