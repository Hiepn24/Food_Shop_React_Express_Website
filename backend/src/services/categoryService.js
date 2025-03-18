const { promisePool } = require("../config/database")

const getListCategory = async () => {
    const [results, fields] = await promisePool.query("SELECT * FROM categories");
    return results;
}

module.exports = {
    getListCategory
}