import { useQuery } from "react-query";
import { GET_ROOMS } from "../services/sharedQueries";
import { useNavigate } from "react-router";
import Title from "../components/Title";

const Games = () => {
  const { data: roomsData, isLoading: roomsDataLoading } = useQuery(GET_ROOMS, {
    staleTime: 0,
    cacheTime: 0,
  });
  const navigate = useNavigate();

  if (roomsDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "1rem 30%",
        color:'white'
      }}
    >
      <Title>Games stats</Title>
      {roomsData
        ?.sort((a, b) => {
          return a?.number - b?.number;
        })
        ?.map((room) => {
          return (
            <div
              style={{
                padding: "1rem 2rem",
                flexBasis: "25%",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: ".5rem",
                cursor: "pointer",
                color: "#000",
                fontWeight: "700",
                marginTop: "1rem",
              }}
              onClick={() => {
                navigate(`/admin/games/${room?.id}`);
              }}
            >
              {room?.name}
            </div>
          );
        })}
    </div>
  );
};

export default Games;
