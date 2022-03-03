import React from 'react';
import styled from 'styled-components';

import { Firebase } from '../firebase';
import { LostReportType } from '../pages';

type LostReportProps = {
  report: LostReportType;
};

export const LostReport: React.FC<LostReportProps> = ({ report }) => {
  const [resolveLoading, setResolveLoading] = React.useState(false);

  const onPressResolve = async () => {
    if (
      window.confirm(
        `${report.data.item.data.display_name} 분실신고 건을 확인완료 처리하시겠습니까?`,
      )
    ) {
      setResolveLoading(true);
      await Firebase.updateLostReport(report.id, {
        status: 'resolved',
      });
      setResolveLoading(false);
      window.alert('처리완료 되었습니다.');
      window.location.reload();
    }
  };

  return (
    <Container>
      <Name>{report.data.item.data.display_name}</Name>
      <Info>신고자 : {report.data.lost_by}</Info>
      <Info>신고일시 : {report.data.lost_at}</Info>
      <Actions>
        <Button onClick={onPressResolve} disabled={resolveLoading}>
          확인완료
        </Button>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #e9e9e9;

  @media only screen and (min-width: 1500px) {
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    padding: 10px;
    height: fit-content;
  }
`;

const Name = styled.h3`
  font-size: 14px;
  font-weight: 600;
`;

const Info = styled.p`
  margin-top: 10px;
`;

const Actions = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #023978;
  color: white;
  font-size: 14px;
  border-radius: 5px;
  margin-right: 10px;

  border: none;
`;
