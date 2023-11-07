import { useMutation, useQuery } from "react-query";
import Button from "../components/Button";
import Input from "../components/Input";
import { GENERATE_TRANSACTION, GET_GAME } from "../services/sharedQueries";
import { useNavigate } from "react-router";
import { useState } from "react";

const PlayerBank = () => {
  const [fields, setFields] = useState({
    amount: "",
    player: 0,
  });
  const navigate = useNavigate();

  const { data: runningGame, isLoading: runningGameLoading } = useQuery(
    GET_GAME,
    {
      cacheTime: 0,
      staleTime: 0,
    }
  );

  const {
    mutateAsync: generateTransaction,
    isLoading: generateTransactionLoading,
  } = useMutation(GENERATE_TRANSACTION);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        rowGap: "2rem",
        padding: "2rem",
        backgroundColor: "#D32027",
        height: "100%",
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
        Player -&gt; Bank
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
        <div style={{ marginBottom: ".5rem", color: "white" }}>Player:</div>
        <select
          style={{
            fontSize: "1rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            width: "100%",
            outline: "none",
            backgroundColor: "transparent",
            color: "white",
            borderColor: "white",
          }}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, player: e.target.value }));
          }}
          value={fields.player}
        >
          {runningGame?.game?.players?.map((zone) => {
            return (
              <option
                value={zone.index}
                style={{ backgroundColor: "white", color: "black" }}
              >
                {zone.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <div style={{ color: "white" }}>Amount:</div>
        <Input
          value={fields.amount}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, amount: e.target.value }));
          }}
          type={"number"}
          extraStyle={{
            color: "white",
            backgroundColor: "transparent",
            width: "100%",
            outline: "none",
            borderColor: "white",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "1.5rem",
          rowGap: "1.5rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          onClick={() => {
            setFields((prev) => ({
              ...prev,
              amount: runningGame?.settings?.filter(
                (zone) => zone.option_name === "baalback_fee"
              )[0].option_value.data,
            }));
          }}
          style={{
            padding: "1.5rem",
            borderRadius: "4rem",
            minWidth: "150px",
            textAlign: "center",
            fontSize: "24px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
          }}
        >
          Baalback Fee (Icon)
        </div>
        <div
          onClick={() => {
            setFields((prev) => ({
              ...prev,
              amount: runningGame?.settings?.filter(
                (zone) => zone.option_name === "daman_fee"
              )[0].option_value.data,
            }));
          }}
          style={{
            padding: "1.5rem",
            borderRadius: "4rem",
            minWidth: "150px",
            textAlign: "center",
            fontSize: "24px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
          }}
        >
          Daman Fee (Icon)
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "1.5rem",
          rowGap: "1.5rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          onClick={() => {
            setFields((prev) => ({ ...prev, amount: 50 }));
          }}
          style={{
            padding: "1.5rem",
            borderRadius: "4rem",
            minWidth: "150px",
            textAlign: "center",
            fontSize: "24px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
          }}
        >
          50
        </div>
        <div
          onClick={() => {
            setFields((prev) => ({ ...prev, amount: 100 }));
          }}
          style={{
            padding: "1.5rem",
            borderRadius: "4rem",
            minWidth: "150px",
            textAlign: "center",
            fontSize: "24px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
          }}
        >
          100
        </div>
        <div
          onClick={() => {
            setFields((prev) => ({ ...prev, amount: 150 }));
          }}
          style={{
            padding: "1.5rem",
            borderRadius: "4rem",
            minWidth: "150px",
            textAlign: "center",
            fontSize: "24px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
          }}
        >
          150
        </div>
        <div
          onClick={() => {
            setFields((prev) => ({ ...prev, amount: 200 }));
          }}
          style={{
            padding: "1.5rem",
            borderRadius: "4rem",
            minWidth: "150px",
            textAlign: "center",
            fontSize: "24px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
          }}
        >
          200
        </div>
        <div
          onClick={() => {
            setFields((prev) => ({ ...prev, amount: 250 }));
          }}
          style={{
            padding: "1.5rem",
            borderRadius: "4rem",
            minWidth: "150px",
            textAlign: "center",
            fontSize: "24px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
          }}
        >
          250
        </div>
        <div
          onClick={() => {
            setFields((prev) => ({ ...prev, amount: 300 }));
          }}
          style={{
            padding: "1.5rem",
            borderRadius: "4rem",
            minWidth: "150px",
            textAlign: "center",
            fontSize: "24px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
          }}
        >
          300
        </div>
      </div>
      <Button
        extraStyle={{
          marginBottom: "1rem",
          width: "100%",
          color: "black",
          backgroundColor: "white",
        }}
        onClick={async () => {
          if (isNaN(+fields.amount) || +fields.amount <= 0) return;
          if (runningGameLoading || generateTransactionLoading) return;
          try {
            await generateTransaction({
              sign: "Debit",
              player: fields.player,
              amount: fields.amount,
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

export default PlayerBank;
