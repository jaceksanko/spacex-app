import { gql, useQuery } from "@apollo/client";

import FlightList from "./FlightList";
import FlightListFilters from "./FlightListFilters";
import { useCallback, useState } from "react";

const FLIGHT_LIST_QUERY = gql`
  query GetPastLaunches($missionName: String, $offset: Int) {
    launchesPast(
      find: { mission_name: $missionName }
      limit: 10
      sort: "launch_date_local"
      offset: $offset
    ) {
      id
      launch_date_local
      launch_site {
        site_name_long
      }
      mission_name
      rocket {
        rocket_name
      }
      ships {
        name
        home_port
        image
      }
    }
  }
`;

export default function FlightListPage() {
  const [missionName, setMissionName] = useState("");
  const [prevData, setPrevData] = useState({ launchesPast: [] });
  const { loading, data, fetchMore, client } = useQuery(FLIGHT_LIST_QUERY, {
    variables: { missionName, offset: 0 },
    fetchPolicy: "network-only",
  });

  const handleClickButton = useCallback(async () => {
    await fetchMore({
      variables: { missionName, offset: data.launchesPast.length },
    });
    setPrevData(data);
  }, [fetchMore, data]);

  return (
    <>
      <h2>Launch list</h2>
      <FlightListFilters
        updateMissionName={async (value: string) => {
          await client.clearStore();
          setPrevData({ launchesPast: [] });
          setMissionName(value);
        }}
      />
      {!loading && <FlightList launches={data.launchesPast} />}
      {(prevData.launchesPast.length !== data?.launchesPast.length ||
        data.length === 10) && (
        <button onClick={handleClickButton}>Więcej</button>
      )}
    </>
  );
}
