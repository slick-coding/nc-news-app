const db = require("../../db/connection");

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
