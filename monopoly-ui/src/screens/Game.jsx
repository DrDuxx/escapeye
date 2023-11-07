import { useNavigate } from "react-router";
import Button from "../components/Button";
import { GET_GAME } from "../services/sharedQueries";
import { useQuery } from "react-query";

const Game = () => {
  const navigate = useNavigate();
  const { data: runningGame, isLoading: runningGameLoading } =
    useQuery(GET_GAME);

  return (
    <div
      style={{
        margin: "auto",
        padding: "2rem",
        backgroundColor: "#D32027",
        height: "100%",
        minHeight: "inherit",
      }}
    >
      <div
        style={{
          display: "flex",
          columnGap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            width: "100%",
            height: "100%",
          }}
        >
          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/player-bank");
            }}
          >
            Player -&gt; Bank
          </Button>

          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/bank-player");
            }}
          >
            Bank -&gt; Player
          </Button>

          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/player-player");
            }}
          >
            Player -&gt; Player
          </Button>

          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/color-player");
            }}
          >
            Assign Color -&gt; Player
          </Button>

          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/color-player-player");
            }}
          >
            Exchange Color Player -&gt; Player
          </Button>

          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/color-bank");
            }}
          >
            Assign Color -&gt; Bank
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            width: "100%",
            height: "100%",
          }}
        >
          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/chance");
            }}
          >
            Chance
          </Button>

          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/trivia/category");
            }}
          >
            Trivia
          </Button>

          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/bosta");
            }}
          >
            Bosta
          </Button>

          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/mortage");
            }}
          >
            Mortage(Player -&gt; Bank)
          </Button>

          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/unmortage");
            }}
          >
            Unmortage(Bank -&gt; Player)
          </Button>

          <Button
            extraStyle={{
              marginBottom: "1rem",
              padding: "1.75rem",
              fontSize: "16px",
              width: "100%",
              color: "black",
              background: "white",
            }}
            onClick={() => {
              navigate("/extend-time");
            }}
          >
            Extend Time
          </Button>
        </div>
      </div>
      <Button
        extraStyle={{
          marginBottom: "1rem",
          padding: "1.75rem",
          fontSize: "16px",
          width: "100%",
          color: "#D32027",
          background: "white",
        }}
        onClick={() => {
          navigate("/stop-game");
        }}
      >
        Stop Game
      </Button>
    </div>
  );
};

export default Game;
