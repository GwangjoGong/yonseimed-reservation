import React from 'react';
import styled from 'styled-components';

import {
  AdminReservableItem,
  AdminReservedItem,
  LostReport,
  MalfunctionReport,
  ReturnedItem,
} from '../components';
import { Firebase } from '../firebase';
import { Item } from './Home';

export type LostReportType = {
  id: string;
  data: {
    item: Item;
    status: string;
    lost_at: string;
    lost_by: string;
  };
};

export type MalfunctionReportType = {
  id: string;
  data: {
    item: Item;
    status: string;
    reported_at: string;
    reported_by: string;
  };
};

export const Admin: React.FC = () => {
  const [returnedItems, setReturnedItems] = React.useState<Item[]>([]);
  const [reservedItems, setReservedItems] = React.useState<Item[]>([]);
  const [umbrellas, setUmbrellas] = React.useState<Item[]>([]);
  const [chargers, setChargers] = React.useState<Item[]>([]);
  const [applePencils, setApplePencils] = React.useState<Item[]>([]);
  const [galaxyPencils, setGalaxyPencils] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [malfunctionReports, setMalfunctionReports] = React.useState<
    MalfunctionReportType[]
  >([]);
  const [lostReports, setLostReports] = React.useState<LostReportType[]>([]);

  React.useEffect(() => {
    const preload = async () => {
      const items = (await Firebase.getItems()) as Item[];

      const lostReports = (await Firebase.getLostReports()) as LostReportType[];
      const malfunctionReports =
        (await Firebase.getMalfunctionReports()) as MalfunctionReportType[];

      setLostReports(
        lostReports.filter((rep) => rep.data.status === 'unresolved'),
      );
      setMalfunctionReports(
        malfunctionReports.filter((rep) => rep.data.status === 'unresolved'),
      );

      setReturnedItems(items.filter((item) => item.data.status === 'returned'));
      setReservedItems(items.filter((item) => item.data.status === 'reserved'));

      setUmbrellas(
        items
          .filter(
            (item) =>
              item.id.includes('umbrella') &&
              (item.data.status === 'not_reserved' ||
                item.data.status === 'unavailable'),
          )
          .sort(
            (a, b) =>
              parseInt(a.id.split('_')[1]) - parseInt(b.id.split('_')[1]),
          ),
      );

      setChargers(
        items.filter(
          (item) =>
            item.id.includes('charger') &&
            (item.data.status === 'not_reserved' ||
              item.data.status === 'unavailable'),
        ),
      );

      setApplePencils(
        items
          .filter(
            (item) =>
              item.id.includes('applepencil') &&
              (item.data.status === 'not_reserved' ||
                item.data.status === 'unavailable'),
          )
          .sort(
            (a, b) =>
              parseInt(a.id.split('_')[1]) - parseInt(b.id.split('_')[1]),
          ),
      );

      setGalaxyPencils(
        items
          .filter(
            (item) =>
              item.id.includes('galaxypencil') &&
              (item.data.status === 'not_reserved' ||
                item.data.status === 'unavailable'),
          )
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
          {returnedItems.length > 0 && (
            <>
              <GroupHeader style={{ marginTop: 0 }}>반납신청</GroupHeader>
              <Group>
                {returnedItems.map((returned) => (
                  <ReturnedItem
                    key={`returned-${returned.id}`}
                    item={returned}
                  />
                ))}
              </Group>
              <div style={{ height: 40 }} />
            </>
          )}

          {lostReports.length > 0 && (
            <>
              <GroupHeader style={{ marginTop: 0 }}>분실신고</GroupHeader>
              <Group>
                {lostReports.map((item) => (
                  <LostReport key={`lost-${item.id}`} report={item} />
                ))}
              </Group>
              <div style={{ height: 40 }} />
            </>
          )}

          {malfunctionReports.length > 0 && (
            <>
              <GroupHeader style={{ marginTop: 0 }}>고장신고</GroupHeader>
              <Group>
                {malfunctionReports.map((item) => (
                  <MalfunctionReport
                    key={`malfunction-${item.id}`}
                    report={item}
                  />
                ))}
              </Group>
              <div style={{ height: 40 }} />
            </>
          )}

          {reservedItems.length > 0 && (
            <>
              <GroupHeader style={{ marginTop: 0 }}>대여중인 물품</GroupHeader>
              <Group>
                {reservedItems.map((item) => (
                  <AdminReservedItem key={`reserved-${item.id}`} item={item} />
                ))}
              </Group>
              <div style={{ height: 40 }} />
            </>
          )}

          <Heading>물품관리</Heading>
          <GroupHeader style={{ marginTop: 20 }}>우산</GroupHeader>
          <Group>
            {umbrellas.map((umbrella) => (
              <AdminReservableItem key={umbrella.id} item={umbrella} />
            ))}
          </Group>

          <GroupHeader>충전기</GroupHeader>
          <Group>
            {chargers.map((charger) => (
              <AdminReservableItem key={charger.id} item={charger} />
            ))}
          </Group>

          <GroupHeader>애플펜슬</GroupHeader>
          <Group>
            {applePencils.map((ap) => (
              <AdminReservableItem key={ap.id} item={ap} />
            ))}
          </Group>

          <GroupHeader>갤럭시펜슬</GroupHeader>
          <Group>
            {galaxyPencils.map((gp) => (
              <AdminReservableItem key={gp.id} item={gp} />
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
  @media only screen and (min-width: 1500px) {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(4, 1fr);
  }
`;
