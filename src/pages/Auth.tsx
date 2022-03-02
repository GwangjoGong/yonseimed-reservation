import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Firebase } from '../firebase';

export const Auth: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const preload = async () => {
      const success = await Firebase.checkSignIn();

      if (!success) {
        window.alert('로그인 링크가 만료되었거나, 잘못된 접근입니다.');
        navigate('/login');
      }
    };

    preload();
  }, []);

  return <Container>로그인 중...</Container>;
};

const Container = styled.div`
  padding: 20px;
`;
