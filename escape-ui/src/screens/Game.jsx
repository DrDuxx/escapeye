import { useQuery } from "react-query";
import { GET_ADMIN_SCOREBOARD } from "../services/sharedQueries";
import ScoreRow from "../components/ScoreRow";
import { useParams } from "react-router";

const Game = () => {
const {roomId} = useParams();

  const { data: scoreBoard, isLoading: scoreBoardLoading } = useQuery([
    GET_ADMIN_SCOREBOARD,
    { roomId },
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
        flexDirection: "column",
      }}
    >   
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',  minWidth: "500px",}}>
    <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: ".5rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        Most hints Used
      </div>
    <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: ".5rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >Most hints Used</div>
    </div>
    
      <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          marginBottom: "1rem",
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
              return (
                <ScoreRow {...zone} lastRow={i === scoreBoard.length - 1} />
              );
            }
          )}
        </table>
      </div>
    </div>
  );
};

export default Game;
