import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useContext } from "react";
import CountdownContext from "../context/CountdownContext";
import { ADD_GAME, GET_ROOM_DETAILS } from "../services/sharedQueries";
import { useMutation, useQuery } from "react-query";
import SongContext from "../context/SongContext";

const Home = () => {
  const navigate = useNavigate();
  const { resetCountdown } = useContext(CountdownContext);
  const roomId = localStorage.getItem("roomId");

  const { playSong } = useContext(SongContext);

  const { data: roomData } = useQuery([GET_ROOM_DETAILS, { roomId }], {
    enabled: true,
  });

  const { mutateAsync: addGame, isLoading: addGameLoading } =
    useMutation(ADD_GAME);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "calc(100vh - 4rem)",
        margin: "2rem 0",
      }}
    >
      <div style={{ fontSize: "4rem", fontWeight: "700",  padding:'1rem', color:'white', borderRadius:'.5rem' }}>
        {roomData?.name}
      </div>
      <div style={{ padding:'1rem', color:'white', borderRadius:'.5rem',fontSize: "18px", fontWeight: "700", textAlign:'center', whiteSpace:'pre-line' }}>{roomData?.description}</div>
      <div>
        <Button
          onClick={async () => {
            playSong();
            document.documentElement.webkitRequestFullScreen();
            if (addGameLoading) return;
            const game = await addGame({ roomId });
            localStorage.setItem("gameId", game.id);
            resetCountdown(roomData?.time);
            navigate("/hints");
          }}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default Home;
