import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { GET_MONOPOLY_CHANCES } from "../services/sharedQueries";
import { useQuery } from "react-query";
import Input from "../components/Input";
import { useState } from "react";

const MonopolyChance = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data: monopolyChancesData, isLoading: monopolyChancesLoading } =
    useQuery(GET_MONOPOLY_CHANCES, {
      staleTime: 0,
      cacheTime: 0,
    });

  if (monopolyChancesLoading) {
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
        <Title>Chances</Title>
        <div
          onClick={() => {
            navigate("/admin/monopoly/chance/add");
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
            fontWeight: "700",
          }}
        >
          Add Chance
        </div>
      </div>
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {monopolyChancesData?.chances
        ?.filter((zone) => zone.action.toLowerCase().includes(search.toLowerCase()) || zone.title.toLowerCase().includes(search.toLowerCase()))
        .map((zone) => {
          return (
            <div
              style={{
                padding: "1rem 2rem",
                flexBasis: "25%",
                backgroundColor: "#fff",
                textAlign: "center",
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
                navigate(`/admin/monopoly/chance/edit/${zone.id}`);
              }}
            >
              {zone.action}
            </div>
          );
        })}
    </div>
  );
};

export default MonopolyChance;
