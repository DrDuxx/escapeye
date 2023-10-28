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
      const scores = await Match.findAll({ where: { roomId },raw: true });
      const sortedScores = scores
        .map((zone)=>({...zone,rawTime: moment(zone?.finishedAt).diff(zone?.startedAt, "seconds")}))
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
            ],
          );
      }
      return res
        .status(200)
        .json(sortedScoresWithRank.slice(0, 10));
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
      const score = room?.time - timeLeft
      await Match.update(
        { escaped, finishedAt: moment().toString(), score },
        { where: { id: matchId } }
      );

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  },
};
