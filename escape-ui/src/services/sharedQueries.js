
import { api } from "./api";
import getQueryClient from "./queryClient";

const queryClient = getQueryClient();

export const GET_ROOMS = "GET_ROOMS";
export const GET_ROOM_BY_ROOM_NUMBER = "GET_ROOM_BY_ROOM_NUMBER"; 
export const GET_ROOM_DETAILS = "GET_ROOM_DETAILS";
export const GET_ROOM_LOCKS = "GET_ROOM_LOCKS";
export const EDIT_ROOM = "EDIT_ROOM";

export const GET_GAMES = "GET_GAMES" // TODO:
export const GET_GAME_DETAILS = "GET_GAME_DETAILS"
export const ADD_GAME = "ADD_GAME"
export const USE_HINT = "USE_HINT"
export const USE_SOLUTION = "USE_SOLUTION"
export const GET_HINT = "GET_HINT"
export const EDIT_HINT = "EDIT_HINT"
export const ADD_HINT = "ADD_HINT"
export const DELETE_HINT = "DELETE_HINT"
export const EDIT_GAME = "EDIT_GAME"

export const ADMIN_GET_MONITOR = "ADMIN_GET_MONITOR"
export const ADMIN_CHANGE_STATUS = "ADMIN_CHANGE_STATUS"
export const POST_ALERT = "POST_ALERT"
export const DISMISS_ALERT = "DISMISS_ALERT"
export const GET_SCOREBOARD = "GET_SCOREBOARD"
export const GET_ADMIN_SCOREBOARD = "GET_ADMIN_SCOREBOARD"

export const GET_MONOPOLY_SETTINGS = "GET_MONOPOLY_SETTINGS"
export const EDIT_MONOPOLY_SETTINGS = "EDIT_MONOPOLY_SETTINGS"
export const EDIT_MONOPOLY_FEES = "EDIT_MONOPOLY_FEES"
export const EDIT_MONOPOLY_COLOR = "EDIT_MONOPOLY_COLOR"
export const EDIT_MONOPOLY_LOCATIONS = "EDIT_MONOPOLY_LOCATIONS"

export const GET_MONOPOLY_CHANCES = "GET_MONOPOLY_CHANCES"
export const GET_MONOPOLY_CHANCE = "GET_MONOPOLY_CHANCE"
export const ADD_MONOPOLY_CHANCE = "ADD_MONOPOLY_CHANCE"
export const EDIT_MONOPOLY_CHANCE = "EDIT_MONOPOLY_CHANCE"
export const DELETE_MONOPOLY_CHANCE = "DELETE_MONOPOLY_CHANCE"

export const GET_MONOPOLY_DARES = "GET_MONOPOLY_DARES"
export const GET_MONOPOLY_DARE = "GET_MONOPOLY_DARE"
export const ADD_MONOPOLY_DARE = "ADD_MONOPOLY_DARE"
export const EDIT_MONOPOLY_DARE = "EDIT_MONOPOLY_DARE"
export const DELETE_MONOPOLY_DARE = "DELETE_MONOPOLY_DARE"

export const GET_MONOPOLY_TRIVIAS = "GET_MONOPOLY_TRIVIAS"
export const GET_MONOPOLY_TRIVIA = "GET_MONOPOLY_TRIVIA"
export const ADD_MONOPOLY_TRIVIA = "ADD_MONOPOLY_TRIVIA"
export const EDIT_MONOPOLY_TRIVIA = "EDIT_MONOPOLY_TRIVIA"
export const DELETE_MONOPOLY_TRIVIA = "DELETE_MONOPOLY_TRIVIA"



queryClient.setQueryDefaults(GET_ROOM_BY_ROOM_NUMBER, {
  queryFn: api.getRoomByRoomNumber,
});

queryClient.setQueryDefaults(GET_ROOM_DETAILS, {
  queryFn: api.getRoomDetails,
});

queryClient.setQueryDefaults(GET_ROOM_LOCKS, {
  queryFn: api.getRoomLocks,
});



queryClient.setMutationDefaults(ADD_GAME,{
  mutationFn: api.addGame,
})

queryClient.setQueryDefaults(GET_GAME_DETAILS, {
  queryFn: api.getGameDetails,
});

queryClient.setMutationDefaults(USE_HINT,{
  mutationFn: api.useHint,
})

queryClient.setMutationDefaults(USE_SOLUTION,{
  mutationFn: api.useSolution,
})


queryClient.setQueryDefaults(ADMIN_GET_MONITOR, {
  queryFn: api.getAdminMonitor,
});

queryClient.setMutationDefaults(ADMIN_CHANGE_STATUS, {
  mutationFn: api.changeStatus,
});

queryClient.setMutationDefaults(POST_ALERT, {
  mutationFn: api.postAlert,
});

queryClient.setMutationDefaults(DISMISS_ALERT, {
  mutationFn: api.dismissAlert,
});

queryClient.setMutationDefaults(EDIT_GAME, {
  mutationFn: api.editGame,
});

queryClient.setMutationDefaults(EDIT_ROOM, {
  mutationFn: api.editRoom,
});

queryClient.setQueryDefaults(GET_ROOMS, {
  queryFn: api.getRooms,
});

queryClient.setQueryDefaults(GET_HINT, {
  queryFn: api.getHint,
});

queryClient.setQueryDefaults(GET_SCOREBOARD, {
  queryFn: api.getScoreBoard,
});

queryClient.setQueryDefaults(GET_ADMIN_SCOREBOARD, {
  queryFn: api.getAdminScoreBoard,
});

queryClient.setMutationDefaults(EDIT_HINT, {
  mutationFn: api.editHint,
});

queryClient.setMutationDefaults(ADD_HINT, {
  mutationFn: api.addHint,
});

queryClient.setMutationDefaults(DELETE_HINT, {
  mutationFn: api.deleteHint,
});

queryClient.setQueryDefaults(GET_MONOPOLY_SETTINGS, {
  queryFn: api.getMonopolySettings,
});

queryClient.setMutationDefaults(EDIT_MONOPOLY_SETTINGS, {
  mutationFn: api.editMonopolySettings,
});

queryClient.setMutationDefaults(EDIT_MONOPOLY_FEES, {
  mutationFn: api.editMonopolyFees,
});

queryClient.setMutationDefaults(EDIT_MONOPOLY_COLOR, {
  mutationFn: api.editMonopolyColors,
});

queryClient.setMutationDefaults(EDIT_MONOPOLY_LOCATIONS, {
  mutationFn: api.editMonopolyLocations,
});


queryClient.setQueryDefaults(GET_MONOPOLY_CHANCES, {
  queryFn: api.getMonopolyChances,
});
queryClient.setQueryDefaults(GET_MONOPOLY_CHANCE, {
  queryFn: api.getMonopolyChance,
});
queryClient.setMutationDefaults(ADD_MONOPOLY_CHANCE, {
  mutationFn: api.addMonopolyChance,
});
queryClient.setMutationDefaults(EDIT_MONOPOLY_CHANCE, {
  mutationFn: api.editMonopolyChance,
});
queryClient.setMutationDefaults(DELETE_MONOPOLY_CHANCE, {
  mutationFn: api.deleteMonopolyChance,
});


queryClient.setQueryDefaults(GET_MONOPOLY_DARES, {
  queryFn: api.getMonopolyDares,
});
queryClient.setQueryDefaults(GET_MONOPOLY_DARE, {
  queryFn: api.getMonopolyDare,
});
queryClient.setMutationDefaults(ADD_MONOPOLY_DARE, {
  mutationFn: api.addMonopolyDare,
});
queryClient.setMutationDefaults(EDIT_MONOPOLY_DARE, {
  mutationFn: api.editMonopolyDare,
});
queryClient.setMutationDefaults(DELETE_MONOPOLY_DARE, {
  mutationFn: api.deleteMonopolyDare,
});


queryClient.setQueryDefaults(GET_MONOPOLY_TRIVIAS, {
  queryFn: api.getMonopolyTrivias,
});
queryClient.setQueryDefaults(GET_MONOPOLY_TRIVIA, {
  queryFn: api.getMonopolyTrivia,
});
queryClient.setMutationDefaults(ADD_MONOPOLY_TRIVIA, {
  mutationFn: api.addMonopolyTrivia,
});
queryClient.setMutationDefaults(EDIT_MONOPOLY_TRIVIA, {
  mutationFn: api.editMonopolyTrivia,
});
queryClient.setMutationDefaults(DELETE_MONOPOLY_TRIVIA, {
  mutationFn: api.deleteMonopolyTrivia,
});