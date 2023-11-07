import { useState } from "react";
import Input from "../components/Input";
import Title from "../components/Title";
import { useNavigate } from "react-router";
import {
  EDIT_MONOPOLY_SETTINGS,
  GET_MONOPOLY_SETTINGS,
} from "../services/sharedQueries";
import { useMutation, useQuery } from "react-query";
import Button from "../components/Button";

const MonopolySettings = () => {
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    starting_amount: "",
    trivia_questions: "",
    trivia_question_answered_amount: 0,
  });

  const { mutateAsync: editSettings, isLoading: editSettingsLoading } =
    useMutation(EDIT_MONOPOLY_SETTINGS, {
      onSuccess: (data) => {
        navigate(`/admin/monopoly`);
      },
    });

  useQuery(GET_MONOPOLY_SETTINGS, {
    onSuccess: (data) => {
      const starting_amount = data?.settings
        ?.filter((zone) => zone.option_name === "starting_amount")
        .pop().option_value?.data;
      const trivia_questions = data?.settings
        ?.filter((zone) => zone.option_name === "trivia_questions")
        .pop().option_value?.data;
      const trivia_question_answered_amount = data?.settings
        ?.filter(
          (zone) => zone.option_name === "trivia_question_answered_amount"
        )
        .pop().option_value?.data;
      setFields({
        starting_amount,
        trivia_questions,
        trivia_question_answered_amount,
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
      <Title>Monopoly Settings</Title>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        <div>Starting amount</div>
        <Input
          value={fields.starting_amount}
          onChange={(e) => {
            setFields((prev) => ({ ...prev, starting_amount: e.target.value }));
          }}
        />
        <div>Trivia questions number</div>
        <Input
          value={fields.trivia_questions}
          onChange={(e) => {
            setFields((prev) => ({
              ...prev,
              trivia_questions: e.target.value,
            }));
          }}
        />
        <div>Correct trivia answer amount</div>
        <Input
          value={fields.trivia_question_answered_amount}
          onChange={(e) => {
            setFields((prev) => ({
              ...prev,
              trivia_question_answered_amount: e.target.value,
            }));
          }}
        />
        <Button
          onClick={async () => {
            if (editSettingsLoading) return;
            await editSettings({ ...fields });
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MonopolySettings;
