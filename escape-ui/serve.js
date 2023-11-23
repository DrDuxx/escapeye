const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static(path.join(__dirname,"build")));

app.get("/**", (_, res) => {
  return res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Escape UI is active, and listening on port ${PORT}`);
});
