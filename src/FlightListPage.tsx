import { gql, useQuery } from "@apollo/client";

import FlightList from "./FlightList";
import FlightListFilters from "./FlightListFilters";
import {useState} from "react";

const FLIGHT_LIST_QUERY = gql`
  query GetPastLaunches($missionName: String) {
    launchesPast(find: {mission_name: $missionName}, limit: 10, sort: "launch_date_local", order: "asc") {
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
  const [missionName, setMissionName] = useState('');
  const { loading, data } = useQuery(FLIGHT_LIST_QUERY, {
    variables: { missionName },
  });

  return (
    <>
      <h2>Launch list</h2>
      <FlightListFilters updateMissionName={(value: string) => setMissionName(value)}/>
      {!loading && <FlightList launches={data.launchesPast}/>}
    </>
  );
}
