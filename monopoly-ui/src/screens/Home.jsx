import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useContext, useEffect } from "react";
import CountdownContext from "../context/CountdownContext";
import { ADD_GAME, GET_ROOM_DETAILS } from "../services/sharedQueries";
import {useMutation, useQuery} from 'react-query'

const Home = () => {
  const navigate = useNavigate();
  const { resetCountdown } = useContext(CountdownContext);
  const roomId = localStorage.getItem('roomId');

  const {
    data: roomData,
  } = useQuery([GET_ROOM_DETAILS, { roomId }], { enabled: true });

  const {mutateAsync:addGame, isLoading:addGameLoading} = useMutation(ADD_GAME)
  
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
      <div style={{ fontSize: "4rem", fontWeight: "700" }}>
      {roomData?.name}
      </div>
      <div>{roomData?.description}</div>
      <div>
        <Button
          onClick={async () => {  
              if(addGameLoading) return
            const game = await addGame({roomId})
            localStorage.setItem('gameId', game.id)
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
