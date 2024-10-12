import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv"


const app = express()
const port = 3000
// let users = [
//   {
//     id: 1,
//     username: "admin",
//     password: "bala"
//   },
//   {
//     id: 2,
//     username: "second admin",
//     password: "kante"
//   }
// ]
env.config()
let users = []
let notes = ["first post", "second post", "third post"]
let currentID = 3
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
    required: true
  },
});

//middleware
app.use(cors())
app.use(bodyParser.json())
db.connect()


app.get("/", async (req, res) => {
  const response = await db.query("Select * from users");
  const result = response.rows
  console.log(result)
  users = result
  console.log("A login was triggered")
  res.json(users)
})

app.get("/notes/:username", async (req, res) => {
  const {username} = req.params
  // console.log(req.params)
  const response = await db.query("select * from notes where username=$1 order by id asc", [username])
  const result = response.rows
  // console.log(result)
  res.json(result)
})

app.post("/register", async (req, res) => {
  // console.log(req.body)
  try {
    const {username: newUsername, password: newPassword} = req.body;
    const checkUser = await db.query("select * from users where username=$1", [newUsername])
    // console.log(checkUser.rows)
    if (checkUser.rows.length === 0) {
      currentID++;
      await db.query("insert into users (username, password) values ($1, $2)", [newUsername, newPassword])
      res.sendStatus(201)
    } else {
      res.sendStatus(400)
    }
  } catch (err) {
    console.log(err.message)
    res.sendStatus(400)
  }
  // console.log(users)
})

app.post("/notes/add", async (req, res) => {
  const {username, note} = req.body;
  await db.query("insert into notes (note, username) values ($1, $2)", [note, username])
  res.sendStatus(201)
})

app.delete("/notes/delete/:id", async(req, res) => {
  const {id} = req.params
  console.log(id)
  await db.query("delete from notes where id=$1", [id])
  res.sendStatus(200)
})



app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})