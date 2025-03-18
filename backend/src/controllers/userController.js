require('dotenv').config();
const { insertUser, findUserByEmail } = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        }

        // Hash password trước khi lưu vào database
        const hashedPassword = bcrypt.hashSync(password, 10);

        const result = await insertUser(name, email, hashedPassword);
        return res.status(201).json({ message: "Đăng ký thành công", userId: result.insertId });
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         // Kiểm tra dữ liệu đầu vào
//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: "Vui lòng nhập email và mật khẩu!" });
//         }
//         const user = await findUserByEmail(email);
//         console.log(user);
//         if (!user) {
//             return res.status(400).json({ success: false, message: "Người dùng không tồn tại!" });
//         }
//         // Kiểm tra mật khẩu
//         const isPasswordValid = bcrypt.compareSync(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ success: false, message: "Mật khẩu không chính xác!" });
//         }

//         // Tạo token
//         const secret = process.env.JWT_SECRET; // Đảm bảo có SECRET trong biến môi trường
//         const token = jwt.sign(
//             {
//                 userId: user._id,
//                 isAdmin: user.isAdmin,
//             },
//             secret,
//             { expiresIn: "1d" }
//         );
//         res.json({ message: "Đăng nhập thành công!", token });
//     } catch (error) {
//         console.error("Lỗi khi đăng nhập:", error);
//         return res.status(500).json({ message: "Lỗi server" });
//     }
// };
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập email và mật khẩu!" });
        }

        const user = await findUserByEmail(email);
        console.log("User found:", user); // Debug dữ liệu user

        if (!user) {
            return res.status(400).json({ success: false, message: "Người dùng không tồn tại!" });
        }

        if (!user.password) {
            console.error("Lỗi: user.password bị undefined");
            return res.status(500).json({ success: false, message: "Lỗi server: Không tìm thấy password" });
        }

        console.log("User password:", user.password); // Debug giá trị password

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Mật khẩu không chính xác!" });
        }

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1d" });

        res.json({ message: "Đăng nhập thành công!", token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = {
    signUp, login
};
