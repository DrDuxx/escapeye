import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "react-query";
import {
  GENERATE_TRIVIA_SESSION,
  GET_GAME,
  SET_TRIVIA_CATEGORY_MODE,
} from "../services/sharedQueries";
import { triviaCategories } from "../categories";
import { ReactComponent as BackIcon } from "../assets/icons/back-icon.svg";

const TriviaCategories = () => {
  const [fields, setFields] = useState({ player: 0 });
  const navigate = useNavigate();

  const {
    mutateAsync: generateTriviaSession,
    isLoading: generateTriviaSessionLoading,
  } = useMutation(GENERATE_TRIVIA_SESSION);

  const {
    mutateAsync: setTriviaCategoryMode,
    isLoading: setTriviaCategoryModeLoading,
  } = useMutation(SET_TRIVIA_CATEGORY_MODE);

  const { data: runningGame } = useQuery(GET_GAME, {
    cacheTime: 0,
    staleTime: 0,
    onSuccess: async (data) => {
      let triviaSessions = data?.game?.triviaSessions;
      if (triviaSessions?.length > 0) {
        if (triviaSessions[triviaSessions?.length - 1]?.isOpen) {
          navigate("/trivia");
        } else {
          await setTriviaCategoryMode({ mode: true });
        }
      } else {
        await setTriviaCategoryMode({ mode: true });
      }
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
        Trivia Categories
      </div>
      <BackIcon
        style={{
          position: "absolute",
          width: 25,
          height: 25,
        }}
        onClick={async () => {
          await setTriviaCategoryMode({mode:false});
          navigate("/game");
        }}
      />
      <div>
        <div style={{ marginBottom: ".5rem", color: "white" }}>Player:</div>
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
            setFields((prev) => ({ ...prev, player: +e.target.value }));
          }}
          value={fields.player}
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
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: "2rem",
          rowGap: "2rem",
        }}
      >
        {triviaCategories.map((zone) => {
          return (
            <Button
              extraStyle={{
                marginBottom: "1rem",
                width: "100%",
                color: "white",
                flexBasis: "40%",
                backgroundColor: zone.hex,
                border: "1px solid black",
              }}
              onClick={async () => {
                if (
                  generateTriviaSessionLoading ||
                  setTriviaCategoryModeLoading
                )
                  return;
                await generateTriviaSession({
                  player: fields.player,
                  category: zone.name,
                });
                navigate("/trivia");
              }}
            >
              {zone.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TriviaCategories;
