const db = require("../db/connection");
const format = require("pg-format");
const { checkExists } = require("../db/seeds/utils");

exports.removeCommentById = (comment_id) => {
    return checkExists("comments", "comment_id", comment_id).then(() => {
        return db.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id]).then(() => {
            console.log("Deletion successful");
        });
    });
};
