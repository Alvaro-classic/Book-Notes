import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import { assert } from "console";

const app = express();
const port = 3000;
const apiCoversEndpoint = "https://covers.openlibrary.org/b/";

app.use(express.static("public"));

const db = new pg.Client({
    user: "postgres",
    password: "fenubi*571",
    port: 5432,
    database: "book_notes",
    host: "localhost"
})
db.connect()

async function loadDb(){
    const response = await db.query("select * from note");
    const data = response.rows;
    return data;
}

app.get("/", async (req, res) => {
    const data = await loadDb()
    res.render("index.ejs", {
        notes: data
    });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
