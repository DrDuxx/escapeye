import { useMutation, useQuery } from "react-query";
import {
  ADMIN_CHANGE_STATUS,
  ADMIN_GET_MONITOR,
  DISMISS_ALERT,
  POST_ALERT,
} from "../services/sharedQueries";
import { getRemainingTime } from "../getRemainingTime";
import { useEffect, useState } from "react";
import Input from "./Input";

const GameMonitorComponent = ({ roomNumber }) => {
  const [message, setMessage] = useState("");
  const { data: monitorData } = useQuery([ADMIN_GET_MONITOR, { roomNumber }], {
    refetchInterval: 1000,
    staleTime: 0,
    cacheTime: 0,
  });

  const { mutateAsync: postAlert, isLoading: postAlertLoading } =
    useMutation(POST_ALERT);

  const { mutateAsync: dismissAlert, isLoading: dismissAlertLoading } =
    useMutation(DISMISS_ALERT);

  const { mutateAsync: changeStatus, isLoading: changeStatusLoading } =
    useMutation(ADMIN_CHANGE_STATUS);

  const [timeLeft, setTimeLeft] = useState(-1);

  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (monitorData?.match) {
      setTimeLeft(
        getRemainingTime({
          startTime: monitorData?.match?.startedAt,
          hintsUsed: monitorData?.match?.hintsUsed,
          solutionsUsed: monitorData?.match?.solutionsUsed,
          totalTime: monitorData?.room?.time,
          freeHintsNumber: monitorData?.room?.freeHintsNumber,
          freeSolutionPenalty: monitorData?.room?.freeSolutionPenalty,
          hintPenalty: monitorData?.room?.hintPenalty,
          solutionPenalty: monitorData?.room?.solutionPenalty,
        })
      );
    }
  }, [
    monitorData?.match,
    monitorData?.room?.freeHintsNumber,
    monitorData?.room?.freeSolutionPenalty,
    monitorData?.room?.hintPenalty,
    monitorData?.room?.solutionPenalty,
    monitorData?.room?.time,
  ]);

  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: ".5rem",
        color: "#fff",
      }}
    >
      <div style={{ fontWeight: "700", fontSize: "32px" }}>
        Room {roomNumber}
      </div>
      {monitorData?.match ? (
        <>
          <div>
            Time left:{" "}
            {`${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
          </div>
          <div>
            Free hints used:{" "}
            {monitorData?.match?.hintsUsed?.length >
            monitorData?.room?.freeHintsNumber
              ? monitorData?.room?.freeHintsNumber
              : monitorData?.match?.hintsUsed?.length}
            /{monitorData?.room?.freeHintsNumber}
          </div>
          <div>
            Extra hints used:{" "}
            {monitorData?.match?.hintsUsed?.length >
            monitorData?.room?.freeHintsNumber
              ? monitorData?.match?.hintsUsed?.length -
                monitorData?.room?.freeHintsNumber
              : 0}
          </div>
          <div>
            Hints used:{" "}
            {monitorData?.hints?.length > 0
              ? monitorData?.hints?.map((hint) => hint.number)?.join(",")
              : "None"}
          </div>
          <div>
            Solutions used:{" "}
            {monitorData?.solutions?.length > 0
              ? monitorData?.solutions
                  ?.map((solution) => solution.number)
                  ?.join(",")
              : "None"}
          </div>
          {
            monitorData?.alert?.message?
            <>
            <div>
              Message:{" "}
              {monitorData?.alert?.message}
              </div>
              <div
            style={{
              padding: "1rem 2rem",
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
            onClick={async () => {
              if (dismissAlertLoading) return;
              await dismissAlert({
                roomNumber,
              });
            }}
          >
            Dismiss alert
          </div>
            </>
              :
            <>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            textArea
            extraStyle={{ marginBottom: ".5rem", resize: "vertical", minHeight:'60px' }}
          />
          <div
            style={{
              padding: "1rem 2rem",
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
            onClick={async () => {
              if (postAlertLoading) return;
              await postAlert({
                message,
                roomNumber,
              });
              setMessage("")
            }}
          >
            Post alert
          </div>
          </>
          }
          <div
            style={{
              padding: "1rem 2rem",
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
            onClick={async () => {
              if (changeStatusLoading) return;
              await changeStatus({
                gameId: monitorData?.match?.id,
                flag: true,
              });
            }}
          >
            Mark as escaped
          </div>
          <div
            style={{
              padding: "1rem 2rem",
              backgroundColor: "#FE6730",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: ".5rem",
              cursor: "pointer",
              fontWeight: "700",
              marginTop: ".5rem",
            }}
            onClick={async () => {
              if (changeStatusLoading) return;
              await changeStatus({
                gameId: monitorData?.match?.id,
                flag: false,
              });
            }}
          >
            Mark as busted
          </div>
        </>
      ) : (
        <div>Room is empty</div>
      )}
    </div>
  );
};

export default GameMonitorComponent;
