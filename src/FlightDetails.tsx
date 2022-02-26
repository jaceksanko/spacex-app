import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import "./FlightDetails.css";

const FLIGHT_DETAILS_QUERY = gql`
  query GetLaunch($id: ID!) {
    launch(id: $id) {
      mission_name
      launch_site {
        site_name_long
      }
      launch_date_local
      rocket {
        rocket_name
        second_stage {
          payloads {
            payload_type
          }
        }
      }
      launch_success
      links {
        video_link
        flickr_images
      }
    }
  }
`;

export default function FlightDetails() {
  let { id } = useParams();
  const { loading, data } = useQuery(FLIGHT_DETAILS_QUERY, {
    variables: { id: Number(id) },
  });
  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h2> Nazwa misji</h2>
          <p>{data.launch.mission_name}</p>
          <h2> Data </h2>
          <p>{data.launch.launch_date_local}</p>
          <h2> Miejsce startu </h2>
          <p>{data.launch.launch_site.site_name_long}</p>
          <h2> Nazwa rakiety</h2>
          <p>{data.launch.rocket.rocket_name}</p>
          <h2> Czy start był udany? </h2>
          <p>{data.launch.launch_success ? "Tak" : "Nie"}</p>
          <h2> Ładunek</h2>
          <ul>
            {data.launch.rocket.second_stage.payloads.map((payload, index) => (
              <li key={`${payload}-${index}`}>{payload.payload_type}</li>
            ))}
          </ul>
          <h2> Video </h2>
          <iframe
            id="yt-video-iframe"
            src={`https://www.youtube.com/embed/${
              data.launch.links.video_link.split("v=")[1]
            }`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
            title="Embedded youtube"
          />

          <h2> Zdjęcia </h2>
          <div className="flight-details__img-wrapper">
            {data.launch.links.flickr_images.map((image, index) => (
              <img
                src={image}
                key={`${image}-${index}`}
                alt="launch"
                className="flight-details__img"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
