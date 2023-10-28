import { useContext, useEffect } from "react";
import CountdownContext from "../context/CountdownContext";
import { GET_GAME_DETAILS, GET_ROOM_DETAILS } from "../services/sharedQueries";
import { useQuery } from "react-query";
import { getRemainingTime } from "../getRemainingTime";
import { useNavigate } from "react-router";

const ClockLayout = ({ children }) => {
  const { resetCountdown } = useContext(CountdownContext);
  const navigate = useNavigate()
  const gameId = localStorage.getItem("gameId");
  const roomId = localStorage.getItem("roomId");
  const { data: gameData } = useQuery([GET_GAME_DETAILS, { gameId }], {
    enabled: Boolean(gameId),
    refetchInterval:1000,
    cacheTime:0,
    staleTime:0,
    onSuccess:(data)=>{
      if(data.escaped !== null){
        navigate('/pre-score')
      }
    }
  });

  const { data: roomData } = useQuery([GET_ROOM_DETAILS, { roomId }], {
    enabled: Boolean(roomId),
  });

  useEffect(() => {
    if(gameData && roomData){
      resetCountdown(getRemainingTime({
        navigate, 
        startTime:gameData.startedAt,
        hintsUsed:gameData.hintsUsed,
        solutionsUsed:gameData.solutionsUsed,
        totalTime:roomData.time,
        freeHintsNumber:roomData.freeHintsNumber,
        freeSolutionPenalty:roomData.freeSolutionPenalty,
        hintPenalty:roomData.hintPenalty,
        solutionPenalty:roomData.solutionPenalty,
      }))
    }
  }, [gameData, navigate, resetCountdown, roomData])

  const { timeLeft } = useContext(CountdownContext);

  // Convert seconds to  hours, minutes, and seconds
  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            padding: "1rem 10rem",
            borderRadius: "0 0 .5rem .5rem",
            backgroundColor: "#fff",
            fontSize: "4rem",
            fontWeight: "700",
          }}
        >
          {`${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: ".5rem",
            borderRadius: "0  0 0 .5rem",
            backgroundColor: "#fff",
            fontWeight:600
          }}
        >
          Hints left: {`${roomData?.freeHintsNumber - gameData?.hintsUsed?.length <0 ? 0 : roomData?.freeHintsNumber - gameData?.hintsUsed?.length}/${roomData?.freeHintsNumber}`}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ClockLayout;
