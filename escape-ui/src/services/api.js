import getAxiosInstance from "./axios";
const connection = getAxiosInstance();

export const api = {
  getAdminScoreBoard: async ({ queryKey }) => {
    try {
      const { roomId } = queryKey[1];
      const { data } = await connection.get(
        `/dashboard/admin/scoreboard/${roomId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  getScoreBoard: async ({ queryKey }) => {
    try {
      const { roomId, gameId } = queryKey[1];
      const { data } = await connection.get(
        `/dashboard/scoreboard/${roomId}${gameId ? `?matchId=${gameId}` : ""}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  getRooms: async () => {
    try {
      const { data } = await connection.get(`/room`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  getRoomByRoomNumber: async ({ queryKey }) => {
    try {
      const { roomNumber } = queryKey[1];
      const { data } = await connection.get(
        `/config/room-by-number/${roomNumber}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  getRoomDetails: async ({ queryKey }) => {
    try {
      const { roomId } = queryKey[1];
      const { data } = await connection.get(`/room/${roomId}`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  addGame: async ({ roomId }) => {
    try {
      const { data } = await connection.post(`/match`, { roomId });
      return data;
    } catch (error) {
      throw error;
    }
  },
  getGameDetails: async ({ queryKey }) => {
    try {
      const { gameId } = queryKey[1];
      const { data } = await connection.get(`/match/${gameId}`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  getRoomLocks: async ({ queryKey }) => {
    try {
      const { roomId } = queryKey[1];
      const { data } = await connection.get(`/room/${roomId}/lock`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  getAdminMonitor: async ({ queryKey }) => {
    try {
      const { roomNumber } = queryKey[1];
      const { data } = await connection.get(`/dashboard/monitor/${roomNumber}`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  useHint: async ({ gameId, riddleId }) => {
    try {
      const { data } = await connection.post(
        `/match/${gameId}/lock/${riddleId}/hint`
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  useSolution: async ({ gameId, riddleId }) => {
    try {
      const { data } = await connection.post(
        `/match/${gameId}/lock/${riddleId}/solution`
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  changeStatus: async ({ gameId, flag }) => {
    try {
      const { data } = await connection.post(`/match/${gameId}/status`, {
        escaped: flag,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  editGame: async ({ gameId, teamName, numberOfPlayers }) => {
    try {
      const { data } = await connection.put(`/match/${gameId}`, {
        teamName,
        numberOfPlayers,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  editRoom: async ({ roomId, editData }) => {
    try {
      const { data } = await connection.put(`/room/${roomId}`, editData);
      return data;
    } catch (error) {
      throw error;
    }
  },
  editHint: async ({ hintId, editData }) => {
    try {
      const { data } = await connection.put(`/lock/${hintId}`, editData);
      return data;
    } catch (error) {
      throw error;
    }
  },
  addHint: async ({ roomId, addData }) => {
    try {
      const { data } = await connection.post(`room/${roomId}/lock`, addData);
      return data;
    } catch (error) {
      throw error;
    }
  },
  deleteHint: async ({ hintId }) => {
    try {
      const { data } = await connection.delete(`lock/${hintId}`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  getHint: async ({ queryKey }) => {
    const { hintId } = queryKey[1];
    try {
      const { data } = await connection.get(`/lock/${hintId}`);
      return data;
    } catch (error) {
      throw error;
    }
  },
};
