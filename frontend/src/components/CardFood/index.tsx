import { Food } from "@/types/food";
import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

interface CardFoodProps {
  food: Food;
}

function CardFood({ food }: CardFoodProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as User);
      } catch (error) {
        console.error("Lỗi khi phân tích JSON:", error);
      }
    }
  }, []);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập trước khi thêm vào giỏ hàng!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/addCart", {
        userId: user.id, // Lấy ID từ user hiện tại
        foodId: food.id,
        quantity: 1,
      });

      alert(response.data.message); // Thông báo khi thêm thành công
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Thêm vào giỏ hàng thất bại!");
    }
  };

  return (
    <div className="grid grid-cols-1 border shadow rounded-xl">
      <img
        className=""
        src="https://storage.googleapis.com/a1aa/image/R-sMAulo7wGyvnCpqBBlGCZYOPKvkYdRLrc6BP02Zvo.jpg"
        alt={food.name}
      />
      <div className="p-3">
        <p className="font-bold text-[20px] line-clamp-1">{food.name}</p>
        <span className="flex text-[11px] text-yellow-400 gap-x-0.5">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </span>
        <span className="text-[12px] text-gray-500 line-clamp-3 my-4">
          This is a brief description of the product. It highlights the key
          features and benefits to entice the customer.
        </span>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[18px] text-red-600">$99.99</span>
          <button
            className="px-4 py-1 rounded-xl bg-blue-400 text-white hover:cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardFood;

// import { Food } from "@/types/food";
// import axios from "axios";
// import { useState } from "react";

// interface CardFoodProps {
//   food: Food;
// }

// function CardFood({ food }: CardFoodProps) {
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");
//   const handleAddToCart = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/carts/add",
//         { food_id: food.id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log("Added to cart:", response.data);
//       alert("Added to cart successfully!");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add to cart.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 border shadow rounded-xl">
//       <img
//         src="https://storage.googleapis.com/a1aa/image/R-sMAulo7wGyvnCpqBBlGCZYOPKvkYdRLrc6BP02Zvo.jpg"
//         alt={food.name}
//         className="w-full h-40 object-cover rounded-t-xl"
//       />
//       <div className="p-3">
//         <p className="font-bold text-[20px] line-clamp-1">{food.name}</p>
//         <span className="flex text-[11px] text-yellow-400 gap-x-0.5">
//           <i className="fa-solid fa-star"></i>
//           <i className="fa-solid fa-star"></i>
//           <i className="fa-solid fa-star"></i>
//           <i className="fa-solid fa-star"></i>
//           <i className="fa-solid fa-star"></i>
//         </span>
//         <span className="text-[12px] text-gray-500 line-clamp-3 my-4">
//           This is a brief description of the product. It highlights the key
//           features and benefits to entice the customer.
//         </span>
//         <div className="flex justify-between items-center">
//           <span className="font-semibold text-[18px] text-red-600">$99.99</span>
//           <button
//             onClick={handleAddToCart}
//             disabled={loading}
//             className={`px-4 py-1 rounded-xl ${
//               loading ? "bg-gray-400" : "bg-blue-400"
//             } text-white hover:cursor-pointer`}
//           >
//             {loading ? "Adding..." : "Add to cart"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CardFood;
