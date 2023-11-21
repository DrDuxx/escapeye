import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { ADD_MONOPOLY_DARE } from "../services/sharedQueries";
import { useMutation } from "react-query";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";

const MonopolyDareAdd = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    action: "",
  });
  const { mutateAsync: addMonopolyDare, isLoading: addMonopolyDareLoading } =
    useMutation(ADD_MONOPOLY_DARE, {
      onSuccess: (data) => {
        navigate(`/admin/monopoly/dare`);
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
      <Title>Add dare</Title>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        <div>Action</div>
        <Input
          value={fields.action}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, action: e.target.value }));
          }}
        />
      </div>
      <Button
        onClick={async () => {
          if (!fields.action) {
            alert("Missing fields");
            return;
          }
          if (addMonopolyDareLoading) return;
          await addMonopolyDare({ ...fields });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default MonopolyDareAdd;
