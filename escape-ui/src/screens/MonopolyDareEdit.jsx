import Title from "../components/Title";
import { useNavigate, useParams } from "react-router-dom";
import { DELETE_MONOPOLY_DARE, EDIT_MONOPOLY_DARE, GET_MONOPOLY_DARE } from "../services/sharedQueries";
import { useMutation, useQuery } from "react-query";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";

const MonopolyDareEdit = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    action: "",
  });

  const {dareId} = useParams()

  const { isLoading: monopolyDareLoading } =
    useQuery([GET_MONOPOLY_DARE,{dareId}], {
      staleTime: 0,
      cacheTime: 0,
      onSuccess:(data)=>{
        setFields(prev=>({...prev,...data?.dare}))
      }
    });

  const {
    mutateAsync: editMonopolyDare,
    isLoading: editMonopolyDareLoading,
  } = useMutation(EDIT_MONOPOLY_DARE, {
    onSuccess: (data) => {
      navigate(`/admin/monopoly/dare`);
    },
  });

  const {
    mutateAsync: deleteMonopolyDare,
    isLoading: deleteMonopolyDareLoading,
  } = useMutation(DELETE_MONOPOLY_DARE, {
    onSuccess: (data) => {
      navigate(`/admin/monopoly/dare`);
    },
  });

  if(monopolyDareLoading){
    return <div>loading...</div>
  }

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title>Edit Dare</Title>
        <div
          onClick={async () => {
            if(deleteMonopolyDareLoading) return;
            await deleteMonopolyDare({dareId})
          }}
          style={{
            padding: ".5rem 2rem",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: ".5rem",
            cursor: "pointer",
            color: "#000",
            fontWeight:'700'
          }}
        >
          Delete Dare
        </div>
      </div>
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
            if(!fields.action) {
              alert('Missing fields')
              return;
            }
            if (editMonopolyDareLoading) return;
            await editMonopolyDare({dareId, editData:{...fields}});
          }}
        >
          Submit
        </Button>
    </div>
  );
};

export default MonopolyDareEdit;
