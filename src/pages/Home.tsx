import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import { ReservableItem, ReservedItem } from '../components';
import { Firebase } from '../firebase';
import { useMe } from '../hooks';

export type Item = {
  id: string;
  data: {
    display_name: string;
    status: string;
    return_multi?: boolean;
    reserved_by?: string;
    reserved_at?: string;
  };
};

export const Home: React.FC = () => {
  const { me } = useMe();
  const profile = me();

  const [reservedItems, setReservedItems] = React.useState<Item[]>([]);
  const [umbrellas, setUmbrellas] = React.useState<Item[]>([]);
  const [chargers, setChargers] = React.useState<Item[]>([]);
  const [applePencils, setApplePencils] = React.useState<Item[]>([]);
  const [galaxyPencils, setGalaxyPencils] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);

  const onReserve = async (item: Item) => {
    const recentItemData = await Firebase.getItem(item.id);

    if (profile?.email && recentItemData) {
      if (recentItemData.status !== 'not_reserved') {
        window.alert('이미 대여중인 물품입니다.');
        return;
      }

      await Firebase.updateItem(item.id, {
        status: 'reserved',
        reserved_by: profile.email,
        reserved_at: moment().format('YYYY년 MM월 DD일 HH:mm:ss'),
      });

      window.alert('대여 완료되었습니다.');
      window.location.reload();
    } else {
      window.alert('대여 실패. 관리자에게 문의해주세요.');
    }
  };

  const onReturn = async (
    item: Item,
    place: 'default' | 'jaejung' | 'euidae',
  ) => {
    const recentItemData = await Firebase.getItem(item.id);

    if (profile?.email && recentItemData) {
      if (recentItemData.status !== 'reserved') {
        window.alert('이미 반납되었거나, 고장신고가 접수된 물품입니다.');
        return;
      }

      await Firebase.updateItem(item.id, {
        status: 'returned',
        returned_at: moment().format('YYYY년 MM월 DD일 HH:mm:ss'),
        place,
      });

      window.alert('반납신청이 완료되었습니다.');
      window.location.reload();
    } else {
      window.alert('반납 실패. 관리자에게 문의해주세요.');
    }
  };

  const onReportLost = async (item: Item) => {
    if (profile?.email) {
      await Firebase.updateItem(item.id, {
        status: 'lost',
      });

      await Firebase.makeLostReport(
        item,
        moment().format('YYYY년 MM월 DD일 HH:mm:ss'),
        profile.email,
      );

      window.alert('분실신고가 접수되었습니다.');
      window.location.reload();
    } else {
      window.alert('분실신고 실패. 관리자에게 문의해주세요.');
    }
  };

  const onReportMalfunction = async (item: Item) => {
    if (profile?.email) {
      await Firebase.makeMalfunctionReport(
        item,
        moment().format('YYYY년 MM월 DD일 HH:mm:ss'),
        profile.email,
      );

      window.alert('고장신고가 접수되었습니다.');
    } else {
      window.alert('고장신고 실패. 관리자에게 문의해주세요.');
    }
  };

  React.useEffect(() => {
    const preload = async () => {
      const items = (await Firebase.getItems()) as Item[];

      setReservedItems(
        items.filter(
          (item) =>
            (item.data.status === 'reserved' ||
              item.data.status === 'lost' ||
              item.data.status === 'returned') &&
            item.data.reserved_by === profile?.email,
        ),
      );

      setUmbrellas(
        items
          .filter((item) => item.id.includes('umbrella'))
          .sort(
            (a, b) =>
              parseInt(a.id.split('_')[1]) - parseInt(b.id.split('_')[1]),
          ),
      );

      setChargers(items.filter((item) => item.id.includes('charger')));

      setApplePencils(
        items
          .filter((item) => item.id.includes('applepencil'))
          .sort(
            (a, b) =>
              parseInt(a.id.split('_')[1]) - parseInt(b.id.split('_')[1]),
          ),
      );

      setGalaxyPencils(
        items
          .filter((item) => item.id.includes('galaxypencil'))
          .sort(
            (a, b) =>
              parseInt(a.id.split('_')[1]) - parseInt(b.id.split('_')[1]),
          ),
      );

      setLoading(false);
    };

    preload();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          {reservedItems.length > 0 && (
            <>
              <GroupHeader style={{ marginTop: 0 }}>대여중인 물품</GroupHeader>
              <Group>
                {reservedItems.map((item) => (
                  <ReservedItem
                    key={`reserved_${item.id}`}
                    item={item}
                    onReturn={onReturn}
                    onReportLost={onReportLost}
                    onReportMalfunction={onReportMalfunction}
                  />
                ))}
              </Group>
            </>
          )}
          <Heading style={{ marginTop: reservedItems.length > 0 ? 40 : 0 }}>
            물품 목록
          </Heading>
          <GroupHeader style={{ marginTop: 20 }}>우산</GroupHeader>
          <Group>
            {umbrellas.map((umbrella) => (
              <ReservableItem
                key={umbrella.id}
                item={umbrella}
                onReserve={onReserve}
                onReport={onReportMalfunction}
              />
            ))}
          </Group>

          <GroupHeader>충전기</GroupHeader>
          <Group>
            {chargers.map((charger) => (
              <ReservableItem
                key={charger.id}
                item={charger}
                onReserve={onReserve}
                onReport={onReportMalfunction}
              />
            ))}
          </Group>

          <GroupHeader>애플펜슬</GroupHeader>
          <Group>
            {applePencils.map((ap) => (
              <ReservableItem
                key={ap.id}
                item={ap}
                onReserve={onReserve}
                onReport={onReportMalfunction}
              />
            ))}
          </Group>

          <GroupHeader>갤럭시펜슬</GroupHeader>
          <Group>
            {galaxyPencils.map((gp) => (
              <ReservableItem
                key={gp.id}
                item={gp}
                onReserve={onReserve}
                onReport={onReportMalfunction}
              />
            ))}
          </Group>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Heading = styled.h1`
  font-weight: bold;
`;

const Loading = styled.p`
  margin-top: 10px;
`;

const GroupHeader = styled.h2`
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 10px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
`;
