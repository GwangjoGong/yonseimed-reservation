import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../assets/yonseimed_logo.png';
import { Firebase } from '../firebase';
import { useMe } from '../hooks';
import { Admin } from '../pages';
import { Home } from '../pages/Home';

type LoggedInRoutesProps = {
  admin: boolean;
};

export const LoggedInRoutes: React.FC<LoggedInRoutesProps> = ({ admin }) => {
  const { me } = useMe();
  const profile = me();

  const logout = async () => {
    await Firebase.logout();
  };

  return (
    <Container>
      <Content>
        <Header>
          <LogoBox>
            <Logo src={logo} alt="logo" />
            <Title>대여서비스</Title>
          </LogoBox>
          <Profile>
            {admin ? '관리자' : profile?.email}님 안녕하세요!
            <Logout onClick={logout}>로그아웃</Logout>
          </Profile>
        </Header>

        <Routes>
          {admin ? (
            <Route path="/admin" element={<Admin />} />
          ) : (
            <Route path="/home" element={<Home />} />
          )}
          {admin ? (
            <Route path="*" element={<Navigate to={'/admin'} />} />
          ) : (
            <Route path="*" element={<Navigate to={'/home'} />} />
          )}
        </Routes>
      </Content>
    </Container>
  );
};

const Container = styled.div``;

const Content = styled.div`
  @media only screen and (min-width: 1500px) {
    max-width: 1500px;
    margin: 0 auto;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 1500px) {
    flex-direction: row;
    align-items: center;
  }
`;

const LogoBox = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
`;

const Logo = styled.img`
  height: 50px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-top: 12px;
  margin-left: 10px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 0 20px;

  @media only screen and (min-width: 1500px) {
    margin-left: auto;
  }
`;

const Logout = styled.button`
  margin-left: auto;

  background-color: #023978;
  color: white;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 5px 10px;

  @media only screen and (min-width: 1500px) {
    margin-left: 20px;
  }
`;
