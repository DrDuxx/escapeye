import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { GET_MONOPOLY_TRIVIAS } from "../services/sharedQueries";
import { useQuery } from "react-query";
import Input from "../components/Input";
import { useState } from "react";

const MonopolyTrivia = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data: monopolyTriviaData, isLoading: monopolyTriviasLoading } =
    useQuery(GET_MONOPOLY_TRIVIAS, {
      staleTime: 0,
      cacheTime: 0,
    });

  if (monopolyTriviasLoading) {
    return <div>loading...</div>;
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
        <Title>Trivias</Title>
        <div
          onClick={() => {
            navigate("/admin/monopoly/trivia/add");
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
          Add Trivia
        </div>
      </div>
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {monopolyTriviaData?.trivias?.filter((zone) => zone.question.toLowerCase().includes(search.toLowerCase()) || zone.answer.toLowerCase().includes(search.toLowerCase()) || zone.category.toLowerCase().includes(search.toLowerCase()))?.map((zone) => {
        return (
          <div
            style={{
              padding: "1rem 2rem",
              flexBasis: "25%",
              backgroundColor: "#fff",
              textAlign:'center',
              borderRadius: ".5rem",
              cursor: "pointer",
              color: "#000",
              fontWeight: "700",
              marginTop: "1rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            onClick={() => {
              navigate(`/admin/monopoly/trivia/edit/${zone.id}`);
            }}
          >
            {zone.question}
          </div>
        );
      })}
    </div>
  );
};

export default MonopolyTrivia;
