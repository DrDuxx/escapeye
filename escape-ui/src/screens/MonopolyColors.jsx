import React from "react";
import {
  EDIT_MONOPOLY_COLOR,
  GET_MONOPOLY_SETTINGS,
} from "../services/sharedQueries";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";

const MonopolyColors = () => {
  const navigate = useNavigate();

  const [colors, setColors] = useState([]);

  const handleHexChange = (value, index) => {
    let newColors = [...colors];
    newColors = newColors.map((zone, i) => {
      if (i === index) {
        return { ...zone, hex: value };
      }
      return zone;
    });
    setColors(newColors);
  };
  const handleAmountChange = (value, index) => {
    let newColors = [...colors];
    newColors = newColors.map((zone, i) => {
      if (i === index) {
        return { ...zone, amount: value };
      }
      return zone;
    });
    setColors(newColors);
  };

  const { mutateAsync: editColors, isLoading: editColorsLoading } = useMutation(
    EDIT_MONOPOLY_COLOR,
    {
      onSuccess: (data) => {
        navigate(`/admin/monopoly`);
      },
    }
  );

  useQuery(GET_MONOPOLY_SETTINGS, {
    onSuccess: (data) => {
      const colors = data?.settings
        ?.filter((zone) => zone.option_name === "colors")
        .pop().option_value?.data;
      setColors(
        Object.entries(colors)?.map(([key, value], i) => ({
          hex: key,
          amount: value,
        }))
      );
    },
    staleTime: 0,
    cacheTime: 0,
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
      <Title>Monopoly Colors</Title>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        {colors?.map((zone, i) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                columnGap: "1rem",
              }}
            >
              <Input
                disabled={zone.hex === "jail" || zone.hex === "edl"}
                value={zone.hex}
                onChange={(e) => {
                  handleHexChange(e.target.value, i);
                }}
              />
              <Input
                value={zone.amount}
                onChange={(e) => {
                  handleAmountChange(e.target.value, i);
                }}
              />
            </div>
          );
        })}
        <Button
          onClick={async () => {
            let editObject = {}
            colors?.map((zone)=>{
                editObject[zone.hex] = +zone.amount
            })
            if (editColorsLoading) return;
            await editColors(editObject);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MonopolyColors;
