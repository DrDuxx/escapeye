import Title from "../components/Title";
import { useNavigate } from "react-router";

const Monopoly = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "1rem 30%",
        color: "white",
      }}
    >
      <Title>Monopoly</Title>
      <div
        style={{
          padding: "1rem 2rem",
          flexBasis: "25%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: ".5rem",
          cursor: "pointer",
          color: "#000",
          fontWeight: "700",
          marginTop: "1rem",
        }}
        onClick={() => {
          navigate(`/admin/monopoly/chance`);
        }}
      >
        Chance
      </div>
      <div
        style={{
          padding: "1rem 2rem",
          flexBasis: "25%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: ".5rem",
          cursor: "pointer",
          color: "#000",
          fontWeight: "700",
          marginTop: "1rem",
        }}
        onClick={() => {
          navigate(`/admin/monopoly/dare`);
        }}
      >
        Dare
      </div>
      <div
        style={{
          padding: "1rem 2rem",
          flexBasis: "25%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: ".5rem",
          cursor: "pointer",
          color: "#000",
          fontWeight: "700",
          marginTop: "1rem",
        }}
        onClick={() => {
          navigate(`/admin/monopoly/trivia`);
        }}
      >
        Trivia
      </div>
      <div
        style={{
          padding: "1rem 2rem",
          flexBasis: "25%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: ".5rem",
          cursor: "pointer",
          color: "#000",
          fontWeight: "700",
          marginTop: "1rem",
        }}
        onClick={() => {
          navigate(`/admin/monopoly/fees-and-bonuses`);
        }}
      >
        Fees and Bonuses
      </div>
      <div
        style={{
          padding: "1rem 2rem",
          flexBasis: "25%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: ".5rem",
          cursor: "pointer",
          color: "#000",
          fontWeight: "700",
          marginTop: "1rem",
        }}
        onClick={() => {
          navigate(`/admin/monopoly/colors`);
        }}
      >
        Colors
      </div>
      <div
        style={{
          padding: "1rem 2rem",
          flexBasis: "25%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: ".5rem",
          cursor: "pointer",
          color: "#000",
          fontWeight: "700",
          marginTop: "1rem",
        }}
        onClick={() => {
          navigate(`/admin/monopoly/locations`);
        }}
      >
        Locations
      </div>
      <div
        style={{
          padding: "1rem 2rem",
          flexBasis: "25%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: ".5rem",
          cursor: "pointer",
          color: "#000",
          fontWeight: "700",
          marginTop: "1rem",
        }}
        onClick={() => {
          navigate(`/admin/monopoly/settings`);
        }}
      >
        Settings
      </div>
    </div>
  );
};

export default Monopoly;
