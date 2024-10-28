const express = require("express");
const cors = require("cors");
var compression = require("compression");

const app = express();

app.use(cors());
app.use(compression());

app.use(express.static("dist"));

app.get("/api", (req, res) => {
  async function populate() {
    const requestURL =
      "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const nbaData = await response.json();
    res.json({
      games: nbaData.scoreboard.games,
    });
  }
  populate();
});
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
