import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { ADD_MONOPOLY_CHANCE } from "../services/sharedQueries";
import { useMutation } from "react-query";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";

const MonopolyChanceAdd = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    title: "",
    action: "",
    actionType: "other",
    amount: 0,
    direction: "bp",
  });
  const {
    mutateAsync: addMonopolyChance,
    isLoading: addMonopolyChanceLoading,
  } = useMutation(ADD_MONOPOLY_CHANCE, {
    onSuccess: (data) => {
      navigate(`/admin/monopoly/chance`);
    },
  });

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
      <Title>Add chance</Title>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        <div>Title</div>
        <Input
          value={fields.title}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
        <div>Action</div>
        <Input
          value={fields.action}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, action: e.target.value }));
          }}
        />
        <div>ActionType</div>
        <select
          style={{
            fontSize: "1rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            width: "100%",
            outline: "none",
            backgroundColor: "transparent",
            color: "white",
            borderColor: "black",
            margin: ".5rem 0 2rem",
          }}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, actionType: e.target.value }));
          }}
          value={fields.actionType}
        >
          <option
            value="money"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Money
          </option>
          <option
            value="color"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Color
          </option>
          <option
            value="other"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Other
          </option>
        </select>
        {fields?.actionType === "money" && (
          <>
            <div>Amount</div>
            <Input
              value={fields.amount}
              onChange={(e) => {
                setFields((prev) => ({ ...prev, amount: e.target.value }));
              }}
            />
          </>
        )}
        {fields?.actionType !== "other" && (
          <>
            <div>Direction</div>
            <select
              style={{
                fontSize: "1rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                width: "100%",
                outline: "none",
                backgroundColor: "transparent",
                color: "white",
                borderColor: "black",
                margin: ".5rem 0 2rem",
              }}
              onChange={(e) => {
                setFields((prev) => ({ ...prev, direction: e.target.value }));
              }}
              value={fields.direction}
            >
              <option
                value="bp"
                style={{ backgroundColor: "white", color: "black" }}
              >
                Bank to Player
              </option>
              <option
                value="pb"
                style={{ backgroundColor: "white", color: "black" }}
              >
                Player to Bank
              </option>
              <option
                value="pp"
                style={{ backgroundColor: "white", color: "black" }}
              >
                Player to Player
              </option>
            </select>
          </>
        )}
      </div>
      <Button
          onClick={async () => {
            if(!fields.title || !fields.action) {
              alert('Missing fields')
              return;
            }
            if (addMonopolyChanceLoading) return;
            await addMonopolyChance({...fields});
          }}
        >
          Submit
        </Button>
    </div>
  );
};

export default MonopolyChanceAdd;
