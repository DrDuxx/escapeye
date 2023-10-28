import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { EDIT_ROOM, GET_ROOM_DETAILS } from "../services/sharedQueries";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: editRoom, isLoading: editRoomLoading } = useMutation(
    EDIT_ROOM,
    {
      onSuccess: (data) => {
        navigate("/admin/rooms");
      },
    }
  );

  const { isLoading: roomDataLoading } = useQuery(
    [GET_ROOM_DETAILS, { roomId }],
    {
      onSuccess: (data) => {
        setFields({ ...data });
      },
      staleTime: 0,
      cacheTime: 0,
    }
  );

  const [fields, setFields] = useState({
    name: "",
    description: "",
    time: "",
    freeHintsNumber: "",
    freeSolutionPenalty: "",
    hintPenalty: "",
    solutionPenalty: "",
  });

  if (roomDataLoading) {
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
      <Title>Room {fields?.number}</Title>
      <Button
        width={"200px"}
        extraStyle={{ alignSelf: "flex-end" }}
        onClick={() => {
          navigate(`/admin/rooms/edit/${roomId}/hints`, {
            state: { backLink1: `/admin/rooms/edit/${roomId}` },
          });
        }}
      >
        Riddles
      </Button>
      <div>name</div>
      <Input
        value={fields.name}
        onChange={(e) => {
          setFields((prev) => ({ ...prev, name: e.target.value }));
        }}
      />
      <div>description</div>
      <Input
        textArea
        value={fields.description}
        onChange={(e) => {
          setFields((prev) => ({ ...prev, description: e.target.value }));
        }}
      />
      <div>time (in seconds)</div>
      <Input
        value={fields.time}
        onChange={(e) => {
          setFields((prev) => ({ ...prev, time: e.target.value }));
        }}
      />
      <div>freeHintsNumber</div>
      <Input
        value={fields.freeHintsNumber}
        onChange={(e) => {
          setFields((prev) => ({ ...prev, freeHintsNumber: e.target.value }));
        }}
      />
      <div>freeSolutionPenalty (in seconds)</div>
      <Input
        value={fields.freeSolutionPenalty}
        onChange={(e) => {
          setFields((prev) => ({
            ...prev,
            freeSolutionPenalty: e.target.value,
          }));
        }}
      />
      <div>hintPenalty (in seconds)</div>
      <Input
        value={fields.hintPenalty}
        onChange={(e) => {
          setFields((prev) => ({ ...prev, hintPenalty: e.target.value }));
        }}
      />
      <div>solutionPenalty (in seconds)</div>
      <Input
        value={fields.solutionPenalty}
        onChange={(e) => {
          setFields((prev) => ({ ...prev, solutionPenalty: e.target.value }));
        }}
      />
      <Button
        onClick={async () => {
          if (editRoomLoading) return;
          const editData = {
            name: fields.name,
            description: fields.description,
            time: +fields.time,
            freeHintsNumber: +fields.freeHintsNumber,
            freeSolutionPenalty: +fields.freeSolutionPenalty,
            hintPenalty: +fields.hintPenalty,
            solutionPenalty: +fields.solutionPenalty,
          };
          await editRoom({ roomId, editData });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Room;
