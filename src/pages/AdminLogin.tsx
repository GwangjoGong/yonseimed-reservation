import React from 'react';
import styled from 'styled-components';

import { Firebase } from '../firebase';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await Firebase.adminSignIn(email, password);
    } catch {
      window.alert('아이디와 패스워드를 확인해주세요');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <Heading>관리자 로그인</Heading>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="아이디"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="비밀번호"
        />
        <Submit onClick={onSubmit} disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
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

const Input = styled.input`
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
