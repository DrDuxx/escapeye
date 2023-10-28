import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router";
import { DELETE_HINT, EDIT_HINT, GET_HINT } from "../services/sharedQueries";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";

const AdminHint = () => {
  const { hintId, roomId } = useParams();
  const navigate = useNavigate();
    const {state} = useLocation();

  const { mutateAsync: editHint, isLoading: editHintLoading } = useMutation(
    EDIT_HINT,
    {
      onSuccess: (data) => {
        navigate(`/admin/rooms/edit/${roomId}/hints`, {state:{...state}});
      },
    }
  );

  const { mutateAsync: deleteHint, isLoading: deleteHintLoading } = useMutation(
    DELETE_HINT,
    {
      onSuccess: (data) => {
        navigate(`/admin/rooms/edit/${roomId}/hints`, {state:{...state}});
      },
    }
  );

  const { isLoading: hintDataLoading } = useQuery([GET_HINT, { hintId }], {
    onSuccess: (data) => {
      setFields({ ...data });
    },
    staleTime: 0,
    cacheTime: 0,
  });

  const [fields, setFields] = useState({
    hint: "",
    solution: "",
  });

  if (hintDataLoading) {
    return <div>Loading...</div>;
  }
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
        <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem"
        }}
      >

      <Title>
        Riddle {fields?.number}
      </Title>
      <Button
          onClick={async () => {
           if(deleteHintLoading) return;
           await deleteHint({hintId})
          }}
        >
          Delete Riddle
        </Button>
        </div>
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
          if (editHintLoading) return;
          const editData = {
            hint: fields.hint,
            solution: fields.solution,
          };
          await editHint({ hintId, editData });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default AdminHint;
