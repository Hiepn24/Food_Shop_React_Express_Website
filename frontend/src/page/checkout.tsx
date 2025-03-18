import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { User } from "@/types/user";
// import { Cart } from "@/types/cart";

function CheckoutPage() {
  // const [cartItems, setCartItems] = useState<Cart[]>([]);
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

  const handleCheckout = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thanh toán!");
      return;
    }

    try {
      const stripe = await loadStripe("..."); // Thay bằng public key của bạn
      const response = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          // cartItems,
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
      <div className="grid grid-cols-2 py-10">
        {/*  */}
        <div>
          <p className="font-bold text-3xl mb-5">Delivery Information</p>
          <div className="flex flex-col gap-3 pr-[20%]">
            <div className="flex gap-x-2">
              <input
                type="text"
                className="border border-gray-500 rounded-sm p-1 w-[50%]"
                placeholder=""
              />
              <input
                type="text"
                className="border border-gray-500 rounded-sm p-1 w-[50%]"
                placeholder=""
              />
            </div>
            <div>
              <input
                type="text"
                className="border border-gray-500 rounded-sm p-1 w-full"
                placeholder=""
              />
            </div>
            <div>
              <input
                type="text"
                className="border border-gray-500 rounded-sm p-1 w-full"
                placeholder=""
              />
            </div>
            <div className="flex gap-x-2">
              <input
                type="text"
                className="border border-gray-500 rounded-sm p-1 w-[50%]"
                placeholder=""
              />
              <input
                type="text"
                className="border border-gray-500 rounded-sm p-1 w-[50%]"
                placeholder=""
              />
            </div>
            <div className="flex gap-x-2">
              <input
                type="text"
                className="border border-gray-500 rounded-sm p-1 w-[50%]"
                placeholder=""
              />
              <input
                type="text"
                className="border border-gray-500 rounded-sm p-1 w-[50%]"
                placeholder=""
              />
            </div>
            <div>
              <input
                type="text"
                className="border border-gray-500 rounded-sm p-1 w-full"
                placeholder=""
              />
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <p className="font-bold text-2xl mb-5">Carts total</p>
          <div className="flex justify-between text-gray-600 py-2">
            <p>Subtotal</p>
            <p>$120</p>
          </div>
          <hr />
          <div className="flex justify-between text-gray-600 py-2">
            <p>Delivery Free</p>
            <p>$0</p>
          </div>
          <hr />
          <div className="flex justify-between font-bold py-2">
            <p>Total</p>
            <p>$120</p>
          </div>
          <div className="flex w-full justify-end mt-2 mb-5">
            <button
              onClick={handleCheckout}
              className="px-10 py-2 bg-red-700 text-white font-bold"
            >
              PROCESS TO PAYMENTS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
