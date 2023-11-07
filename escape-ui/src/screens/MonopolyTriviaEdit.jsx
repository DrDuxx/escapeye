import Title from "../components/Title";
import { useNavigate, useParams } from "react-router-dom";
import { DELETE_MONOPOLY_TRIVIA, EDIT_MONOPOLY_TRIVIA, GET_MONOPOLY_TRIVIA } from "../services/sharedQueries";
import { useMutation, useQuery } from "react-query";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";

const MonopolyTriviaEdit = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    question: "",
    answer: "",
    category: "geography",
  });

  const {triviaId} = useParams()

  const { isLoading: monopolyTriviaLoading } =
    useQuery([GET_MONOPOLY_TRIVIA,{triviaId}], {
      staleTime: 0,
      cacheTime: 0,
      onSuccess:(data)=>{
        setFields(prev=>({...prev,...data?.trivia}))
      }
    });

  const {
    mutateAsync: editMonopolyTrivia,
    isLoading: editMonopolyTriviaLoading,
  } = useMutation(EDIT_MONOPOLY_TRIVIA, {
    onSuccess: (data) => {
      navigate(`/admin/monopoly/trivia`);
    },
  });

  const {
    mutateAsync: deleteMonopolyTrivia,
    isLoading: deleteMonopolyTriviaLoading,
  } = useMutation(DELETE_MONOPOLY_TRIVIA, {
    onSuccess: (data) => {
      navigate(`/admin/monopoly/trivia`);
    },
  });

  if(monopolyTriviaLoading){
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
        <Title>Edit Trivia</Title>
        <div
          onClick={async () => {
            if(deleteMonopolyTriviaLoading) return;
            await deleteMonopolyTrivia({triviaId})
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
          Delete Trivia
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
        <div>Question</div>
        <Input
          value={fields.question}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, question: e.target.value }));
          }}
        />
        <div>Answer</div>
        <Input
          value={fields.answer}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, answer: e.target.value }));
          }}
        />
        <div>Category</div>
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
            setFields((prev) => ({ ...prev, category: e.target.value }));
          }}
          value={fields.category}
        >
          <option
            value="geography"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Geography
          </option>
          <option
            value="physics"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Physics
          </option>
          <option
            value="music"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Music
          </option>
          <option
            value="planet"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Planet
          </option>
          <option
            value="history"
            style={{ backgroundColor: "white", color: "black" }}
          >
            History
          </option>
          <option
            value="sports"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Sports
          </option>
        </select>
      </div>
      <Button
          onClick={async () => {
            if(!fields.question || !fields.answer) {
              alert('Missing fields')
              return;
            }
            if (editMonopolyTriviaLoading) return;
            await editMonopolyTrivia({triviaId,editData:{...fields}});
          }}
        >
          Submit
        </Button>
    </div>
  );
};

export default MonopolyTriviaEdit;
