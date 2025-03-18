const { promisePool } = require("../config/database")

const getListFood = async () => {
    const [results, fields] = await promisePool.query("SELECT * FROM foods");
    return results;
}

const getFoodByIdCate = async (categoryId) => {
    try {
        const [results] = await promisePool.query(
            "SELECT * FROM foods WHERE category_id = ?",
            [categoryId] // Truyền giá trị vào query
        );
        return results;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu món ăn:", error);
        throw error;
    }
};

module.exports = {
    getListFood, getFoodByIdCate
}