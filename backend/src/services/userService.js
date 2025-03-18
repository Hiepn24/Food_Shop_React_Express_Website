const { promisePool } = require("../config/database");

const insertUser = async (name, email, password) => {
    const [results, fields] = await promisePool.query("INSERT INTO users(name, email, password) VALUES(?, ?, ?)",
        [name, email, password]
    );
    return results;
}

const findUserByEmail = async (email) => {
    const [results] = await promisePool.query("SELECT * FROM users WHERE email = ?", [email]);

    console.log("Query result:", results); // Debug kiểm tra kết quả truy vấn

    return results.length > 0 ? results[0] : null; // Trả về object user thay vì mảng
};

module.exports = {
    insertUser, findUserByEmail
}