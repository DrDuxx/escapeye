import getAxiosInstance from "./axios";
const connection = getAxiosInstance();

export const api = {
  generateGame: async ({ time, players }) => {
    try {
      const { data } = await connection.post(`/monopoly/game`, {
        time,
        players,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  getGame: async () => {
    try {
      const { data } = await connection.get(`/monopoly/game`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  generateTransaction: async ({ sign, player, amount }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/transaction`, {
        sign,
        player,
        amount,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  assignColor: async ({ hex, player, direction }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/color`, {
        hex,
        player,
        direction,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  exchangeColor: async ({ hex, fromPlayer, toPlayer }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/color/exchange`, {
        hex,
        fromPlayer,
        toPlayer,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  extendTime: async ({ time }) => {
    try {
      const { data } = await connection.put(`/monopoly/game`, { time });
      return data;
    } catch (error) {
      throw error;
    }
  },
  stopGame: async () => {
    try {
      const { data } = await connection.post(`/monopoly/game/stop`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  mortageColor: async ({ player, hex }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/mortage`, {
        player,
        hex,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  unmortageColor: async ({ player, hex }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/unmortage`, {
        player,
        hex,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  getChance: async ({ queryKey }) => {
    try {
      const { chanceId } = queryKey[1];
      const { data } = await connection.get(
        `/monopoly/setting/chance/${chanceId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  useChance: async () => {
    try {
      const { data } = await connection.get(`/monopoly/game/chance`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  dismissChance: async ({ chanceId }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/chance/dismiss`, {
        chanceId,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  useTrivia: async () => {
    try {
      const { data } = await connection.get(`/monopoly/game/trivia`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  getTrivia: async ({ queryKey }) => {
    try {
      const { triviaId } = queryKey[1];
      const { data } = await connection.get(
        `/monopoly/setting/trivia/${triviaId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  answerTrivia: async ({ triviaId, correct }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/trivia/answer`, {
        triviaId,correct
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  dismissTrivia: async ({ triviaId }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/trivia/dismiss`, {
        triviaId,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  nextTrivia: async ({ triviaId }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/trivia/next`, {
        triviaId,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  generateTriviaSession: async ({ player, category }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/trivia/session`, {
        player,
        category,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  setTriviaCategoryMode: async ({ mode }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/trivia/category-mode`, {
        mode
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  updateWinner: async ({ winner }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/winner`, {
        winner
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  setBostaMode: async ({ mode }) => {
    try {
      const { data } = await connection.post(`/monopoly/game/bosta-mode`, {
        mode
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};
