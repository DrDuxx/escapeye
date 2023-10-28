import { Navigate, useNavigate } from "react-router";
import ClockLayout from "../components/ClockLayout";
import HintRow from "../components/HintRow";
import {  GET_ROOM_LOCKS } from "../services/sharedQueries";
import { useQuery } from "react-query";


const Hints = () => {
  const navigate = useNavigate();

  const roomId = localStorage.getItem("roomId");
  const gameId = localStorage.getItem("gameId");
  
  const { data: roomLocksData } = useQuery([GET_ROOM_LOCKS, { roomId }], {
    enabled: Boolean(roomId),
  });

  if(!gameId){
    return <Navigate to="/" />
  }

  return (
    <ClockLayout>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "15rem 4rem 0",
          columnGap: "2rem",
          rowGap: "2rem",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {roomLocksData
          ?.sort((a, b) => a.number - b.number)
          ?.map((hint, i) => {
            return (
              <HintRow
                key={`hint-${i}`}
                index={hint.number}
                onClick={() => {
                  navigate(`/hints/${hint.id}/${hint.number}`);
                }}
              />
            );
          })}
      </div>
    </ClockLayout>
  );
};

export default Hints;
