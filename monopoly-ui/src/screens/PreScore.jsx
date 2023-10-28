import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { EDIT_GAME } from "../services/sharedQueries";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";

const PreScore = () => {
  const [teamName, setTeamName] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const navigate = useNavigate();

  const gameId = localStorage.getItem("gameId");

  const { mutateAsync: editGame, isLoading: editGameLoading } =
    useMutation(EDIT_GAME);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: ".5rem",
          minWidth: "500px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: "700" }}>Enter number of players:</div>
        <Input
          value={numberOfPlayers}
          onChange={(e) => {
            setNumberOfPlayers(e.target.value);
          }}
          extraStyle={{ color: "black" }}
          type={"number"}
          min={1}
          max={10}
        />
        <div style={{ fontWeight: "700" }}>Enter your team name:</div>
        <Input
          value={teamName}
          onChange={(e) => {
            setTeamName(e.target.value);
          }}
          extraStyle={{ color: "black" }}
        />
        <Button
          extraStyle={{ backgroundColor: "black", color: "white" }}
          onClick={async () => {
            if (!teamName) return;
            if (editGameLoading) return;
            await editGame({ gameId, teamName, numberOfPlayers });
            navigate('/score')
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PreScore;
