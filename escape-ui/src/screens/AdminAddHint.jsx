import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router";
import { ADD_HINT } from "../services/sharedQueries";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";

const AdminAddHint = () => {
  const { roomId,nextNumber } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: addHint, isLoading: addHintLoading } = useMutation(
    ADD_HINT,
    {
      onSuccess: (data) => {
        navigate(`/admin/rooms/edit/${roomId}/hints`);
      },
    }
  );

  const [fields, setFields] = useState({
    hint: "",
    solution: "",
    number:nextNumber,
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: "1rem 30%",
        color: "#fff",
      }}
    >
      <Title extraStyle={{ marginBottom: "2rem" }}>
        Add New Riddle
      </Title>
      <div>number</div>
      <Input
        value={fields.number}
        onChange={(e) => {
          setFields((prev) => ({ ...prev, number: e.target.value }));
        }}
      />
      <div>hint</div>
      <Input
        textArea
        value={fields.hint}
        onChange={(e) => {
          setFields((prev) => ({ ...prev, hint: e.target.value }));
        }}
      />
      <div>solution</div>
      <Input
        textArea
        value={fields.solution}
        onChange={(e) => {
          setFields((prev) => ({ ...prev, solution: e.target.value }));
        }}
      />
      <Button
        onClick={async () => {
          if (addHintLoading) return;
          
          const addData = {
            hint: fields.hint,
            solution: fields.solution,
            number:+fields.number
          };
          if(!addData.hint || !addData.solution) return 
          await addHint({ roomId, addData });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default AdminAddHint;
