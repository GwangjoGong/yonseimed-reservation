import React from 'react';
import styled from 'styled-components';

import example from '../assets/email_example.png';

export const EmailSent: React.FC = () => {
  return (
    <Container>
      <Heading>로그인 링크가 이메일로 전송되었습니다.</Heading>
      <Body style={{ marginTop: 20 }}>
        입력하신 이메일의 수신함을 확인해주세요.
      </Body>
      <Body>이메일은 하단과 같은 형식으로 구성되어 있습니다.</Body>
      <Body>본문 내 3번째 줄의 링크를 클릭해주세요.</Body>
      <Example src={example} alt="email_example" />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Heading = styled.h1`
  font-weight: bold;
`;

const Body = styled.p`
  margin-top: 10px;
`;

const Example = styled.img`
  width: 100%;
  margin-top: 20px;
`;
