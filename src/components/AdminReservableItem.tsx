import React from 'react';
import styled from 'styled-components';

import { Firebase } from '../firebase';
import { Item } from '../pages';

type AdminReservableItemProps = {
  item: Item;
};

export const AdminReservableItem: React.FC<AdminReservableItemProps> = ({
  item,
}) => {
  const [changeLoading, setChangeLoading] = React.useState(false);

  const onPressToggle = async () => {
    if (
      window.confirm(
        `${item.data.display_name}을 ${
          item.data.status === 'unavailable' ? '활성화' : '비활성화'
        } 하시겠습니까?`,
      )
    ) {
      setChangeLoading(true);
      await Firebase.updateItem(item.id, {
        status:
          item.data.status === 'unavailable' ? 'not_reserved' : 'unavailable',
      });
      setChangeLoading(true);
      window.alert('처리완료 되었습니다.');
      window.location.reload();
    }
  };

  return (
    <Container>
      <Name unavailable={item.data.status === 'unavailable'}>
        {item.data.display_name}
      </Name>

      <Actions>
        <Button
          unavailable={item.data.status === 'unavailable'}
          onClick={onPressToggle}
          disabled={changeLoading}
        >
          {item.data.status === 'unavailable' ? '활성화' : '비활성화'}
        </Button>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #e9e9e9;

  display: flex;
  align-items: center;

  @media only screen and (min-width: 1500px) {
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    padding: 10px;
    height: fit-content;
  }
`;

const Name = styled.h3<{ unavailable: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.unavailable ? '#a9a9a9' : 'black')};
`;

const Actions = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const Button = styled.button<{ unavailable: boolean }>`
  padding: 9px;
  background-color: ${(props) => (props.unavailable ? 'white' : '#023978')};
  border: 1px solid #023978;
  color: ${(props) => (props.unavailable ? '#023978' : 'white')};
  font-size: 14px;
  border-radius: 5px;
  margin-right: 10px;
`;
