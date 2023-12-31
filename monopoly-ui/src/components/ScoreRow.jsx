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
        {empty?'...':score}
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
        {empty?'...':rawTime}
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
