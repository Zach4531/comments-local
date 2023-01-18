import { useState } from 'react';
import styled from 'styled-components';

export default function UserLogin({ authenticate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [allUsers, setAllUsers] = useState([
    { username: 'Zach4531', password: 'password' },
    { username: 'juliusomo', password: 'password1' },
    { username: 'amyrobson', password: 'password2' },
    { username: 'maxblagun', password: 'password3' },
    { username: 'ramsesmiron', password: 'password4' },
  ]);

  function handleClick() {
    allUsers.forEach((user) => {
      if (user.username === username && user.password === password) {
        authenticate();
      } else {
        setUsername('');
        setPassword('');
      }
    });
  }

  function handleChange(event) {
    const currentTarget = event.target.name;
    const currentValue = event.target.value;
    if (currentTarget === 'username') {
      setUsername(currentValue);
    } else {
      setPassword(currentValue);
    }
  }

  return (
    <LoginContainer>
      <FormHeader>
        <i className="fa-sharp fa-solid fa-comments"></i>
        <h2>Welcome Back!</h2>
        <p>Please sign in below to continue</p>
      </FormHeader>
      <FormBody>
        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={handleChange}
            value={username}
          />
          <label htmlFor="username">Username</label>
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={password}
          />
          <label htmlFor="password">Password</label>
          <i className="fa-solid fa-lock"></i>
        </div>
        <a href="#">Forget Password?</a>
      </FormBody>
      <FormFooter>
        <LoginButton onClick={handleClick}>Sign In</LoginButton>
      </FormFooter>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  box-shadow: 0px 15px 25px -10px rgba(0, 0, 0, 0.3);
  background: white;
  width: 350px;
  padding: 1.5rem;
  margin: auto;
  border-radius: 0.5rem;
`;

const FormFooter = styled.div`
  text-align: right;
`;

const FormBody = styled.div`
  margin-bottom: 1.5rem;
  a {
    display: block;
    font-weight: bold;
    margin: 0rem 0rem 1rem 0rem;
    color: hsl(238, 40%, 53%);
    font-size: 0.8rem;
    text-align: right;
    transition: all 0.2s ease;
    &:hover {
      color: hsl(238, 40%, 65%);
    }
  }
  .input-group {
    display: flex;
    font-size: 0.9rem;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin: 1rem auto;
    &:first-of-type {
      margin: 1.8rem auto;
    }
    label {
      color: hsl(238, 40%, 53%);
      top: 0rem;
      left: 0rem;
      font-weight: bold;
      opacity: 0;
      font-size: 0.8rem;
      position: absolute;
      transition: all 0.2s ease;
    }
    input {
      flex: 1;
      border: 2px solid transparent;
      padding: 0.8rem 1rem;
      background: transparent;
      border-radius: 0.5rem;
      background-color: hsl(238, 40%, 95%);
      &:focus {
        outline: none;
        border-color: hsl(238, 40%, 53%);
        & + label {
          opacity: 1;
          top: -1.2rem;
        }
      }
    }
    i {
      color: hsl(238, 40%, 65%);
      position: absolute;
      right: 1rem;
    }
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  p {
    opacity: 0.8;
    font-size: 0.9rem;
    margin: 0.5rem 0rem 1rem 0rem;
  }
  i {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: hsl(238, 40%, 53%);
  }
`;

const LoginButton = styled.button`
  border: 0;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  background: hsl(238, 40%, 52%);
  color: #fff;
  width: 100%;
  transition: background 0.2s ease;
  &:hover {
    background: hsl(238, 40%, 65%);
  }
`;
