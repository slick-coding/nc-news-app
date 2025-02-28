const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

const db = new Pool();

if (!process.env.PGDATABASE) {
    throw new Error("No PGDATABASE configured");
} else {
    console.log(`Connected to ${process.env.PGDATABASE}`);
}


function findUsers() {
    return db.query(`SELECT username FROM users`).then((response) => {
        console.log(response.rows);
    });
}

function findCodingArticles() {
    return db.query(
        `SELECT title FROM articles
        WHERE topic='coding' `
    ).then((response) => {
        console.log(response.rows);
    });
}

function findBadComments() {
    return db.query(
        `SELECT comment_id, votes, author FROM comments
        WHERE votes < 0`
    ).then((response) => {
        console.log(response.rows);
    });
}

findUsers()
findCodingArticles()
findBadComments()

module.exports = db;
