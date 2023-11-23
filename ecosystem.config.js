module.exports = {
  apps: [
    {
      name: "escape-server",
      script: "./server/app.js",
    },
    {
      name: "room-and-admin-ui",
      script: "./escape-ui/serve.js"
    },
    {
      name: "monopoly-game-ui",
      script: "./monopoly-ui/serve.js"
    },
  ],
};