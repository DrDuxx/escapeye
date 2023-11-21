import { useMutation, useQuery } from "react-query";
import Button from "../components/Button";
import {
  DISMISS_DARE,
  GET_DARE,
  GET_GAME,
  USE_DARE,
} from "../services/sharedQueries";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ReactComponent as BackIcon } from "../assets/icons/back-icon.svg";

const Dare = () => {
  const navigate = useNavigate();
  const [isLastDareActive, setIsLastDareActive] = useState(false);
  const {
    refetch: getRunningGame,
    isLoading: runningGameLoading,
  } = useQuery(GET_GAME, {
    cacheTime: 0,
    staleTime: 0,
    onSuccess: (data) => {
      let dares = data?.game?.dares;
      if (dares.length > 0) {
        let lastDare = dares[dares.length - 1];
        if (lastDare.isDismissed) {
          setIsLastDareActive(false);
        } else {
          setIsLastDareActive(lastDare?.id);
        }
      } else {
        setIsLastDareActive(false);
      }
    },
  });


  const { refetch: executeDare, isLoading: executeDareLoading } = useQuery(
    USE_DARE,
    { enabled: false, staleTime: 0, cacheTime: 0 }
  );

  const { mutateAsync: dismissDare, isLoading: dismissDareLoading } =
    useMutation(DISMISS_DARE);

  const {
    data: dareData,
    refetch: getDareData,
    isLoading: dareDataLoading,
  } = useQuery([GET_DARE, { dareId: isLastDareActive }], {
    enabled: false,
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    if (isLastDareActive) {
      getDareData();
    }
  }, [getDareData, isLastDareActive]);

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
        Dare
      </div>

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

      {!isLastDareActive ? (
        <Button
          extraStyle={{
            marginBottom: "1rem",
            width: "100%",
            color: "black",
            backgroundColor: "white",
          }}
          onClick={async () => {
            if (
              runningGameLoading ||
              dismissDareLoading ||
              executeDareLoading ||
              dareDataLoading
            )
              return;
            try {
              await executeDare();
              await getRunningGame();
            } catch (error) {
              alert("error:", error);
            }
          }}
        >
          Get Dare
        </Button>
      ) : (
        <>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              textAlign: "center",
              color: "white",
            }}
          >
            <div>Action: {dareData?.dare?.action}</div>
          </div>
          <Button
            extraStyle={{
              marginBottom: "1rem",
              width: "100%",
              color: "black",
              backgroundColor: "white",
            }}
            onClick={async () => {
              if (
                runningGameLoading ||
                dismissDareLoading ||
                executeDareLoading ||
                dareDataLoading
              )
                return;
              try {
                await dismissDare({ dareId: isLastDareActive });
                navigate("/game");
              } catch (error) {
                alert("error:", error);
              }
            }}
          >
            Dismiss
          </Button>
        </>
      )}
    </div>
  );
};

export default Dare;
