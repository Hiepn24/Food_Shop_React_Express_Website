const { promisePool } = require("../config/database");

const insertCart = async (userId, foodId, quantity) => {
    try {
        const [existing] = await promisePool.query(
            "SELECT quantity FROM cart WHERE user_id = ? AND food_id = ?",
            [userId, foodId]
        );

        if (existing.length > 0) {
            // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
            const newQuantity = existing[0].quantity + quantity;
            const [updateResult] = await promisePool.query(
                "UPDATE cart SET quantity = ? WHERE user_id = ? AND food_id = ?",
                [newQuantity, userId, foodId]
            );
            return updateResult;
        } else {
            // Nếu chưa có, thêm mới vào giỏ hàng
            const [insertResult] = await promisePool.query(
                "INSERT INTO cart(user_id, food_id, quantity) VALUES(?, ?, ?)",
                [userId, foodId, quantity]
            );
            return insertResult;
        }
    } catch (error) {
        console.error("Error inserting to cart:", error);
        throw error;
    }
};

const getCartByIdUser = async (userId) => {
    try {
        const [results] = await promisePool.query(
            "SELECT cart.id, cart.user_id, cart.food_id, cart.quantity, foods.name, foods.description, foods.price, foods.image FROM cart LEFT JOIN foods ON cart.food_id = foods.id WHERE user_id = ?",
            [userId]
        );
        return results;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

const deleteItemCartByIdUser = async (cartId) => {
    try {
        const [results] = await promisePool.query(
            "DELETE FROM cart WHERE id = ?",
            [cartId]
        );
        return results;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

const countItemCart = async (userId) => {
    try {
        const [results] = await promisePool.query(
            "SELECT SUM(quantity) AS total FROM cart WHERE user_id = ?",
            [userId]
        );
        // return results; // Nếu NULL, trả về 0
        return results[0]?.total || 0; // Nếu NULL, trả về 0
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}


module.exports = {
    insertCart, getCartByIdUser, deleteItemCartByIdUser, countItemCart
};
