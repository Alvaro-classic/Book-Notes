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
    const response = await db.query("select * from commentor join note on commentor.id = note.commentor_id");
    const data = response.rows;
    return data;
}

async function getCommentor (id) {
    const response = await db.query("select name from commentor where commentor.id = $1",
        [id]);
    const commentor = response.rows[0].name;
    return commentor
}

app.get("/", async (req, res) => {
    const data = await loadDb();
    res.render("index.ejs", {
        notes: data
    });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
