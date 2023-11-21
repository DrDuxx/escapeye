const asyncWrapper = require("../middleware/asyncWrapper.middleware");
const controller = require("../controller");

module.exports = (app) => {
  const RoomRouter = require("express").Router();
  RoomRouter.get("/", asyncWrapper(controller.getRooms));
  RoomRouter.get("/:roomId", asyncWrapper(controller.getRoom));
  RoomRouter.get("/:roomId/lock", asyncWrapper(controller.getRoomLocks));
  RoomRouter.post("/:roomId/lock", asyncWrapper(controller.addRoomLock));
  RoomRouter.post("/", asyncWrapper(controller.addRoom));
  RoomRouter.put("/:roomId", asyncWrapper(controller.editRoom));
  RoomRouter.delete("/:roomId", asyncWrapper(controller.deleteRoom));

  const LockRouter = require("express").Router();
  LockRouter.get("/", asyncWrapper(controller.getLocks));
  LockRouter.get("/:lockId", asyncWrapper(controller.getLock));
  LockRouter.post("/", asyncWrapper(controller.addLock));
  LockRouter.put("/:lockId", asyncWrapper(controller.editLock));
  LockRouter.delete("/:lockId", asyncWrapper(controller.deleteLock));

  const MatchRouter = require("express").Router();
  MatchRouter.get("/", asyncWrapper(controller.getMatches));
  MatchRouter.post("/", asyncWrapper(controller.addMatch));
  MatchRouter.get("/:matchId", asyncWrapper(controller.getMatch));
  MatchRouter.put("/:matchId", asyncWrapper(controller.editMatch));
  MatchRouter.post("/:matchId/lock/:lockId/hint", asyncWrapper(controller.useLockHint));
  MatchRouter.post("/:matchId/lock/:lockId/solution", asyncWrapper(controller.useLockSolution));
  MatchRouter.delete("/:matchId", asyncWrapper(controller.deleteMatch));
  MatchRouter.post("/:matchId/status", asyncWrapper(controller.changeStatus));
  MatchRouter.post("/", asyncWrapper(controller.endMatch));

  const MonopolyGameRouter = require('express').Router();
  MonopolyGameRouter.get('/game', asyncWrapper(controller.getMonopolyGame));
  MonopolyGameRouter.put('/game', asyncWrapper(controller.extendTime));
  MonopolyGameRouter.post('/game', asyncWrapper(controller.generateMonopolyGame));
  MonopolyGameRouter.post('/game/winner', asyncWrapper(controller.updateWinner));
  MonopolyGameRouter.post('/game/stop', asyncWrapper(controller.stopGame));
  MonopolyGameRouter.post('/game/transaction', asyncWrapper(controller.generateTransaction));
  MonopolyGameRouter.post('/game/mortage', asyncWrapper(controller.mortageColor));
  MonopolyGameRouter.post('/game/unmortage', asyncWrapper(controller.unmortageColor));
  MonopolyGameRouter.get('/game/chance', asyncWrapper(controller.getGameChance));
  MonopolyGameRouter.post('/game/chance/dismiss', asyncWrapper(controller.dismissChance));
  MonopolyGameRouter.get('/game/dare', asyncWrapper(controller.getGameDare));
  MonopolyGameRouter.post('/game/dare/dismiss', asyncWrapper(controller.dismissDare));
  MonopolyGameRouter.post('/game/bosta-mode', asyncWrapper(controller.setBostaMode));
  MonopolyGameRouter.get('/game/trivia', asyncWrapper(controller.getGameTrivia));
  MonopolyGameRouter.post('/game/trivia/session', asyncWrapper(controller.generateTriviaSession));
  MonopolyGameRouter.post('/game/trivia/category-mode', asyncWrapper(controller.setTriviaCategoryMode));
  MonopolyGameRouter.post('/game/trivia/answer', asyncWrapper(controller.answerTrivia));
  MonopolyGameRouter.post('/game/trivia/next', asyncWrapper(controller.nextTrivia));
  MonopolyGameRouter.post('/game/trivia/dismiss', asyncWrapper(controller.dismissTrivia));
  MonopolyGameRouter.post('/game/color', asyncWrapper(controller.assignColor));
  MonopolyGameRouter.post('/game/color/exchange', asyncWrapper(controller.exchangeColor));
  MonopolyGameRouter.get('/setting', asyncWrapper(controller.getMonopolySettings));
  MonopolyGameRouter.put('/setting', asyncWrapper(controller.editMonopolySettings));
  MonopolyGameRouter.put('/setting/colors', asyncWrapper(controller.editMonopolyColors));
  MonopolyGameRouter.put('/setting/locations', asyncWrapper(controller.editMonopolyLocations));
  MonopolyGameRouter.put('/setting/fees', asyncWrapper(controller.editMonopolyFees));
  MonopolyGameRouter.get('/setting/chance', asyncWrapper(controller.getChances));
  MonopolyGameRouter.get('/setting/chance/:chanceId', asyncWrapper(controller.getChance));
  MonopolyGameRouter.post('/setting/chance', asyncWrapper(controller.addChance));
  MonopolyGameRouter.put('/setting/chance/:chanceId', asyncWrapper(controller.editChance));
  MonopolyGameRouter.delete('/setting/chance/:chanceId', asyncWrapper(controller.deleteChance));
  MonopolyGameRouter.get('/setting/dare', asyncWrapper(controller.getDares));
  MonopolyGameRouter.get('/setting/dare/:dareId', asyncWrapper(controller.getDare));
  MonopolyGameRouter.post('/setting/dare', asyncWrapper(controller.addDare));
  MonopolyGameRouter.put('/setting/dare/:dareId', asyncWrapper(controller.editDare));
  MonopolyGameRouter.delete('/setting/dare/:dareId', asyncWrapper(controller.deleteDare));
  MonopolyGameRouter.get('/setting/trivia', asyncWrapper(controller.getTrivias));
  MonopolyGameRouter.get('/setting/trivia/:triviaId', asyncWrapper(controller.getTrivia));
  MonopolyGameRouter.post('/setting/trivia', asyncWrapper(controller.addTrivia));
  MonopolyGameRouter.put('/setting/trivia/:triviaId', asyncWrapper(controller.editTrivia));
  MonopolyGameRouter.delete('/setting/trivia/:triviaId', asyncWrapper(controller.deleteTrivia));
  MonopolyGameRouter.get('/setting/seed', asyncWrapper(controller.seedMonopolySettings));

  const DashboardRouter = require("express").Router();
  DashboardRouter.get("/", asyncWrapper(controller.getDashboardData));
  DashboardRouter.get("/scoreboard/:roomId", asyncWrapper(controller.getScoreBoard));
  DashboardRouter.get("/admin/scoreboard/:roomId", asyncWrapper(controller.getAdminScoreBoard));
  DashboardRouter.get("/monitor/:roomNumber", asyncWrapper(controller.getMonitorData));
  
  const ConfigRouter = require("express").Router();
  ConfigRouter.get('/room-by-number/:roomNumber', asyncWrapper(controller.getRoomByRoomNumber))

  app.use("/room", RoomRouter);
  app.use("/lock", LockRouter);
  app.use("/match", MatchRouter);
  app.use("/monopoly", MonopolyGameRouter);
  app.use("/dashboard", DashboardRouter);
  app.use("/config", ConfigRouter);
};
