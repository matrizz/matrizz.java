const SimpleJsonDB = require("simple-json-db");
const _ = require("lodash");
const db = new SimpleJsonDB("./database.json");

module.exports = {
    get(key) {
        return _.get(db.JSON(), key);
    },

    set(key, value) {
        const data = db.JSON();
        _.set(data, key, value);
        db.sync();
    },

    add(key, value) {
        const data = db.JSON();
        const current = _.get(data, key) || 0;
        _.set(data, key, current + value);
        db.sync();
    },

    delete(key) {
        const data = db.JSON();
        _.unset(data, key);
        db.sync();
    },

    all() {
        return db.JSON();
    }
};
