import { useQuery } from "react-query";
import { GET_SCOREBOARD } from "../services/sharedQueries";
import ScoreRow from "../components/ScoreRow";

const Score = () => {
  const gameId = localStorage.getItem("gameId");
  const roomId = localStorage.getItem("roomId");

  const { data: scoreBoard, isLoading: scoreBoardLoading } = useQuery([
    GET_SCOREBOARD,
    { roomId, gameId },
  ]);

  if (scoreBoardLoading) {
    return <div>Loading...</div>;
  }
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
        <table
          style={{ border: " 1px solid white", borderCollapse: "collapse" }}
        >
          <tr>
            <th
              style={{
                padding: "1rem",
                borderBottom: "1px solid black",
                borderRight: " 1px solid black",
                borderCollapse: "collapse",
              }}
            >
              Rank
            </th>
            <th
              style={{
                padding: "1rem",
                borderBottom: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              Team
            </th>
            <th
              style={{
                padding: "1rem",
                borderBottom: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              Players
            </th>
            <th
              style={{
                padding: "1rem",
                borderBottom: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              Hints Used
            </th>
            <th
              style={{
                padding: "1rem",
                borderBottom: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              Solutions Used
            </th>
            <th
              style={{
                padding: "1rem",
                borderBottom: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              Score
            </th>
            <th
              style={{
                padding: "1rem",
                borderBottom: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              Time
            </th>
            <th
              style={{
                padding: "1rem",
                borderBottom: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              Date
            </th>
          </tr>
          {scoreBoard?.map((zone, i) => {
            if (i < 10) {
              return (
                <ScoreRow {...zone} lastRow={i === scoreBoard.length - 1} />
              );
            }
            return <></>;
          })}
          {scoreBoard?.length > 10 && (
            <>
              <ScoreRow empty />
              <ScoreRow {...scoreBoard[10]} lastRow />
            </>
          )}
        </table>
      </div>
    </div>
  );
};

export default Score;
