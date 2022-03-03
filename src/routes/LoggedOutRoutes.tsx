import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../assets/yonseimed_logo.png';
import { AdminLogin, Auth, EmailSent, Login } from '../pages';

export const LoggedOutRoutes: React.FC = () => {
  return (
    <>
      <Header>
        <Logo src={logo} alt="logo" />
        <Title>대여서비스</Title>
      </Header>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sent" element={<EmailSent />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/login" />} />
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
