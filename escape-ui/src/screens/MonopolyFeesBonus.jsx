import { useState } from "react";
import Input from "../components/Input";
import Title from "../components/Title";
import { useNavigate } from "react-router";
import {
  EDIT_MONOPOLY_FEES,
  GET_MONOPOLY_SETTINGS,
} from "../services/sharedQueries";
import { useMutation, useQuery } from "react-query";
import Button from "../components/Button";

const MonopolyFeesBonus = () => {
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    bosta_fee: 0,
    daman_fee: 0,
    baalback_fee: 0,
    go_bonus: 0,
  });

  const { mutateAsync: editFees, isLoading: editFeesLoading } = useMutation(
    EDIT_MONOPOLY_FEES,
    {
      onSuccess: (data) => {
        navigate(`/admin/monopoly`);
      },
    }
  );

  useQuery(GET_MONOPOLY_SETTINGS, {
    onSuccess: (data) => {
      const bosta_fee = data?.settings
        ?.filter((zone) => zone.option_name === "bosta_fee")
        .pop().option_value?.data;
      const daman_fee = data?.settings
        ?.filter((zone) => zone.option_name === "daman_fee")
        .pop().option_value?.data;
      const baalback_fee = data?.settings
        ?.filter((zone) => zone.option_name === "baalback_fee")
        .pop().option_value?.data;
      const go_bonus = data?.settings
        ?.filter((zone) => zone.option_name === "go_bonus")
        .pop().option_value?.data;
      setFields({
        bosta_fee,
        daman_fee,
        baalback_fee,
        go_bonus,
      });
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
      <Title>Monopoly Fees</Title>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        <div>Bosta fees</div>
        <Input
          value={fields.bosta_fee}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, bosta_fee: e.target.value }));
          }}
        />
        <div>Daman fees</div>
        <Input
          value={fields.daman_fee}
          onChange={(e) => {
            setFields((prev) => ({
              ...prev,
              daman_fee: e.target.value,
            }));
          }}
        />
        <div>Baalback fees</div>
        <Input
          value={fields.baalback_fee}
          onChange={(e) => {
            setFields((prev) => ({
              ...prev,
              baalback_fee: e.target.value,
            }));
          }}
        />
        <div>Go bonus</div>
        <Input
          value={fields.go_bonus}
          onChange={(e) => {
            setFields((prev) => ({
              ...prev,
              go_bonus: e.target.value,
            }));
          }}
        />
        <Button
          onClick={async () => {
            if (editFeesLoading) return;
            await editFees({ ...fields });
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MonopolyFeesBonus;
