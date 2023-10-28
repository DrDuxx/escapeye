import GameMonitorComponent from "../components/GameMonitorComponent";

const Monitor = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        columnGap: "1rem",
      }}
    >
      <GameMonitorComponent roomNumber={1} />
      <div style={{ width: "1px", backgroundColor: "black" }}></div>
      <GameMonitorComponent roomNumber={2} />
      <div style={{ width: "1px", backgroundColor: "black" }}></div>
      <GameMonitorComponent roomNumber={3} />
    </div>
  );
};

export default Monitor;
