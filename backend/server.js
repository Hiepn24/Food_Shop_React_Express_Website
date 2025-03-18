require('dotenv').config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;
const urlApi = process.env.API_BASE_URL;
const secretKey = process.env.JWT_SECRET;

const categoryRoutes = require("./src/routes/category");
const foodRoutes = require("./src/routes/food");
const userRoutes = require("./src/routes/user");
const cartRoutes = require("./src/routes/cart");

const authJwt = require('./src/helpers/jwt');

// Middleware
// app.use(cors()); // Cho phép React frontend gọi API


app.use(cors({
    origin: "http://localhost:5173", // Không dùng "*"
    credentials: true,  // Quan trọng: Cho phép gửi cookie/session
}));
app.use(bodyParser.json()); // Xử lý JSON body request
// app.use(authJwt());
app.use(
    session({
        secret: "key12345", // Secret để mã hóa session
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // Lưu session trong 1 ngày
    })
);

// Route
app.use(urlApi, categoryRoutes);
app.use(urlApi, foodRoutes);
app.use(urlApi, userRoutes);
app.use(urlApi, cartRoutes);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.post("/create-checkout-session", async (req, res) => {
    try {
        const { cartItems } = req.body;

        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name, images: [item.image_url] },
                unit_amount: item.price * 100, // Stripe dùng cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Lỗi tạo phiên thanh toán:", error);
        res.status(500).json({ error: error.message });
    }
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
