const { insertCart, getCartByIdUser, deleteItemCartByIdUser, countItemCart } = require("../services/cartService");

const addToCart = async (req, res) => {
    try {
        const { userId, foodId, quantity } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!userId || !foodId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
        }

        const result = await insertCart(userId, foodId, quantity);

        return res.status(201).json({
            message: "Thêm vào giỏ hàng thành công",
            cart: result
        });

    } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.query;
        const result = await getCartByIdUser(userId);
        return res.status(201).json({
            message: "Lấy dữ liệu giỏ hàng thành công",
            cart: result
        });
    } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
}

const deleteCart = async (req, res) => {
    try {
        const { id: cartId } = req.params;
        const result = await deleteItemCartByIdUser(cartId);
        return res.status(201).json({
            message: "Xóa item giỏ hàng thành công",
            cart: result
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
}

const countCart = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: "Thiếu userId" });
        }

        const cartCount = await countItemCart(userId);
        return res.status(200).json({
            message: "Lấy dữ liệu giỏ hàng thành công",
            cartCount: cartCount // Đổi từ `cart` thành `cartCount`
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

module.exports = {
    addToCart, getCart, deleteCart, countCart
};
