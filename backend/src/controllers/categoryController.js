const { getListCategory } = require("../services/categoryService");

const getAllCategory = async (req, res) => {
    try {
        const categories = await getListCategory();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

module.exports = {
    getAllCategory
};
