const db = require("../db/connection");
const format = require("pg-format");
const { checkExists, commentCountLookup } = require("../db/seeds/utils");

exports.fetchArticlesById = (article_id) => {
    const promises = [
        db.query(`SELECT * FROM articles where article_id = $1`, [article_id]),
        checkExists("articles", "article_id", article_id),
    ];
    return Promise.all(promises).then(([{ rows }]) => {
        return rows[0];
    });
};

exports.fetchArticles = () => {
    let sqlQuery = "SELECT author, title, article_id, topic, created_at, votes, article_img_url FROM articles ";

    sqlQuery += `ORDER BY created_at `;

    sqlQuery += "DESC";

    const promises = [db.query(sqlQuery), commentCountLookup()];

    return Promise.all(promises).then(([{ rows }, commentLookup]) => {
        return rows.map((row) => {
            row.comment_count = commentLookup[row.article_id];
            return row;
        });
    });
};

exports.fetchCommentsById = (article_id) => {
    let sqlQuery =
        "SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = $1 ";

    sqlQuery += `ORDER BY created_at `;

    sqlQuery += "DESC";

    const promises = [db.query(sqlQuery, [article_id]), checkExists("comments", "article_id", article_id)];

    return Promise.all(promises).then(([{ rows }]) => {
        return rows;
    });
};

exports.insertComment = (article_id, author, body) => {
    // const insertComment = (
    //     `INSERT INTO comments (article_id, author, body) VALUES $1, $2, $3 RETURNING *;`,
    //     [article_id, author, body]
    // );

    const promises = [
        db.query(
            `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
            [article_id, author, body]
        ),
        checkExists("articles", "article_id", article_id)
    ]
    return Promise.all(promises).then(([{ rows }]) => {
        console.log(rows)
        return rows[0];
    });
};
