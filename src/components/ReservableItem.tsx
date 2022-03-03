import React from 'react';
import styled from 'styled-components';

import { Item } from '../pages';

type ReservableItemProps = {
  item: Item;
  onReserve: (item: Item) => Promise<any>;
  onReport: (item: Item) => Promise<any>;
};

export const ReservableItem: React.FC<ReservableItemProps> = ({
  item,
  onReserve,
  onReport,
}) => {
  const [reserveLoading, setReserveLoading] = React.useState(false);
  const [reportLoading, setReportLoading] = React.useState(false);

  const onPressReserve = async () => {
    if (window.confirm(`${item.data.display_name}을 대여하시겠습니까?`)) {
      setReserveLoading(true);
      await onReserve(item);
      setReserveLoading(false);
    }
  };

  const onPressReport = async () => {
    if (window.confirm(`${item.data.display_name}를 고장신고 하시겠습니까?`)) {
      setReportLoading(true);
      await onReport(item);
      setReserveLoading(false);
    }
  };

  const reserved = item.data.status !== 'not_reserved';

  return (
    <Container>
      <Header>
        <Name>{item.data.display_name}</Name>
        <Status reserved={reserved}>
          {reserved
            ? item.data.status === 'returned'
              ? '반납 처리중'
              : '대여중'
            : '대여가능'}
        </Status>
      </Header>
      {!reserved && (
        <Actions>
          <Button onClick={onPressReserve} disabled={reserveLoading}>
            대여하기
          </Button>
          <Button onClick={onPressReport} disabled={reportLoading}>
            고장신고
          </Button>
        </Actions>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #e9e9e9;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.h3`
  font-size: 14px;
  font-weight: 600;
`;

const Status = styled.div<{ reserved?: boolean }>`
  padding: 4px 8px;
  color: ${(props) => (props.reserved ? '#a9a9a9' : '#023978')};

  margin-left: 10px;
  font-size: 10px;
  border-radius: 5px;
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
