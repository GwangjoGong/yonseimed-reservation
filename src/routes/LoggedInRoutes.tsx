import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../assets/yonseimed_logo.png';
import { Firebase } from '../firebase';
import { useMe } from '../hooks';
import { Home } from '../pages/Home';

export const LoggedInRoutes: React.FC = () => {
  const { me } = useMe();
  const profile = me();

  const logout = async () => {
    await Firebase.logout();
  };

  return (
    <>
      <Header>
        <Logo src={logo} alt="logo" />
        <Title>대여서비스</Title>
      </Header>
      <Profile>
        {profile?.email}님 안녕하세요!
        <Logout onClick={logout}>로그아웃</Logout>
      </Profile>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};

const Header = styled.div`
  height: 80px;
  display: flex;
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
`;

const Logout = styled.button`
  margin-left: auto;

  background-color: #023978;
  color: white;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 5px 10px;
`;
