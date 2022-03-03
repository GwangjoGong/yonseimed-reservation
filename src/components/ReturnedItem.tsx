import React from 'react';
import styled from 'styled-components';

import { Firebase } from '../firebase';
import { Item } from '../pages';

type ReturnedItemProps = {
  item: Item;
};

export const ReturnedItem: React.FC<ReturnedItemProps> = ({ item }) => {
  const [returnLoading, setReturnLoading] = React.useState(false);

  const placeString = () => {
    switch (item.data.place) {
      case 'default':
        return '일반반납';
      case 'jaejung':
        return '제중학사';
      case 'euidae':
        return '의대';
    }
  };

  const onPressReturn = async () => {
    if (window.confirm(`${item.data.display_name}을 반납 처리하시겠습니까?`)) {
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
      <Info>반납일시 : {item.data.returned_at}</Info>
      <Info>반납장소 : {placeString()}</Info>
      <Actions>
        <Button onClick={onPressReturn} disabled={returnLoading}>
          반납완료
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
