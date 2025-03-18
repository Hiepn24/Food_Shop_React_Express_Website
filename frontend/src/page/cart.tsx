import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cart } from "@/types/cart";
import { User } from "@/types/user";

import { loadStripe } from "@stripe/stripe-js";

function CartPage() {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
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

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart", {
        params: { userId: user?.id },
      });
      setCartItems(response.data.cart as Cart[]);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/deleteCart/${itemId}`);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thanh toán!");
      return;
    }

    try {
      const stripe = await loadStripe(
        "pk_test_51Qy84PDFsUY9veZ2JozdEooTUu5wCkj0p3XAnm4g0UXVoFKD684LWKHIJGP52F69hqm7224wtDxVJ7WaDQ061AN2001xJsYoKg"
      ); // Thay bằng public key của bạn
      const response = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          cartItems,
        }
      );

      if (response.data.id) {
        stripe?.redirectToCheckout({ sessionId: response.data.id });
      }
    } catch (error) {
      console.error("Lỗi khi tạo phiên thanh toán:", error);
    }
  };

  return (
    <div className="mt-20">
      {!user ? (
        <p className="text-center text-red-500">
          Vui lòng đăng nhập để xem giỏ hàng!
        </p>
      ) : (
        <>
          <Table>
            <TableCaption>Danh sách sản phẩm trong giỏ hàng.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Hình ảnh</TableHead>
                <TableHead>Tên món</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Tổng</TableHead>
                <TableHead className="text-right w-[100px]">Xóa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <img
                        className="size-[50px]"
                        src={item.image_url || "https://via.placeholder.com/50"}
                        alt={item.name}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price * item.quantity}</TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-500 font-bold hover:cursor-pointer"
                      >
                        X
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Giỏ hàng trống
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="grid grid-cols-2 mt-10">
            <div>
              <div className="flex gap-1">
                <input
                  type="text"
                  className="border border-black p-1 w-[50%]"
                  placeholder="Nhập mã giảm giá..."
                />
                <button className="px-4 py-1 bg-black text-white">
                  Áp dụng
                </button>
              </div>
            </div>
            <div>
              <p className="font-bold text-3xl mb-5">Tổng giỏ hàng</p>
              <div className="flex justify-between text-gray-600 py-2">
                <p>Tạm tính</p>
                <p>
                  $
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </p>
              </div>
              <hr />
              <div className="flex justify-between text-gray-600 py-2">
                <p>Phí giao hàng</p>
                <p>$0</p>
              </div>
              <hr />
              <div className="flex justify-between font-bold py-2">
                <p>Tổng cộng</p>
                <p>
                  $
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </p>
              </div>
              <div className="flex w-full justify-end mt-2 mb-5">
                {/* <Link to="/checkout"> */}
                <button
                  onClick={handleCheckout}
                  className="px-10 py-2 bg-red-700 text-white font-bold"
                >
                  TIẾN HÀNH THANH TOÁN
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
