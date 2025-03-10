const { convertTimestampToDate, createLookupObject, checkExists } = require("../db/seeds/utils");
const userData = require("../db/data/test-data/users");
const db = require("../db/connection")

afterAll(() => db.end());

describe("convertTimestampToDate", () => {
    test("returns a new object", () => {
        const timestamp = 1557572706232;
        const input = { created_at: timestamp };
        const result = convertTimestampToDate(input);
        expect(result).not.toBe(input);
        expect(result).toBeObject();
    });
    test("converts a created_at property to a date", () => {
        const timestamp = 1557572706232;
        const input = { created_at: timestamp };
        const result = convertTimestampToDate(input);
        expect(result.created_at).toBeDate();
        expect(result.created_at).toEqual(new Date(timestamp));
    });
    test("does not mutate the input", () => {
        const timestamp = 1557572706232;
        const input = { created_at: timestamp };
        convertTimestampToDate(input);
        const control = { created_at: timestamp };
        expect(input).toEqual(control);
    });
    test("ignores includes any other key-value-pairs in returned object", () => {
        const input = { created_at: 0, key1: true, key2: 1 };
        const result = convertTimestampToDate(input);
        expect(result.key1).toBe(true);
        expect(result.key2).toBe(1);
    });
    test("returns unchanged object if no created_at property", () => {
        const input = { key: "value" };
        const result = convertTimestampToDate(input);
        const expected = { key: "value" };
        expect(result).toEqual(expected);
    });
});

describe("createLookupObject", () => {
    it("returns a new object", () => {
        const input = userData;
        const result = createLookupObject(userData, "name", "username");
        expect(result).not.toBe(input);
        expect(result).toBeObject();
    });
    it("doesn't mutate the input", () => {
        const input = userData;
        createLookupObject(input, "name", "username");
        const control = userData;
        expect(input).toEqual(control);
    });
    it("creates an object with the correct key and value", () => {
        const input = userData;
        const result = createLookupObject(input, "name", "username");
        expect(result.paul).toBe("rogersop");
    });
});

describe("checkExists", () => {
    it("returns undefined when given a value that is within the table's column data", () => {
        return checkExists("articles", "article_id", "2").then((result) => {
            expect(result).toBe(undefined);
        });
    });
    it("returns an error when given a value that is not within the table's column data", () => {
        expect(checkExists("articles", "article_id", "67")).rejects.toEqual({"msg": "Not found", "status": 404})
    });
});
