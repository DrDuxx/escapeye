import { useContext, useEffect } from "react";
import CountdownContext from "../context/CountdownContext";
import {
  DISMISS_ALERT,
  GET_GAME_DETAILS,
  GET_ROOM_DETAILS,
} from "../services/sharedQueries";
import { useQuery, useMutation } from "react-query";
import { getRemainingTime } from "../getRemainingTime";
import { useNavigate } from "react-router";
import { useState } from "react";
import Button from "./Button";
import SongContext from "../context/SongContext";

const ClockLayout = ({ children }) => {
  const { resetCountdown } = useContext(CountdownContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const gameId = localStorage.getItem("gameId");
  const roomId = localStorage.getItem("roomId");
  const roomNumber = localStorage.getItem("roomNumber");
  const { decreaseSongVolume, increaseSongVolume, playAlert, stopAlert } =
    useContext(SongContext);

  const { mutateAsync: dismissAlert, isLoading: dismissAlertLoading } =
    useMutation(DISMISS_ALERT);

  const { data: gameData } = useQuery([GET_GAME_DETAILS, { gameId }], {
    enabled: Boolean(gameId),
    refetchInterval: 1000,
    cacheTime: 0,
    staleTime: 0,
    onSuccess: (data) => {
      if (data.escaped !== null) {
        navigate("/pre-score");
      }
      if (Boolean(data?.alert)) {
        if (!Boolean(message)) {
          playAlert();
          decreaseSongVolume();
          setMessage(data?.alert);
        }
      } else {
        stopAlert();
        increaseSongVolume();
        setMessage("");
      }
    },
  });

  const { data: roomData } = useQuery([GET_ROOM_DETAILS, { roomId }], {
    enabled: Boolean(roomId),
  });

  useEffect(() => {
    if (gameData && roomData) {
      resetCountdown(
        getRemainingTime({
          navigate,
          startTime: gameData.startedAt,
          hintsUsed: gameData.hintsUsed,
          solutionsUsed: gameData.solutionsUsed,
          totalTime: roomData.time,
          freeHintsNumber: roomData.freeHintsNumber,
          freeSolutionPenalty: roomData.freeSolutionPenalty,
          hintPenalty: roomData.hintPenalty,
          solutionPenalty: roomData.solutionPenalty,
          currentTime: gameData.currentTime
        })
      );
    }
  }, [gameData, navigate, resetCountdown, roomData]);

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
            fontWeight: 600,
          }}
        >
          Hints left:{" "}
          {`${
            roomData?.freeHintsNumber - gameData?.hintsUsed?.length < 0
              ? 0
              : roomData?.freeHintsNumber - gameData?.hintsUsed?.length
          }/${roomData?.freeHintsNumber}`}
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
        {message && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: ".5rem",
                padding: "2rem",
                maxWidth: "500px",
                minWidth: "300px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: "3rem",
                }}
              >
                Alert:
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: "3rem",
                }}
              >
                {message}
              </div>
              <Button
                extraStyle={{
                  backgroundColor: "black",
                  color: "white",
                  marginBottom: "1rem",
                }}
                onClick={async () => {
                  if (dismissAlertLoading) return;
                  await dismissAlert({ roomNumber });
                }}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClockLayout;
