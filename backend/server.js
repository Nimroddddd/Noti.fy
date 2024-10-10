import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


const app = express()
const port = 3000
let users = [
  {
    id: 1,
    username: "amin",
    password: "bala"
  },
  {
    id: 2,
    username: "faiz",
    password: "kante"
  },
  {
    id: 3,
    username: "maryam",
    password: "jimoh"
  }
]

let currentID = 3

//middleware
app.use(cors())
app.use(bodyParser.json())


app.get("/api/", (req, res) => {
  res.json(users)
})

app.post("/api/register", (req, res) => {
  try {
    const {username: newUsername, password: newPassword} = req.body;
    const checkUser = users.find(user => user.username == newUsername)
    console.log(checkUser)
    if (!checkUser) {
      currentID++;
      users.push({id: currentID, username: newUsername, password: newPassword})
      res.sendStatus(201)
    } else {
      res.sendStatus(400)
      
    }
  } catch (err) {
    console.log("error triggered")
    res.sendStatus(400)
  }
  console.log(users)
})



app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})