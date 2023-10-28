import { useNavigate, useParams } from "react-router";
import Title from "../components/Title";
import { useQuery } from "react-query";
import { GET_ROOM_LOCKS } from "../services/sharedQueries";
import Button from "../components/Button";

const AdminHints = () => {
  const { roomId } = useParams();

  const { data: roomHints, isLoading: roomHintsLoading } = useQuery(
    [GET_ROOM_LOCKS, { roomId }],
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );
  const navigate = useNavigate();

  if (roomHintsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "1rem 30%",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title>Riddles</Title>
        <Button
          onClick={() => {
            navigate(
              `/admin/rooms/edit/${roomId}/hints/add/${
                roomHints?.length + 1 || 1
              }`,
              {
                state: {
                  backLink2: `/admin/rooms/edit/${roomId}/hints`,
                  backLink1: `/admin/rooms/edit/${roomId}`,
                },
              }
            );
          }}
        >
          Add Riddle
        </Button>
      </div>
      {roomHints
        ?.sort((a, b) => {
          return a?.number - b?.number;
        })
        ?.map((hint) => {
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
                navigate(`/admin/rooms/edit/${roomId}/hints/edit/${hint?.id}`, {
                  state: {
                    backLink2: `/admin/rooms/edit/${roomId}/hints`,
                    backLink1: `/admin/rooms/edit/${roomId}`,
                  },
                });
              }}
            >
              Riddle {hint?.number}
            </div>
          );
        })}
    </div>
  );
};

export default AdminHints;
