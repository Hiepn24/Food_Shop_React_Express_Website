const { getListFood, getFoodByIdCate } = require("../services/foodService");

const getFood = async (req, res) => {
    try {
        const categoryId = req.query.categoryId; // Lấy categoryId từ query string

        let foods;
        if (categoryId) {
            foods = await getFoodByIdCate(categoryId); // Nếu có categoryId, lọc theo danh mục
        } else {
            foods = await getListFood(); // Nếu không có categoryId, lấy tất cả món ăn
        }

        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

module.exports = {
    getFood
};
