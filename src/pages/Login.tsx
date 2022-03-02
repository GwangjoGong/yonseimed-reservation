import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Firebase } from '../firebase';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const onSubmit = async () => {
    if (!validateEmail()) {
      window.alert('올바른 형식의 이메일을 입력해주세요.');
    } else {
      if (loading) return;

      setLoading(true);
      await Firebase.emailSignIn(email);
      setLoading(false);
      navigate('/sent');
    }
  };

  return (
    <Container>
      <Content>
        <Heading>이메일로 로그인</Heading>
        <EmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="honggildong@email.com"
        />
        <Submit onClick={onSubmit} disabled={loading}>
          {loading ? '이메일 전송중...' : '로그인'}
        </Submit>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  padding: 20px;
`;

const Heading = styled.h1`
  font-weight: bold;
`;

const EmailInput = styled.input`
  outline: none;
  width: 100%;

  box-sizing: border-box;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  margin-top: 12px;
  padding: 8px;

  transition: border ease-in-out 200ms;

  :focus {
    border: 1px solid #023978;
  }
`;

const Submit = styled.button`
  outline: none;
  width: 100%;

  box-sizing: border-box;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  margin-top: 12px;
  padding: 8px;

  color: white;
  background-color: #023978;
`;
