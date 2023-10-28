import { useNavigate, useParams } from "react-router";
import ClockLayout from "../components/ClockLayout";
import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { useMutation, useQuery } from "react-query";
import {
  GET_GAME_DETAILS,
  GET_ROOM_DETAILS,
  USE_HINT,
  USE_SOLUTION,
} from "../services/sharedQueries";
import BackIcon from "../assets/icons/back-icon.svg";

const Hint = () => {
  const { riddleId, riddleNumber } = useParams();
  const [hint, setHint] = useState("");
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [solution, setSolution] = useState("");
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);
  const [consent, setConsent] = useState({ type: "", isOpen: false });

  const navigate = useNavigate();

  const roomId = localStorage.getItem("roomId");
  const gameId = localStorage.getItem("gameId");

  const { data: gameData, isLoading: gameDataLoading } = useQuery(
    [GET_GAME_DETAILS, { gameId }],
    {
      enabled: Boolean(gameId),
    }
  );

  const { data: roomData } = useQuery([GET_ROOM_DETAILS, { roomId }], {
    enabled: Boolean(roomId),
  });

  const { mutateAsync: getHint, isLoading: getHintLoading } =
    useMutation(USE_HINT);

  const { mutateAsync: getSolution, isLoading: getSolutionLoading } =
    useMutation(USE_SOLUTION);

  useEffect(() => {
    async function fetchData() {
      if (riddleId && gameId && gameData?.hintsUsed?.includes(riddleId)) {
        const hintRes = await getHint({ riddleId, gameId });
        setHint(hintRes.hint);
        setIsHintOpen(true);
      }
      if (riddleId && gameId && gameData?.solutionsUsed?.includes(riddleId)) {
        const solutionRes = await getSolution({ riddleId, gameId });
        setSolution(solutionRes.solution);
        setIsSolutionOpen(true);
      }
    }
    fetchData();
  }, [gameData, riddleId, getSolution, getHint, gameId]);

  const freeHintRemaining =
    roomData?.freeHintsNumber - gameData?.hintsUsed?.length > 0;

  const isFreeHintSolution = useMemo(() => {
    if(gameData && roomData){
      const notFreeHints =
        gameData?.hintsUsed?.length - roomData?.freeHintsNumber;
      const freeHintsUsed =
        notFreeHints > 0
          ? [...gameData?.hintsUsed?.slice(0, roomData?.freeHintsNumber)]
          : [...gameData?.hintsUsed];
      return freeHintsUsed?.includes(riddleId)
    }
  }, [gameData, riddleId, roomData]);

  const getTimeInText = (time)=>{
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${minutes?minutes+'m ':''}${seconds?seconds+'s':''}`
  }

  const getConsentText = (type) => {
    switch (type) {
      case "freeHint":
        return {
          text: "Using this hint will deduct one free hint from you.",
          fn: async () => {
            if (getHintLoading) return;
            const hintRes = await getHint({ riddleId, gameId });
            setHint(hintRes.hint);
            setIsHintOpen(true);
            setConsent({ type: "", isOpen: false });
          },
        };
      case "freeSolution":
        return {
          text: `Using this solution will deduct ${getTimeInText(roomData?.freeSolutionPenalty)} from you.`,
          fn: async () => {
            if (getSolutionLoading) return;
            const solutionRes = await getSolution({
              riddleId,
              gameId,
            });
            setSolution(solutionRes.solution);
            setIsSolutionOpen(true);
            setConsent({ type: "", isOpen: false });
          },
        };
      case "hint":
        return {
          text: `Using this hint will deduct ${getTimeInText(roomData?.hintPenalty)} from you.`,
          fn: async () => {
            if (getHintLoading) return;
            const hintRes = await getHint({ riddleId, gameId });
            setHint(hintRes.hint);
            setIsHintOpen(true);
            setConsent({ type: "", isOpen: false });
          },
        };
      case "solution":
        return {
          text: `Using this solution will deduct ${getTimeInText(roomData?.solutionPenalty)} from you.`,
          fn: async () => {
            if (getSolutionLoading) return;
            const solutionRes = await getSolution({
              riddleId,
              gameId,
            });
            setSolution(solutionRes.solution);
            setIsSolutionOpen(true);
            setConsent({ type: "", isOpen: false });
          },
        };

      default:
        return { text: "", fn: () => {} };
    }
  };

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <ClockLayout>
        <div style={{ width: "100%", padding: "2rem 4rem" }}>
          <div style={{ display: "flex", width: "100%" }}>
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                navigate("/hints");
              }}
            >
              <img src={BackIcon} alt="" width={20} height={20} />
            </div>
            <div
              style={{
                fontSize: "3rem",
                textAlign: "center",
                fontWeight: "700",
                marginBottom: "2rem",
                width: "100%",
                color: "white",
              }}
            >
              Riddle {riddleNumber}
            </div>
          </div>
          {gameDataLoading || getHintLoading || getSolutionLoading ? (
            <></>
          ) : (
            <>
              {isHintOpen ? (
                <>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      marginBottom: "1rem",
                      color: "white",
                    }}
                  >
                    Hint {riddleNumber}
                  </div>
                  <div style={{ marginBottom: "3rem", color: "white" }}>
                    {hint}
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Button
                    onClick={async () => {
                      if (freeHintRemaining) {
                        setConsent({ type: "freeHint", isOpen: true });
                      } else {
                        setConsent({ type: "hint", isOpen: true });
                      }
                    }}
                    width={"300px"}
                  >
                    Show hint {riddleNumber}
                  </Button>
                </div>
              )}
              {isSolutionOpen ? (
                <>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      marginBottom: "1rem",
                      color: "white",
                    }}
                  >
                    Solution {riddleNumber}
                  </div>
                  <div style={{ marginBottom: "3rem", color: "white" }}>
                    {solution}
                  </div>
                </>
              ) : (
                (!freeHintRemaining || isHintOpen) && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Button
                      onClick={async () => {
                        if (isFreeHintSolution) {
                          setConsent({ type: "freeSolution", isOpen: true });
                        } else {
                          setConsent({ type: "solution", isOpen: true });
                        }
                      }}
                      width={"300px"}
                    >
                      Show Solution {riddleNumber}
                    </Button>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </ClockLayout>
      {consent?.isOpen && (
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
              {getConsentText(consent?.type).text}
            </div>
            <Button
              extraStyle={{
                backgroundColor: "black",
                color: "white",
                marginBottom: "1rem",
              }}
              onClick={() => {
                getConsentText(consent?.type).fn();
              }}
            >
              Proceed
            </Button>
            <Button
              extraStyle={{ backgroundColor: "black", color: "white" }}
              onClick={() => {
                setConsent({ isOpen: false, type: "" });
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hint;
