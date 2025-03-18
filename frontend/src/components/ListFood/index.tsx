import { useEffect, useState } from "react";
import axios from "axios";
import CardFood from "@/components/CardFood";
import { Food } from "@/types/food";

interface ListFoodProps {
  categoryId: number;
}

function ListFood({ categoryId }: ListFoodProps) {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const url =
      categoryId === 0
        ? "http://localhost:5000/api/foods" // Lấy tất cả món ăn
        : `http://localhost:5000/api/foods?categoryId=${categoryId}`; // Lọc theo danh mục

    axios
      .get<Food[]>(url)
      .then((response) => setFoods(response.data))
      .catch((error) => console.error("Error fetching food data:", error));
  }, [categoryId]); // Gọi lại API khi categoryId thay đổi

  return (
    <div className="grid grid-cols-5 mb-10 gap-5 py-5">
      {foods.length > 0 ? (
        foods.map((food) => <CardFood key={food.id} food={food} />)
      ) : (
        <p className="text-gray-500">No food found.</p>
      )}
    </div>
  );
}

export default ListFood;
