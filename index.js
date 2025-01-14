const express = require("express"); // Expressを使用
const path = require("path"); // パスを扱う
const app = express(); // Expressインスタンスを作成
const mysql = require('mysql2'); // Node.jsでMySQLを操作するライブラリ

app.use(express.json()); // HTTPリクエストをJSONとして解析して、bodyで利用可能にする
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, console.log("サーバーが開始されました")); // サーバー起動時のメッセージ

// ページの表示
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// データベース接続時の情報
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restful_api'
});

// データベース接続
db.connect(error => {
  if(error) {
    console.log('MySQL接続時にエラーが発生しました。: ', error);
    return;
  }
  console.log('MySQLに接続しました。');
});


// データ
// let formula1_teams = [
//   { id: 1, "team_name": "Mclaren" },
//   { id: 2, "team_name": "Ferrari" },
//   { id: 3, "team_name": "RedBull" },
//   { id: 4, "team_name": "Mercedes" },
//   { id: 5, "team_name": "AstonMartin" },
//   { id: 6, "team_name": "Alpine" },
//   { id: 7, "team_name": "Haas" },
//   { id: 8, "team_name": "VCARB" },
//   { id: 9, "team_name": "Williams" },
//   { id: 10, "team_name": "KickSauber" },
// ];

// 全体データ取得
// app.get("/api/formula1_teams", (req, res) => {
//   res.send(formula1_teams);
// });

app.get('/api/formula1_teams', (req, res) => {
  const query = 'SELECT * FROM formula1;';
  db.query(query, (error, result) => {
    res.send(result);
  });
});

// 個別データ取得
// app.get("/api/formula1_teams/:id", (req, res) => {
//   const team = formula1_teams.find((team) =>
//     team.id === parseInt(req.params.id)
//   );

//   res.send(team);
// });

app.get("/api/formula1_teams/:id", (req, res) => {
  const get_team = req.params.id;
  const query = 'SELECT * FROM formula1 WHERE id = ?;';
  
  db.query(query, [get_team], (error, result) => {
    res.send(result);
  });
});

// 個別データ追加
// app.post("/api/formula1_teams/", (req, res) => {
//   const new_team = {
//     id: formula1_teams.length + 1,
//     team_name: req.body.team_name,
//   };

//   formula1_teams.push(new_team);
//   res.send(formula1_teams);
// });

app.post("/api/formula1_teams/", (req, res) => {
  const post_team = req.body.team_name;
  const query = `INSERT INTO formula1 (team_name) VALUES (?);`;

  db.query(query, [post_team], (error, result) => {
    res.send(result);
  });
});

// 個別データ変更
// app.put("/api/formula1_teams/:id", (req, res) => {
//   const update_team = formula1_teams.find((team) =>
//     team.id === parseInt(req.params.id)
//   );

//   update_team.team_name = req.body.team_name;
//   res.send(update_team);
// });

app.put("/api/formula1_teams/:id", (req, res) => {
  const put_team_name = req.body.team_name;
  const put_team_id = req.params.id;
  const query = 'UPDATE formula1 SET team_name = ? WHERE id = ?;';
  
  db.query(query, [put_team_name, put_team_id], (error, result) => {
    res.send(result);
  });
});

// 個別データ削除
// app.delete("/api/formula1_teams/:id", (req, res) => {
//   const remaining_teams = formula1_teams.filter((team) =>
//     team.id !== parseInt(req.params.id)
//   );

//   formula1_teams = remaining_teams;
//   res.send(remaining_teams);
// });

app.delete("/api/formula1_teams/:id", (req, res) => {
  const delete_team = req.params.id;
  const query = 'DELETE FROM formula1 WHERE id = ?;';

  db.query(query, [delete_team], (error, result) => {
    res.send(result);
  });
});