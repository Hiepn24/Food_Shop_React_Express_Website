require('dotenv').config();
const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.JWT_SECRET; // Lấy SECRET từ .env
    const api = process.env.API_BASE_URL; // Sử dụng API_BASE_URL từ .env

    return jwt({
        secret,
        algorithms: ["HS256"], // Thuật toán mã hóa token
    }).unless({
        path: [
            { url: new RegExp(`${api}/categories(.*)`), methods: ["GET", "OPTIONS"] }, // Không cần token
            { url: new RegExp(`${api}/foods(.*)`), methods: ["GET", "OPTIONS"] }, // Không cần token
            `${api}/users/login`, // Không cần token khi đăng nhập
            `${api}/users/signup`, // Không cần token khi đăng ký
            // Còn các url còn lại phải đăng nhập với vào xem nội dung được
        ],
    });
}

module.exports = authJwt;
