
import { api } from "./api";
import getQueryClient from "./queryClient";

const queryClient = getQueryClient();

export const GET_GAME = "GET_GAME";
export const GENERATE_GAME = "GENERATE_GAME"; 
export const GENERATE_TRANSACTION = "GENERATE_TRANSACTION"; 
export const SET_BOSTA_MODE = "SET_BOSTA_MODE"; 
export const ASSIGN_COLOR = "ASSIGN_COLOR"; 
export const EXCHANGE_COLOR = "EXCHANGE_COLOR"; 
export const EXTEND_TIME = "EXTEND_TIME"; 
export const STOP_GAME = "STOP_GAME"; 
export const UPDATE_WINNER = "UPDATE_WINNER"; 
export const MORTAGE_COLOR = "MORTAGE_COLOR"; 
export const UNMORTAGE_COLOR = "UNMORTAGE_COLOR"; 
export const USE_CHANCE = "USE_CHANCE"; 
export const USE_DARE = "USE_DARE"; 
export const GET_CHANCE = "GET_CHANCE"; 
export const GET_DARE = "GET_DARE"; 
export const DISMISS_CHANCE = "DISMISS_CHANCE"; 
export const DISMISS_DARE = "DISMISS_DARE"; 
export const USE_TRIVIA = "USE_TRIVIA";
export const GET_TRIVIA = "GET_TRIVIA";
export const ANSWER_TRIVIA = "ANSWER_TRIVIA";
export const DISMISS_TRIVIA = "DISMISS_TRIVIA";
export const NEXT_TRIVIA = "NEXT_TRIVIA";
export const GENERATE_TRIVIA_SESSION = "GENERATE_TRIVIA_SESSION";
export const SET_TRIVIA_CATEGORY_MODE = "SET_TRIVIA_CATEGORY_MODE";

queryClient.setQueryDefaults(GET_GAME, {
  queryFn: api.getGame,
});

queryClient.setMutationDefaults(GENERATE_GAME,{
  mutationFn: api.generateGame,
})

queryClient.setMutationDefaults(GENERATE_TRANSACTION,{
  mutationFn: api.generateTransaction,
})

queryClient.setMutationDefaults(ASSIGN_COLOR,{
  mutationFn: api.assignColor,
})

queryClient.setMutationDefaults(EXCHANGE_COLOR,{
  mutationFn: api.exchangeColor,
})

queryClient.setMutationDefaults(EXTEND_TIME,{
  mutationFn: api.extendTime,
})

queryClient.setMutationDefaults(STOP_GAME,{
  mutationFn: api.stopGame,
})

queryClient.setMutationDefaults(MORTAGE_COLOR,{
  mutationFn: api.mortageColor,
})

queryClient.setMutationDefaults(UNMORTAGE_COLOR,{
  mutationFn: api.unmortageColor,
})

queryClient.setQueryDefaults(USE_CHANCE, {
  queryFn: api.useChance,
});

queryClient.setQueryDefaults(USE_DARE, {
  queryFn: api.useDare,
});

queryClient.setQueryDefaults(GET_CHANCE, {
  queryFn: api.getChance,
});

queryClient.setQueryDefaults(GET_DARE, {
  queryFn: api.getDare,
});

queryClient.setMutationDefaults(DISMISS_CHANCE,{
  mutationFn: api.dismissChance,
})

queryClient.setMutationDefaults(DISMISS_DARE,{
  mutationFn: api.dismissDare,
})

queryClient.setQueryDefaults(USE_TRIVIA, {
  queryFn: api.useTrivia,
});

queryClient.setQueryDefaults(GET_TRIVIA, {
  queryFn: api.getTrivia,
});

queryClient.setMutationDefaults(ANSWER_TRIVIA,{
  mutationFn: api.answerTrivia,
})

queryClient.setMutationDefaults(DISMISS_TRIVIA,{
  mutationFn: api.dismissTrivia,
})

queryClient.setMutationDefaults(NEXT_TRIVIA,{
  mutationFn: api.nextTrivia,
})

queryClient.setMutationDefaults(GENERATE_TRIVIA_SESSION,{
  mutationFn: api.generateTriviaSession,
})

queryClient.setMutationDefaults(SET_TRIVIA_CATEGORY_MODE,{
  mutationFn: api.setTriviaCategoryMode,
})

queryClient.setMutationDefaults(UPDATE_WINNER,{
  mutationFn: api.updateWinner,
})

queryClient.setMutationDefaults(SET_BOSTA_MODE,{
  mutationFn: api.setBostaMode,
})