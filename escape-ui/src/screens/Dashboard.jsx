import { useNavigate } from "react-router";
import Button from "../components/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          width={"400px"}
          onClick={() => {
            navigate("/admin/monitor");
          }}
        >
          Monitor
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          width={"400px"}
          onClick={() => {
            navigate("/admin/rooms");
          }}
        >
          Rooms
        </Button>
        <Button
          width={"400px"}
          onClick={() => {
            navigate("/admin/games");
          }}
        >
          Games
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
