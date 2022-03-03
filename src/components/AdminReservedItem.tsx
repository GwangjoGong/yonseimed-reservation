import React from 'react';
import styled from 'styled-components';

import { Firebase } from '../firebase';
import { Item } from '../pages';

type AdminReservedItemProps = {
  item: Item;
};

export const AdminReservedItem: React.FC<AdminReservedItemProps> = ({
  item,
}) => {
  const [returnLoading, setReturnLoading] = React.useState(false);

  const onPressReturn = async () => {
    if (
      window.confirm(`${item.data.display_name}을 강제반납 처리하시겠습니까?`)
    ) {
      setReturnLoading(true);
      await Firebase.updateItem(item.id, { status: 'not_reserved' });
      setReturnLoading(false);
      window.alert('처리완료 되었습니다.');
      window.location.reload();
    }
  };

  return (
    <Container>
      <Name>{item.data.display_name}</Name>
      <Info>대여자 : {item.data.reserved_by}</Info>
      <Info>대여일시 : {item.data.reserved_at}</Info>
      <Actions>
        <Button onClick={onPressReturn} disabled={returnLoading}>
          강제반납
        </Button>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #e9e9e9;
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
