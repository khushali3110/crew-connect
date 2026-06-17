require("dotenv").config();
require("./config/db");

const express = require("express");
const applicationRoutes = require("./routes/applicationRoutes");
const joinTeamRoutes = require("./routes/joinTeamRoutes");
const teamRequestRoutes = require("./routes/teamRequestRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Crew Connect backend is running"
  });
});

app.use("/api/applications", applicationRoutes);
app.use("/api/join-team", joinTeamRoutes);
app.use("/api/team-requests", teamRequestRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
