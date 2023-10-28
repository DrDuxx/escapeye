
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
export const GET_SCOREBOARD = "GET_SCOREBOARD"



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

queryClient.setMutationDefaults(EDIT_HINT, {
  mutationFn: api.editHint,
});

queryClient.setMutationDefaults(ADD_HINT, {
  mutationFn: api.addHint,
});

queryClient.setMutationDefaults(DELETE_HINT, {
  mutationFn: api.deleteHint,
});