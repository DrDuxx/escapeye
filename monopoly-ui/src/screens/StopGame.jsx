import { useMutation, useQuery } from "react-query";
import Button from "../components/Button";
import { GET_GAME, STOP_GAME, UPDATE_WINNER } from "../services/sharedQueries";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ReactComponent as BackIcon } from "../assets/icons/back-icon.svg";
import { useContext } from "react";
import SongContext from "../context/SongContext";

const StopGame = () => {
  const navigate = useNavigate();
  const [isWinnerSet, setIsWinnerSet] = useState(false);
  const [winner, setWinner] = useState(0);
  const { stopSong } = useContext(SongContext);

  const { data: runningGame, refetch: refetchGameData } = useQuery(GET_GAME, {
    cacheTime: 0,
    staleTime: 0,
    onSuccess: async (data) => {
      if (data?.game?.winner !== null) {
        setIsWinnerSet(true);
      } else {
        setIsWinnerSet(false);
      }
    },
  });
  const { mutateAsync: stopGame, isLoading: stopGameLoading } =
    useMutation(STOP_GAME);

  const { mutateAsync: updateWinner, isLoading: updateWinnerLoading } =
    useMutation(UPDATE_WINNER, {
      onSuccess: () => {
        refetchGameData();
      },
    });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        rowGap: "2rem",
        padding: "2rem",
        height: "100%",
        backgroundColor: "#D32027",
        minHeight: "inherit",
        position: "relative",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          textAlign: "center",
          fontWeight: "700",
          color: "white",
        }}
      >
        {isWinnerSet ? "Game has ended" : "Select Winner"}
      </div>
      {!isWinnerSet && 
      <BackIcon
        style={{
          position: "absolute",
          width: 25,
          height: 25,
        }}
        onClick={() => {
          navigate("/game");
        }}
      />
      }
      {isWinnerSet ? (
        <>
          <Button
            extraStyle={{
              marginBottom: "1rem",
              width: "100%",
              color: "black",
              backgroundColor: "white",
            }}
            onClick={async () => {
              if (stopGameLoading) return;
              try {
                stopSong()
                await stopGame();
                navigate("/pre-game");
              } catch (error) {
                console.error(error);
                alert("error:", error);
              }
            }}
          >
            End and dismiss
          </Button>
        </>
      ) : (
        <>
        <div
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            this action is irreversible, are you sure you want continue?
          </div>
          <select
            style={{
              fontSize: "1rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              width: "100%",
              outline: "none",
              backgroundColor: "transparent",
              color: "white",
              borderColor: "white",
            }}
            onChange={(e) => {
              setWinner(+e.target.value);
            }}
            value={winner}
          >
            {runningGame?.game?.players?.map((zone) => {
              return (
                <option
                  value={zone.index}
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  {zone.name}
                </option>
              );
            })}
          </select>
          <Button
            extraStyle={{
              marginBottom: "1rem",
              width: "100%",
              color: "black",
              backgroundColor: "white",
            }}
            onClick={async () => {
              if (updateWinnerLoading) return;
              try {
                await updateWinner({ winner });
              } catch (error) {
                console.error(error);
                alert("error:", error);
              }
            }}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default StopGame;
