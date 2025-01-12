const express = require("express"); // expressを使用
const path = require("path");
const app = express(); // expressを定義
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, console.log("サーバーが開始されました")); // サーバー起動時のメッセージ

// ページの表示
app.get("/", (req, res) => {
  // res.send("サーバー動作中");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// データ
let formula1_teams = [
  { id: 1, "team_name": "Mclaren" },
  { id: 2, "team_name": "Ferrari" },
  { id: 3, "team_name": "RedBull" },
  { id: 4, "team_name": "Mercedes" },
  { id: 5, "team_name": "AstonMartin" },
  { id: 6, "team_name": "Alpine" },
  { id: 7, "team_name": "Haas" },
  { id: 8, "team_name": "VCARB" },
  { id: 9, "team_name": "Williams" },
  { id: 10, "team_name": "KickSauber" },
];

// 全体データ取得
app.get("/api/formula1_teams", (req, res) => {
  res.send(formula1_teams);
});

// 個別データ取得
app.get("/api/formula1_teams/:id", (req, res) => {
  const team = formula1_teams.find((team) =>
    team.id === parseInt(req.params.id)
  );

  res.send(team);
});

// 個別データ追加
app.post("/api/formula1_teams/", (req, res) => {
  const new_team = {
    id: formula1_teams.length + 1,
    team_name: req.body.team_name,
  };

  formula1_teams.push(new_team);
  res.send(formula1_teams);
});

// 個別データ変更
app.put("/api/formula1_teams/:id", (req, res) => {
  const update_team = formula1_teams.find((team) =>
    team.id === parseInt(req.params.id)
  );

  update_team.team_name = req.body.team_name;
  res.send(update_team);
});

// 個別データ削除
app.delete("/api/formula1_teams/:id", (req, res) => {
  const remaining_teams = formula1_teams.filter((team) =>
    team.id !== parseInt(req.params.id)
  );

  formula1_teams = remaining_teams;
  res.send(remaining_teams);
});