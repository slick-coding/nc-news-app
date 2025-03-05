const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, createLookupObject } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
    return db
        .query("DROP TABLE IF EXISTS comments;")
        .then(() => {
            return db.query("DROP TABLE IF EXISTS articles;");
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS topics;");
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS users;");
        })
        .then(() => {
            return createTopics();
        })
        .then(() => {
            return createUsers();
        })
        .then(() => {
            return createArticles();
        })
        .then(() => {
            return createComments();
        })
        .then(() => {
            return insertUsers(userData);
        })
        .then(() => {
            return insertTopics(topicData);
        })
        .then(() => {
            const formattedArticles = articleData.map((article) => {
                return convertTimestampToDate(article);
            });
            return insertArticles(formattedArticles);
        })
        .then((result) => {
            const articleLookup = createLookupObject(
                result.rows,
                "title",
                "article_id"
            );
            const formattedComments = formatComments(
                commentData,
                articleLookup
            );
            return insertComments(formattedComments);
        });
};
module.exports = seed;

function createTopics() {
    return db.query(
        `CREATE TABLE topics (
    slug VARCHAR(100) PRIMARY KEY NOT NULL, 
    description  VARCHAR(500) NOT NULL, 
    img_url VARCHAR(1000) NOT NULL 
        )`
    );
}

function createUsers() {
    return db.query(
        `CREATE TABLE users (
    username VARCHAR(100) PRIMARY KEY NOT NULL, 
    name  VARCHAR(500) NOT NULL, 
    avatar_url VARCHAR(1000) NOT NULL 
        )`
    );
}

function createArticles() {
    return db.query(
        `CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY, 
    title VARCHAR(200) NOT NULL, 
    topic VARCHAR(100) NOT NULL REFERENCES topics(slug),
    author VARCHAR(100) NOT NULL REFERENCES users(username),
    body TEXT NOT NULL,
    created_at TIMESTAMP,
    votes INT DEFAULT '0',
    article_img_url VARCHAR(1000)
        )`
    );
}

function createComments() {
    return db.query(
        `CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY, 
    article_id INT NOT NULL REFERENCES articles(article_id),
    body TEXT NOT NULL,
    votes INT DEFAULT '0',
    author VARCHAR(100) NOT NULL REFERENCES users(username),
    created_at TIMESTAMP
    )`
    );
}

function insertTopics(topicData) {
    const formattedTopics = topicData.map((topic) => {
        return [topic.description, topic.slug, topic.img_url];
    });
    const insertTopicData = format(
        `INSERT INTO topics (description, slug, img_url)
    VALUES %L RETURNING *;`,
        formattedTopics
    );
    return db.query(insertTopicData);
}

function insertUsers(userData) {
    const formattedUsers = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
    });
    const insertUserData = format(
        `INSERT INTO users (username, name, avatar_url)
    VALUES %L RETURNING *;`,
        formattedUsers
    );
    return db.query(insertUserData);
}

function insertArticles(articleData) {
    const formattedArticles = articleData.map((article) => {
        return [
            article.title,
            article.topic,
            article.author,
            article.body,
            article.created_at,
            article.votes,
            article.article_img_url,
        ];
    });
    const insertArticleData = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url)
    VALUES %L RETURNING *;`,
        formattedArticles
    );
    return db.query(insertArticleData);
}

function formatComments(commentData, articleLookup) {
    const convertedComments = commentData.map((comment) => {
        return convertTimestampToDate(comment);
    });
    formattedComments = convertedComments.map((comment) => {
        return [
            articleLookup[comment.article_title],
            comment.body,
            comment.votes,
            comment.author,
            comment.created_at,
        ];
    });
    return formattedComments;
}
function insertComments(commentData) {
    const insertCommentData = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at)
    VALUES %L RETURNING *;`,
        commentData
    );
    //console.log(insertCommentData)
    return db.query(insertCommentData);
}
