import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { ADD_MONOPOLY_TRIVIA } from "../services/sharedQueries";
import { useMutation } from "react-query";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";

const MonopolyTriviaAdd = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    question: "",
    answer: "",
    category: "geography",
  });

  const {
    mutateAsync: addMonopolyTrivia,
    isLoading: addMonopolyTriviaLoading,
  } = useMutation(ADD_MONOPOLY_TRIVIA, {
    onSuccess: (data) => {
      navigate(`/admin/monopoly/trivia`);
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
      <Title>Add trivia</Title>
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
            if (addMonopolyTriviaLoading) return;
            await addMonopolyTrivia({...fields});
          }}
        >
          Submit
        </Button>
    </div>
  );
};

export default MonopolyTriviaAdd;
