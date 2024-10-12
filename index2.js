import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "shawarma",
  port: 5432
});

db.connect()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const countries = await countryChecker();
  res.render("index.ejs", {countries: countries, total: countries.length});

});

app.post("/add", async (req, res) => {
  const input = req.body.country;
  try {
    const result = await db.query("SELECT country_code FROM countries WHERE country_name=$1", [input]);
    const data = result.rows[0];
    const countryCode = data.country_code
    try {
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
      res.redirect("/")
    } catch(err) {
      const countries = await countryChecker()
      console.log(err.message)
      res.render("index.ejs", {countries: countries, total: countries.length, error: "You have already visited this country"})
    }
  } catch (err) {
    const countries = await countryChecker()
    console.log(err.message)
    res.render("index.ejs", {countries: countries, total: countries.length, error: "This country does not exist"})
  }

  
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


async function countryChecker () {
  let countries = [];
  const response = await db.query("SELECT * FROM visited_countries");
  const result = response.rows
  result.forEach(country => {
    countries.push(country.country_code)
  })
  return countries
}
