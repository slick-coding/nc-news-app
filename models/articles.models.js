const db = require("../db/connection");

exports.fetchArticlesById = (author_id) => {
    return db.query(`SELECT * FROM articles where article_id = $1`, [author_id]).then(({ rows }) => {
        return rows[0];
    });
};
