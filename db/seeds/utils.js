const db = require("../../db/connection");
const format = require("pg-format")

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
    if (!created_at) return { ...otherProperties };
    return { created_at: new Date(created_at), ...otherProperties };
};

exports.createLookupObject = (database, targetKey, targetValue) => {
    const lookup = {};
    for (let i = 0; i < database.length; i++) {
        lookup[database[i][targetKey]] = database[i][targetValue];
    }
    return lookup;
};

exports.checkExists = (table, column, value) => {
    const queryString = format("SELECT * FROM %I WHERE %I = $1", table, column);
    return db.query(queryString, [value]).then(({ rows }) => {
        if (rows.length === 0)
            return Promise.reject({ status: 404, msg: "Not found" });
    });
};
