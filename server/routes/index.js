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
  app.use("/dashboard", DashboardRouter);
  app.use("/config", ConfigRouter);
};
