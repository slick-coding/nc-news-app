const db = require("../db/connection");
const { checkExists } = require("../db/seeds/utils");

exports.fetchArticlesById = (article_id) => {
    const promises = [
        db.query(`SELECT * FROM articles where article_id = $1`, [article_id]),
        checkExists("articles", "article_id", article_id)
    ]
    return Promise.all(promises).then(([{ rows }],) => {
        return rows[0];
    });
};
