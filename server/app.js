const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const errorHandlingMiddleware = require("./middleware/errorHandling.middleware");
const PORT = process.env.PORT || 8080;
app.use(express.json());
// app.use(morgan("combined"));
app.use(cors());
app.use(express.static(path.join(__dirname,'public')))

require("./routes")(app);

app.get("/", (_, res) => {
  return res.status(200).json({ message: "ok" });
});

app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`Server is active, and listening on port ${PORT}`);
});
