import { useMutation } from "react-query";
import Button from "../components/Button";
import Input from "../components/Input";
import { EXTEND_TIME } from "../services/sharedQueries";
import { useNavigate } from "react-router";
import { useState } from "react";

const ExtendTime = () => {
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const { mutateAsync: extendTime, isLoading: extendTimeLoading } =
    useMutation(EXTEND_TIME);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        rowGap: "2rem",
        padding: "2rem",
        height: "100%",
        minHeight: "inherit",
        backgroundColor: "#D32027",
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
        Extend Time
      </div>
      <Button
        extraStyle={{
          marginBottom: "1rem",
          width: "100%",
          color: "black",
          backgroundColor: "white",
        }}
        onClick={() => {
          navigate("/game");
        }}
      >
        BACK
      </Button>
      <div>
        <div style={{ color: "white" }}>Additional Time (In minutes)</div>
        <Input
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          extraStyle={{
            color: "white",
            backgroundColor: "transparent",
            width: "100%",
            outline: "none",
            borderColor: "white",
          }}
          type={"number"}
          min={1}
          max={10}
        />
      </div>
      <Button
        extraStyle={{
          marginBottom: "1rem",
          width: "100%",
          color: "black",
          backgroundColor: "white",
        }}
        onClick={async () => {
          if (isNaN(+time) || time <= 0) {
            alert("Time must be more than 0");
            return;
          }
          if (extendTimeLoading) return;

          try {
            await extendTime({
              time,
            });
            navigate("/game");
          } catch (error) {
            alert("error:", error);
          }
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default ExtendTime;
