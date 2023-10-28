import moment from "moment";

const ScoreRow = ({
  score,
  numberOfPlayers,
  date,
  rawTime,
  hintsUsed,
  solutionsUsed,
  teamName,
  rank,
  lastRow,
  empty
}) => {
  const rawMinutes = Math.floor((rawTime % 3600) / 60);
  const rawSeconds = rawTime % 60;
  
  const scoreMinutes = Math.floor((score % 3600) / 60);
  const scoreSeconds = score % 60;

  return (
    <tr>
      <td
        style={{
          padding: "1rem",
          textAlign: "center",
          borderTop: "1px solid black",
          borderBottom: lastRow ? "" : "1px solid black",
          borderRight: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        {empty?'...':rank}
      </td>
      <td
        style={{
          padding: "1rem",
          textAlign: "center",
          borderTop: "1px solid black",
          borderBottom: lastRow ? "" : "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        {empty?'...':teamName}
      </td>
      <td
        style={{
          padding: "1rem",
          textAlign: "center",
          borderTop: "1px solid black",
          borderBottom: lastRow ? "" : "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        {empty?'...':numberOfPlayers}
      </td>
      <td
        style={{
          padding: "1rem",
          textAlign: "center",
          borderTop: "1px solid black",
          borderBottom: lastRow ? "" : "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        {empty?'...':hintsUsed}
      </td>
      <td
        style={{
          padding: "1rem",
          textAlign: "center",
          borderTop: "1px solid black",
          borderBottom: lastRow ? "" : "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        {empty?'...':solutionsUsed}
      </td>
      <td
        style={{
          padding: "1rem",
          textAlign: "center",
          borderTop: "1px solid black",
          borderBottom: lastRow ? "" : "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        {empty?'...':`${scoreMinutes
            .toString()
            .padStart(2, "0")}:${scoreSeconds.toString().padStart(2, "0")}`}
      </td>
      <td
        style={{
          padding: "1rem",
          textAlign: "center",
          borderTop: "1px solid black",
          borderBottom: lastRow ? "" : "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        {empty?'...':`${rawMinutes
            .toString()
            .padStart(2, "0")}:${rawSeconds.toString().padStart(2, "0")}`}
      </td>
      <td
        style={{
          padding: "1rem",
          textAlign: "center",
          borderTop: "1px solid black",
          borderBottom: lastRow ? "" : "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        {empty?'...':moment(date).format("DD/MM/YYYY")}
      </td>
    </tr>
  );
};

export default ScoreRow;
