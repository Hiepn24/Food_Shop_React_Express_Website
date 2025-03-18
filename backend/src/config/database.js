require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Xuất kết nối dưới dạng promise để dễ dùng với async/await
const promisePool = pool.promise();

// Kiểm tra kết nối MySQL
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Kết nối MySQL thất bại:", err.message);
    } else {
        console.log("✅ Kết nối MySQL thành công!");
        connection.release(); // Giải phóng kết nối sau khi kiểm tra
    }
});

// module.exports = { promisePool };
module.exports = { pool, promisePool };
