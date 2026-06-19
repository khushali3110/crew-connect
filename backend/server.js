require("dotenv").config();
require("./config/db");

const express = require("express");
const cors = require("cors");
const applicationRoutes = require("./routes/applicationRoutes");
const joinTeamRoutes = require("./routes/joinTeamRoutes");
const teamRequestRoutes = require("./routes/teamRequestRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

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
