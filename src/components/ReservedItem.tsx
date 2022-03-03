import React from 'react';
import styled from 'styled-components';

import { Item } from '../pages';

type ReservedItemProps = {
  item: Item;
  onReturn: (
    item: Item,
    place: 'default' | 'jaejung' | 'euidae',
  ) => Promise<void>;
  onReportMalfunction: (item: Item) => Promise<void>;
  onReportLost: (item: Item) => Promise<void>;
};

export const ReservedItem: React.FC<ReservedItemProps> = ({
  item,
  onReportLost,
  onReportMalfunction,
  onReturn,
}) => {
  const [returnLoading, setReturnLoading] = React.useState(false);
  const [malfunctionLoading, setMalfunctionLoading] = React.useState(false);
  const [lostLoading, setLostLoading] = React.useState(false);

  const onPressReturn = async (place: 'default' | 'jaejung' | 'euidae') => {
    if (
      window.confirm(
        `${item.data.display_name}를 ${
          place === 'jaejung'
            ? '제중학사에'
            : place === 'euidae'
            ? '의대에'
            : ''
        } 반납하시겠습니까?`,
      )
    ) {
      setReturnLoading(true);
      await onReturn(item, place);
      setReturnLoading(false);
    }
  };

  const onPressMalfunctionReport = async () => {
    if (window.confirm(`${item.data.display_name}를 고장신고 하시겠습니까?`)) {
      setMalfunctionLoading(true);
      await onReportMalfunction(item);
      setMalfunctionLoading(false);
    }
  };

  const onPressLostReport = async () => {
    if (window.confirm(`${item.data.display_name}를 분실신고 하시겠습니까?`)) {
      setLostLoading(true);
      await onReportLost(item);
      setLostLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Name>{item.data.display_name}</Name>
        {item.data.status === 'lost' && <Status red>분실신고 접수</Status>}
        {item.data.status === 'returned' && <Status>반납 처리중</Status>}
      </Header>

      {item.data.status === 'reserved' && (
        <Actions>
          {item.data.return_multi ? (
            <>
              <Button
                disabled={returnLoading}
                onClick={() => onPressReturn('jaejung')}
              >
                제중학사 반납
              </Button>
              <Button
                disabled={returnLoading}
                onClick={() => onPressReturn('euidae')}
              >
                의대 반납
              </Button>
            </>
          ) : (
            <Button
              disabled={returnLoading}
              onClick={() => onPressReturn('default')}
            >
              반납하기
            </Button>
          )}
          <Button
            disabled={malfunctionLoading}
            onClick={onPressMalfunctionReport}
          >
            고장신고
          </Button>
          <Button disabled={lostLoading} onClick={onPressLostReport}>
            분실신고
          </Button>
        </Actions>
      )}
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

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.h3`
  font-size: 14px;
  font-weight: 600;
`;

const Status = styled.div<{ red?: boolean }>`
  padding: 4px 8px;
  color: ${(props) => (props.red ? 'red' : '#023978')};

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
