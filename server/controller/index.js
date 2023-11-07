const moment = require("moment");
moment.suppressDeprecationWarnings = true;

module.exports = {
  getRoomByRoomNumber: async (req, res, next) => {
    try {
      const { Room } = require("../models");
      const { roomNumber } = req.params;
      const room = await Room.findOne({ where: { number: roomNumber } });
      return res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  },
  getRooms: async (req, res, next) => {
    try {
      const { Room } = require("../models");
      const rooms = await Room.findAll();
      return res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  },
  getRoom: async (req, res, next) => {
    try {
      const { Room } = require("../models");
      const { roomId } = req.params;
      const room = await Room.findOne({ where: { id: roomId } });
      return res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  },
  getRoomLocks: async (req, res, next) => {
    try {
      const { Lock } = require("../models");
      const { roomId } = req.params;
      const locks = await Lock.findAll({
        where: { roomId },
        attributes: ["id", "number"],
      });
      return res.status(200).json(locks);
    } catch (error) {
      next(error);
    }
  },
  addRoomLock: async (req, res, next) => {
    try {
      const { Lock } = require("../models");
      const { roomId } = req.params;
      const lockData = req.body;
      await Lock.create({ ...lockData, roomId });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  addRoom: async (req, res, next) => {
    try {
      const { Room } = require("../models");
      const roomData = req.body;
      await Room.create({ ...roomData });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  editRoom: async (req, res, next) => {
    try {
      const { Room } = require("../models");
      const { roomId } = req.params;
      const roomData = req.body;
      await Room.update({ ...roomData }, { where: { id: roomId } });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  deleteRoom: async (req, res, next) => {
    try {
      const { Room } = require("../models");
      const { roomId } = req.params;
      await Room.destroy({ where: { id: roomId } });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  getLocks: async (req, res, next) => {
    try {
      const { Lock } = require("../models");
      const locks = await Lock.findAll();
      return res.status(200).json(locks);
    } catch (error) {
      next(error);
    }
  },
  getLock: async (req, res, next) => {
    try {
      const { Lock } = require("../models");
      const { lockId } = req.params;
      const lock = await Lock.findOne({ where: { id: lockId } });
      return res.status(200).json(lock);
    } catch (error) {
      next(error);
    }
  },
  addLock: async (req, res, next) => {
    try {
      const { Lock } = require("../models");
      const lockData = req.body;
      await Lock.create({ ...lockData });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  editLock: async (req, res, next) => {
    try {
      const { Lock } = require("../models");
      const { lockId } = req.params;
      const lockData = req.body;
      await Lock.update({ ...lockData }, { where: { id: lockId } });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  deleteLock: async (req, res, next) => {
    try {
      const { Lock } = require("../models");
      const { lockId } = req.params;
      await Lock.destroy({ where: { id: lockId } });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  getMatches: async (req, res, next) => {
    try {
      const { Match } = require("../models");
      const matches = await Match.findAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  },
  getMatch: async (req, res, next) => {
    try {
      const { Match } = require("../models");
      const { matchId } = req.params;
      const match = await Match.findOne({ where: { id: matchId } });
      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  },
  addMatch: async (req, res, next) => {
    try {
      const { Match } = require("../models");
      const matchData = req.body;
      const startedAt = moment().toString();
      const match = await Match.create({ ...matchData, startedAt });
      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  },
  editMatch: async (req, res, next) => {
    try {
      const { Match } = require("../models");
      const { matchId } = req.params;
      const matchData = req.body;
      await Match.update({ ...matchData }, { where: { id: matchId } });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  deleteMatch: async (req, res, next) => {
    try {
      const { Match } = require("../models");
      const { matchId } = req.params;
      await Match.destroy({ where: { id: matchId } });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  endMatch: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
  getScoreBoard: async (req, res, next) => {
    try {
      const { Match } = require("../models");
      const { roomId } = req.params;
      const { matchId } = req.query;
      const scores = await Match.findAll({ where: { roomId }, raw: true });
      const sortedScores = scores
        .map((zone) => ({
          ...zone,
          rawTime: moment(zone?.finishedAt).diff(zone?.startedAt, "seconds"),
        }))
        .sort((a, b) => (a.score < b.score ? -1 : 1))
        .sort((a, b) => (a.rawTime < b.rawTime ? -1 : 1));
      const sortedScoresWithRank = sortedScores.map((zone, i) => ({
        score: zone?.score,
        numberOfPlayers: zone?.numberOfPlayers,
        date: zone?.createdAt,
        rawTime: moment(zone?.finishedAt).diff(zone?.startedAt, "seconds"),
        hintsUsed: zone?.hintsUsed?.length,
        solutionsUsed: zone?.solutionsUsed?.length,
        teamName: zone?.teamName,
        escaped: zone?.escaped,
        rank: i + 1,
      }));
      let matchIndex = -1;
      if (matchId) {
        matchIndex = sortedScoresWithRank
          ?.map((zone) => zone.id)
          .indexOf(matchId);
      }
      if (matchIndex !== -1 && matchIndex >= 10) {
        return res
          .status(200)
          .json([
            ...sortedScoresWithRank.slice(0, 10),
            sortedScoresWithRank[matchIndex],
          ]);
      }
      return res.status(200).json(sortedScoresWithRank.slice(0, 10));
    } catch (error) {
      next(error);
    }
  },
  getAdminScoreBoard: async (req, res, next) => {
    try {
      const { Match } = require("../models");
      const { roomId } = req.params;
      const scores = await Match.findAll({ where: { roomId }, raw: true });
      const sortedScores = scores
        .map((zone) => ({
          ...zone,
          rawTime: moment(zone?.finishedAt).diff(zone?.startedAt, "seconds"),
        }))
        .sort((a, b) => (a.score < b.score ? -1 : 1))
        .sort((a, b) => (a.rawTime < b.rawTime ? -1 : 1));
      const sortedScoresWithRank = sortedScores.map((zone, i) => ({
        score: zone?.score,
        numberOfPlayers: zone?.numberOfPlayers,
        date: zone?.createdAt,
        rawTime: moment(zone?.finishedAt).diff(zone?.startedAt, "seconds"),
        hintsUsed: zone?.hintsUsed?.length,
        solutionsUsed: zone?.solutionsUsed?.length,
        teamName: zone?.teamName,
        escaped: zone?.escaped,
        rank: i + 1,
      }));
      return res.status(200).json(sortedScoresWithRank);
    } catch (error) {
      next(error);
    }
  },
  getDashboardData: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
  getMonitorData: async (req, res, next) => {
    try {
      const { Room, Match, Lock } = require("../models");
      const { roomNumber } = req.params;
      const room = await Room.findOne({ where: { number: roomNumber } });
      const match = await Match.findOne({
        where: { roomId: room.id, escaped: null },
      });
      let hints = [];
      let solutions = [];
      if (match?.hintsUsed?.length > 0) {
        hints = await Lock.findAll({ where: { id: match.hintsUsed } });
      }
      if (match?.solutionsUsed?.length > 0) {
        solutions = await Lock.findAll({ where: { id: match.solutionsUsed } });
      }
      return res.status(200).json({ room, match, hints, solutions });
    } catch (error) {
      next(error);
    }
  },
  useLockHint: async (req, res, next) => {
    try {
      const { Match, Lock } = require("../models");
      const { matchId, lockId } = req.params;
      const lock = await Lock.findOne({ where: { id: lockId } });
      const match = await Match.findOne({ where: { id: matchId } });
      if (!match.hintsUsed.includes(lock.id)) {
        match.hintsUsed = [...match.hintsUsed, lock.id];
        await match.save();
      }
      return res.status(200).json({ hint: lock.hint, match });
    } catch (error) {
      next(error);
    }
  },
  useLockSolution: async (req, res, next) => {
    try {
      const { Match, Lock } = require("../models");
      const { matchId, lockId } = req.params;
      const lock = await Lock.findOne({ where: { id: lockId } });
      const match = await Match.findOne({ where: { id: matchId } });
      if (!match.solutionsUsed.includes(lock.id)) {
        match.solutionsUsed = [...match.solutionsUsed, lock.id];
        await match.save();
      }
      return res.status(200).json({ solution: lock.solution, match });
    } catch (error) {
      next(error);
    }
  },
  changeStatus: async (req, res, next) => {
    try {
      const { Match, Room } = require("../models");
      const { matchId } = req.params;
      const { escaped } = req.body;

      const match = await Match.findOne({
        where: {
          id: matchId,
        },
      });
      const room = await Room.findOne({
        where: {
          id: match.roomId,
        },
      });

      const diff = moment().diff(match?.startedAt, "seconds");
      const safeTimeRemaining = room?.time - diff;
      const notFreeHints = match?.hintsUsed?.length - room?.freeHintsNumber;
      const hintPenaltyTotal =
        notFreeHints > 0 ? notFreeHints * room?.hintPenalty : 0;
      const freeHintsUsed =
        notFreeHints > 0
          ? [...match?.hintsUsed?.slice(0, room?.freeHintsNumber)]
          : [...match?.hintsUsed];
      let notFreeHintsSolutions = 0;
      match?.solutionsUsed.map((solution) => {
        if (!freeHintsUsed.includes(solution)) {
          notFreeHintsSolutions++;
        }
        return solution;
      });
      const freeHintsSolutions =
        match?.solutionsUsed?.length - notFreeHintsSolutions;
      const freeHintsSolutionsPenaltyTotal =
        freeHintsSolutions * room?.freeSolutionPenalty;
      const notFreeHintsSolutionsPenaltyTotal =
        notFreeHintsSolutions * room?.solutionPenalty;
      const soltuionsPenaltyTotal =
        freeHintsSolutionsPenaltyTotal + notFreeHintsSolutionsPenaltyTotal;

      const timeLeft =
        safeTimeRemaining - hintPenaltyTotal - soltuionsPenaltyTotal;
      const score = room?.time - timeLeft;
      await Match.update(
        { escaped, finishedAt: moment().toString(), score },
        { where: { id: matchId } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  getMonopolyGame: async (req, res, next) => {
    try {
      const { MonopolyGame, MonopolySetting } = require("../models");
      const game = await MonopolyGame.findOne({ where: { isRunning: true } });
      if (!game) {
        return res.status(200).json({ message: "no running game" });
      }
      const colors = await MonopolySetting.findOne({
        where: { option_name: "colors" },
        raw: true,
      });
      let remainingColors = { ...colors.option_value.data };
      game.colors?.map((zone) => {
        --remainingColors[zone.hex];
      });
      const settings = await MonopolySetting.findAll();
      return res.status(200).json({ game, settings, colors: remainingColors });
    } catch (error) {
      next(error);
    }
  },
  generateMonopolyGame: async (req, res, next) => {
    try {
      const { MonopolyGame, MonopolySetting } = require("../models");
      const { time, players } = req.body;
      const startingAmount = await MonopolySetting.findOne({
        where: { option_name: "starting_amount" },
      });
      const transactions = players.map((zone) => {
        return {
          sign: "Credit",
          amount: +startingAmount.option_value.data,
          player: zone.index,
        };
      });

      const startedAt = moment().toString();
      await MonopolyGame.create({
        players,
        transactions,
        startedAt,
        time: time * 60,
        colors: [],
        chances: [],
        trivias: [],
        triviaSessions: [],
        triviaCategoryMode: false,
        isRunning: true,
      });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  getMonopolySettings: async (req, res, next) => {
    try {
      const { MonopolySetting } = require("../models");
      const settings = await MonopolySetting.findAll();
      return res.status(200).json({ settings });
    } catch (error) {
      next(error);
    }
  },
  editMonopolySettings: async (req, res, next) => {
    try {
      const { MonopolySetting } = require("../models");
      const {
        starting_amount,
        trivia_question_answered_amount,
        trivia_questions,
      } = req.body;
      await MonopolySetting.update(
        { option_value: { data: +starting_amount } },
        { where: { option_name: "starting_amount" } }
      );
      await MonopolySetting.update(
        { option_value: { data: +trivia_question_answered_amount } },
        { where: { option_name: "trivia_question_answered_amount" } }
      );
      await MonopolySetting.update(
        { option_value: { data: +trivia_questions } },
        { where: { option_name: "trivia_questions" } }
      );
      return res.status(200).json({ message:'ok' });
    } catch (error) {
      next(error);
    }
  },
  editMonopolyFees: async (req, res, next) => {
    try {
      const { MonopolySetting } = require("../models");
      const {
        baalback_fee,
        bosta_fee,
        daman_fee,
        go_bonus,
      } = req.body;
      await MonopolySetting.update(
        { option_value: { data: +baalback_fee } },
        { where: { option_name: "baalback_fee" } }
      );
      await MonopolySetting.update(
        { option_value: { data: +bosta_fee } },
        { where: { option_name: "bosta_fee" } }
      );
      await MonopolySetting.update(
        { option_value: { data: +daman_fee } },
        { where: { option_name: "daman_fee" } }
      );
      await MonopolySetting.update(
        { option_value: { data: +go_bonus } },
        { where: { option_name: "go_bonus" } }
      );
      return res.status(200).json({ message:'ok' });
    } catch (error) {
      next(error);
    }
  },
  editMonopolyColors: async (req, res, next) => {
    try {
      const { MonopolySetting } = require("../models");
      const {
        colors,
      } = req.body;
      await MonopolySetting.update(
        { option_value: { data: colors } },
        { where: { option_name: "colors" } }
      );
      return res.status(200).json({ message:'ok' });
    } catch (error) {
      next(error);
    }
  },
  editMonopolyLocations: async (req, res, next) => {
    try {
      const { MonopolySetting } = require("../models");
      const {
        locations,
      } = req.body;
      await MonopolySetting.update(
        { option_value: { data: locations } },
        { where: { option_name: "locations" } }
      );
      return res.status(200).json({ message:'ok' });
    } catch (error) {
      next(error);
    }
  },
  seedMonopolySettings: async (req, res, next) => {
    try {
      const { MonopolySetting } = require("../models");
      const settings = await MonopolySetting.findAll({ raw: true });

      const settingsConfig = require("../seed/monopolySettings.seed.json");
      await MonopolySetting.bulkCreate(
        settingsConfig.filter(
          (zone) =>
            !settings.map((zone) => zone.option_name).includes(zone.option_name)
        )
      );
      return res.status(200).json({
        data: settingsConfig.filter(
          (zone) =>
            !settings.map((zone) => zone.option_name).includes(zone.option_name)
        ),
      });
    } catch (error) {
      next(error);
    }
  },
  generateTransaction: async (req, res, next) => {
    try {
      const { MonopolyGame } = require("../models");
      const { sign, amount, player } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });
      const newTransaction = {
        sign,
        player: +player,
        amount: +amount,
      };

      await MonopolyGame.update(
        { transactions: [...game.transactions, newTransaction] },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  mortageColor: async (req, res, next) => {
    try {
      const { MonopolyGame } = require("../models");
      const { player, hex } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      if (
        game.colors.filter((zone) => {
          return zone.hex === hex && zone.player === player && !zone.isMortage;
        }).length < 1
      ) {
        return res
          .status(200)
          .json({ message: "this player doesnt own any color with this hex" });
      }
      let alreadyMortaged = false;
      const newColors = game.colors.map((zone) => {
        if (
          zone.hex === hex &&
          zone.player === player &&
          !zone.isMortage &&
          !alreadyMortaged
        ) {
          alreadyMortaged = true;
          return { ...zone, isMortage: true };
        }
        return zone;
      });

      await MonopolyGame.update(
        { colors: [...newColors] },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  unmortageColor: async (req, res, next) => {
    try {
      const { MonopolyGame } = require("../models");
      const { player, hex } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      if (
        game.colors.filter((zone) => {
          return zone.hex === hex && zone.player === player && zone.isMortage;
        }).length < 1
      ) {
        return res
          .status(200)
          .json({ message: "no mortage for this player with this hex" });
      }

      let alreadyUnmortaged = false;
      const newColors = game.colors.map((zone) => {
        if (
          zone.hex === hex &&
          zone.player === player &&
          zone.isMortage &&
          !alreadyUnmortaged
        ) {
          alreadyUnmortaged = true;
          return { ...zone, isMortage: false };
        }
        return zone;
      });

      await MonopolyGame.update(
        { colors: [...newColors] },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  getGameChance: async (req, res, next) => {
    try {
      const { MonopolyGame, Chance } = require("../models");
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      const chances = await Chance.findAll({ raw: true });

      const chancesLeft = [
        ...chances.filter(
          (zone) =>
            !game.chances.filter((zone2) => zone2.id === zone.id).length > 0
        ),
      ];
      const chancesUsed = [...game.chances];

      if (chancesLeft.length > 0) {
        chancesUsed.push({
          id: chancesLeft[Math.floor(Math.random() * chancesLeft.length)].id,
          isDismissed: false,
        });
      } else {
        const [newChance] = chancesUsed.splice(0, 1);
        chancesUsed.push({
          id: newChance.id,
          isDismissed: false,
        });
      }

      await MonopolyGame.update(
        { chances: chancesUsed },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  dismissChance: async (req, res, next) => {
    try {
      const { MonopolyGame } = require("../models");
      const { chanceId } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      let chancesUsed = [...game.chances];
      if (
        chancesUsed.filter((zone) => zone.id === chanceId && !zone.isDismissed)
          .length < 1
      ) {
        return res
          .status(200)
          .json({ message: "chance doesn't exist or already been dismissed" });
      }

      chancesUsed = chancesUsed.map((zone) => {
        if (zone.id === chanceId && !zone.isDismissed) {
          return {
            ...zone,
            isDismissed: true,
          };
        }
        return zone;
      });

      await MonopolyGame.update(
        { chances: chancesUsed },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  generateTriviaSession: async (req, res, next) => {
    try {
      const { MonopolyGame, Trivia } = require("../models");
      const crypto = require("crypto");
      const { category, player } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      let triviaSessionsUsed = [...game.triviaSessions];
      triviaSessionsUsed.push({
        player,
        category,
        isOpen: true,
        questions: 1,
        correctAnswers: 0,
        id: crypto.randomUUID(),
      });

      const trivias = await Trivia.findAll({ where: { category }, raw: true });

      const triviasLeft = [
        ...trivias.filter(
          (zone) =>
            !game.trivias.filter((zone2) => zone2.id === zone.id).length > 0
        ),
      ];
      const triviasUsed = [...game.trivias];

      if (triviasLeft.length > 0) {
        triviasUsed.push({
          id: triviasLeft[Math.floor(Math.random() * triviasLeft.length)].id,
          isAnswered: false,
          isDismissed: false,
          category,
        });
      } else {
        const [newTrivia] = triviasUsed
          .filter((zone) => zone.category === category)
          .splice(0, 1);
        triviasUsed.push({
          id: newTrivia.id,
          isAnswered: false,
          isDismissed: false,
          category,
        });
      }

      await MonopolyGame.update(
        {
          triviaSessions: triviaSessionsUsed,
          triviaCategoryMode: false,
          trivias: triviasUsed,
        },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  setTriviaCategoryMode: async (req, res, next) => {
    try {
      const { MonopolyGame } = require("../models");
      const { mode } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      await MonopolyGame.update(
        { triviaCategoryMode: mode },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  setBostaMode: async (req, res, next) => {
    try {
      const { MonopolyGame } = require("../models");
      const { mode } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      await MonopolyGame.update(
        { bostaMode: mode },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  getGameTrivia: async (req, res, next) => {
    try {
      const { MonopolyGame, Trivia } = require("../models");
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      let triviaSessions = [...game?.triviaSessions];
      let category = triviaSessions
        .filter((zone) => zone.isOpen)
        .pop().category;
      const trivias = await Trivia.findAll({ where: { category }, raw: true });

      const triviasLeft = [
        ...trivias.filter(
          (zone) =>
            !game.trivias.filter((zone2) => zone2.id === zone.id).length > 0
        ),
      ];
      const triviasUsed = [...game.trivias];

      if (triviasLeft.length > 0) {
        triviasUsed.push({
          id: triviasLeft[Math.floor(Math.random() * triviasLeft.length)].id,
          isAnswered: false,
          isDismissed: false,
          category,
        });
      } else {
        const [newTrivia] = triviasUsed
          .filter((zone) => zone.category === category)
          .splice(0, 1);
        triviasUsed.push({
          id: newTrivia.id,
          isAnswered: false,
          isDismissed: false,
          category,
        });
      }

      await MonopolyGame.update(
        { trivias: triviasUsed },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  answerTrivia: async (req, res, next) => {
    try {
      const { MonopolyGame } = require("../models");
      const { triviaId, correct } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      let triviasUsed = [...game.trivias];
      let triviaSessions = [...game.triviaSessions];
      if (
        triviasUsed.filter((zone) => zone.id === triviaId && !zone.isAnswered)
          .length < 1
      ) {
        return res
          .status(200)
          .json({ message: "trivia doesn't exist or already been opened" });
      }

      triviasUsed = triviasUsed.map((zone) => {
        if (zone.id === triviaId && !zone.isAnswered) {
          return {
            ...zone,
            isAnswered: true,
          };
        }
        return zone;
      });

      triviaSessions[triviaSessions.length - 1] = {
        ...triviaSessions[triviaSessions.length - 1],
        correctAnswers: correct
          ? triviaSessions[triviaSessions.length - 1].correctAnswers + 1
          : triviaSessions[triviaSessions.length - 1].correctAnswers,
      };

      await MonopolyGame.update(
        { trivias: triviasUsed, triviaSessions },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  dismissTrivia: async (req, res, next) => {
    try {
      const { MonopolyGame, MonopolySetting } = require("../models");
      const { triviaId } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      let triviasUsed = [...game.trivias];
      let triviaSessions = [...game.triviaSessions];
      if (
        triviasUsed.filter((zone) => zone.id === triviaId && !zone.isDismissed)
          .length < 1
      ) {
        return res
          .status(200)
          .json({ message: "trivia doesn't exist or already been dismissed" });
      }

      triviasUsed = triviasUsed.map((zone) => {
        if (zone.id === triviaId && !zone.isDismissed) {
          return {
            ...zone,
            isDismissed: true,
          };
        }
        return zone;
      });

      const lastTriviaSession = triviaSessions[triviaSessions.length - 1];
      triviaSessions[triviaSessions.length - 1] = {
        ...lastTriviaSession,
        isOpen: false,
      };
      const triviaCorrectAnswerAmount = await MonopolySetting.findOne({
        where: { option_name: "trivia_question_answered_amount" },
        raw: true,
      });
      const newTransaction = {
        sign: "Credit",
        player: +lastTriviaSession.player,
        amount:
          triviaCorrectAnswerAmount.option_value.data *
          lastTriviaSession.correctAnswers,
      };

      await MonopolyGame.update(
        {
          trivias: triviasUsed,
          triviaSessions,
          transactions: [...game.transactions, newTransaction],
        },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  nextTrivia: async (req, res, next) => {
    try {
      const { MonopolyGame, Trivia } = require("../models");
      const { triviaId } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      let triviaSessions = [...game?.triviaSessions];
      let category = triviaSessions
        .filter((zone) => zone.isOpen)
        .pop().category;

      const trivias = await Trivia.findAll({ where: { category }, raw: true });

      const triviasLeft = [
        ...trivias.filter(
          (zone) =>
            !game.trivias.filter((zone2) => zone2.id === zone.id).length > 0
        ),
      ];
      let triviasUsed = [...game.trivias];

      if (
        triviasUsed.filter((zone) => zone.id === triviaId && !zone.isDismissed)
          .length < 1
      ) {
        return res
          .status(200)
          .json({ message: "trivia doesn't exist or already been dismissed" });
      }

      if (triviasLeft.length > 0) {
        triviasUsed.push({
          id: triviasLeft[Math.floor(Math.random() * triviasLeft.length)].id,
          isAnswered: false,
          isDismissed: false,
          category,
        });
      } else {
        const [newTrivia] = triviasUsed
          .filter((zone) => zone.category === category)
          .splice(0, 1);
        triviasUsed.push({
          id: newTrivia.id,
          isAnswered: false,
          isDismissed: false,
          category,
        });
      }

      triviaSessions[triviaSessions.length - 1] = {
        ...triviaSessions[triviaSessions.length - 1],
        questions: triviaSessions[triviaSessions.length - 1].questions + 1,
      };

      await MonopolyGame.update(
        { trivias: triviasUsed, triviaSessions },
        { where: { id: game.id } }
      );

      triviasUsed = triviasUsed.map((zone) => {
        if (zone.id === triviaId && !zone.isDismissed && zone.isAnswered) {
          return {
            ...zone,
            isDismissed: true,
          };
        }
        return zone;
      });

      await MonopolyGame.update(
        { trivias: triviasUsed },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  extendTime: async (req, res, next) => {
    try {
      const { MonopolyGame } = require("../models");
      const { time } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      const newTime = game.time + (+time * 60);
      await MonopolyGame.update({ time: newTime }, { where: { id: game.id } });

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  updateWinner: async (req, res, next) => {
    try {
      const { MonopolyGame } = require("../models");
      const { winner } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      await MonopolyGame.update({ winner }, { where: { id: game.id } });

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  stopGame: async (req, res, next) => {
    try {
      const { MonopolyGame } = require("../models");
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      await MonopolyGame.update(
        { isRunning: false },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  assignColor: async (req, res, next) => {
    try {
      const { MonopolyGame, MonopolySetting } = require("../models");
      const { hex, player, direction } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      const colors = await MonopolySetting.findOne({
        where: { option_name: "colors" },
        raw: true,
      });
      let remainingColors = { ...colors.option_value.data };
      game.colors?.map((zone) => {
        --remainingColors[zone.hex];
      });

      if (remainingColors[hex] < 1 && direction === "add") {
        return res.status(200).json({ message: "No more available" });
      }

      let usedColors = [...game.colors];
      if (direction === "delete") {
        let index = -1;
        usedColors.map((zone, i) => {
          if (zone.hex === hex && zone.player === player && !zone.isMortage) {
            index = i;
          }
          return zone;
        });
        if (index === -1) {
          return res
            .status(200)
            .json({
              message: "Player doesn't own this color or isMortage true",
            });
        }
        usedColors.splice(index, 1);
      } else {
        usedColors.push({
          hex,
          player: +player,
          isMortage: false,
        });
      }

      await MonopolyGame.update(
        { colors: usedColors },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  getChance: async (req, res, next) => {
    try {
      const { Chance } = require("../models");
      const { chanceId } = req.params;
      const chance = await Chance.findOne({ where: { id: chanceId } });
      return res.status(200).json({ chance });
    } catch (error) {
      next(error);
    }
  },
  getChances: async (req, res, next) => {
    try {
      const { Chance } = require("../models");
      const chances = await Chance.findAll();
      return res.status(200).json({ chances });
    } catch (error) {
      next(error);
    }
  },
  addChance: async (req, res, next) => {
    try {
      const { Chance } = require("../models");
      const chanceData = req.body;
      await Chance.create({ ...chanceData });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  editChance: async (req, res, next) => {
    try {
      const { Chance } = require("../models");
      const { chanceId } = req.params;
      const chanceData = req.body;
      await Chance.update({ ...chanceData }, { where: { id: chanceId } });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  deleteChance: async (req, res, next) => {
    try {
      const { Chance } = require("../models");
      const { chanceId } = req.params;
      await Chance.destroy({ where: { id: chanceId } });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  getTrivia: async (req, res, next) => {
    try {
      const { Trivia } = require("../models");
      const { triviaId } = req.params;
      const trivia = await Trivia.findOne({ where: { id: triviaId } });
      return res.status(200).json({ trivia });
    } catch (error) {
      next(error);
    }
  },
  getTrivias: async (req, res, next) => {
    try {
      const { Trivia } = require("../models");
      const trivias = await Trivia.findAll();
      return res.status(200).json({ trivias });
    } catch (error) {
      next(error);
    }
  },
  addTrivia: async (req, res, next) => {
    try {
      const { Trivia } = require("../models");
      const triviaData = req.body;
      await Trivia.create({ ...triviaData });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  editTrivia: async (req, res, next) => {
    try {
      const { Trivia } = require("../models");
      const { triviaId } = req.params;
      const triviaData = req.body;
      await Trivia.update({ ...triviaData }, { where: { id: triviaId } });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  deleteTrivia: async (req, res, next) => {
    try {
      const { Trivia } = require("../models");
      const { triviaId } = req.params;
      await Trivia.destroy({ where: { id: triviaId } });
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
  exchangeColor: async (req, res, next) => {
    try {
      const { MonopolyGame } = require("../models");
      const { hex, fromPlayer, toPlayer } = req.body;
      const game = await MonopolyGame.findOne({
        where: { isRunning: true },
        raw: true,
      });
      if (!game) return res.status(200).json({ message: "no running game" });

      let exchanged = false;
      let usedColors = game.colors?.map((zone, i) => {
        if (
          zone.hex === hex &&
          zone.player === fromPlayer &&
          !zone.isMortage &&
          !exchanged
        ) {
          exchanged = true;
          return { ...zone, player: toPlayer };
        }
        return zone;
      });

      await MonopolyGame.update(
        { colors: usedColors },
        { where: { id: game.id } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
};
