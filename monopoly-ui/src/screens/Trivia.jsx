import { useMutation, useQuery } from "react-query";
import Button from "../components/Button";
import {
  ANSWER_TRIVIA,
  DISMISS_TRIVIA,
  GET_GAME,
  GET_TRIVIA,
  NEXT_TRIVIA,
  USE_TRIVIA,
} from "../services/sharedQueries";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Trivia = () => {
  const navigate = useNavigate();
  const [isLastTriviaActive, setIsLastTriviaActive] = useState(false);
  const [isLastTriviaAnswered, setIsLastTriviaAnswered] = useState(false);
  const [remaining, setRemaining] = useState(0);

  const { refetch: getRunningGame, isLoading: runningGameLoading } = useQuery(
    GET_GAME,
    {
      cacheTime: 0,
      staleTime: 0,
      onSuccess: (data) => {
        let trivias = data?.game?.trivias;
        let limit = data?.settings?.filter((zone)=>zone.option_name==='trivia_questions')?.pop().option_value.data;
        let triviaSessions = data?.game?.triviaSessions;
        let [openSession] = triviaSessions.filter((zone)=>zone.isOpen);
        setRemaining(limit - openSession.questions);
        if (trivias.length > 0) {
          let lastTrivia = trivias[trivias.length - 1];
          if (lastTrivia.isDismissed) {
            setIsLastTriviaAnswered(false);
            setIsLastTriviaActive(false);
          } else {
            if (lastTrivia.isAnswered) {
              setIsLastTriviaAnswered(true);
            } else {
              setIsLastTriviaAnswered(false);
            }
            setIsLastTriviaActive(lastTrivia?.id);
          }
        } else {
          setIsLastTriviaAnswered(false);
          setIsLastTriviaActive(false);
        }
      },
    }
  );

  const { refetch: executeTrivia, isLoading: executeTriviaLoading } = useQuery(
    USE_TRIVIA,
    { enabled: false, staleTime: 0, cacheTime: 0 }
  );

  const { mutateAsync: answerTrivia, isLoading: answerTriviaLoading } =
    useMutation(ANSWER_TRIVIA);

  const { mutateAsync: nextTiriva, isLoading: nextTirivaTriviaLoading } =
    useMutation(NEXT_TRIVIA);

  const { mutateAsync: dismissTrivia, isLoading: dismissTriviaLoading } =
    useMutation(DISMISS_TRIVIA);

  const {
    data: triviaData,
    refetch: getTriviaData,
    isLoading: triviaDataLoading,
  } = useQuery([GET_TRIVIA, { triviaId: isLastTriviaActive }], {
    enabled: false,
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    if (isLastTriviaActive) {
      getTriviaData();
    }
  }, [getTriviaData, isLastTriviaActive]);

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
        Trivia
      </div>
      <Button
        extraStyle={{
          marginBottom: "1rem",
          width: "100%",
          color: "black",
          backgroundColor: "white",
        }}
        onClick={() => {
          navigate("/game");
        }}
      >
        BACK
      </Button>

      {!isLastTriviaActive ? (
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
              dismissTriviaLoading ||
              nextTirivaTriviaLoading ||
              answerTriviaLoading ||
              executeTriviaLoading ||
              triviaDataLoading
            )
              return;
            try {
              await executeTrivia();
              await getRunningGame();
            } catch (error) {
              alert("error:", error);
            }
          }}
        >
          Get Trivia
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
            <div>Question: {triviaData?.trivia?.question}</div>
            <div>Answer: {triviaData?.trivia?.answer}</div>
          </div>
          {!isLastTriviaAnswered ? (
            <>
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
                  dismissTriviaLoading ||
                  nextTirivaTriviaLoading ||
                  answerTriviaLoading ||
                  executeTriviaLoading ||
                  triviaDataLoading
                )
                  return;
                try {
                  await answerTrivia({ triviaId: isLastTriviaActive, correct:true });
                  await getRunningGame();
                } catch (error) {
                  alert("error:", error);
                }
              }}
            >
              Correct
            </Button>
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
                  dismissTriviaLoading ||
                  nextTirivaTriviaLoading ||
                  answerTriviaLoading ||
                  executeTriviaLoading ||
                  triviaDataLoading
                )
                  return;
                try {
                  await answerTrivia({ triviaId: isLastTriviaActive, correct:false });
                  await getRunningGame();
                } catch (error) {
                  alert("error:", error);
                }
              }}
            >
              Incorrect
            </Button>
            </>
          ) : (
            <>
              {remaining>0 ?<Button
                extraStyle={{
                  marginBottom: "1rem",
                  width: "100%",
                  color: "black",
                  backgroundColor: "white",
                }}
                onClick={async () => {
                  if (
                    runningGameLoading ||
                    dismissTriviaLoading ||
                    nextTirivaTriviaLoading ||
                    answerTriviaLoading ||
                    executeTriviaLoading ||
                    triviaDataLoading
                  )
                    return;
                  try {
                    await nextTiriva({ triviaId: isLastTriviaActive });
                    getRunningGame()
                  } catch (error) {
                    alert("error:", error);
                  }
                }}
              >
                Next
              </Button>:
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
                    dismissTriviaLoading ||
                    nextTirivaTriviaLoading ||
                    answerTriviaLoading ||
                    executeTriviaLoading ||
                    triviaDataLoading
                  )
                    return;
                  try {
                    await dismissTrivia({ triviaId: isLastTriviaActive });
                    navigate("/game");
                  } catch (error) {
                    alert("error:", error);
                  }
                }}
              >
                Dismiss
              </Button>}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Trivia;
