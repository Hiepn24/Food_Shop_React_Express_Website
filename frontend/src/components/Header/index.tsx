import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/user";

function Header() {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState(0);

  // Kiểm tra người dùng đã đăng nhập chưa
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

  // Gọi API lấy số lượng sản phẩm trong giỏ hàng
  useEffect(() => {
    const fetchCartCount = async () => {
      const storedUser = localStorage.getItem("user"); // Lấy dữ liệu từ localStorage
      if (!storedUser) return;

      try {
        const user = JSON.parse(storedUser); // Phân tích JSON
        if (!user.id) return; // Kiểm tra xem có user.id không

        const response = await fetch(
          `http://localhost:5000/api/cart/countCart?userId=${user.id}`
        );
        const data = await response.json();
        setCartCount(data.cartCount || 0);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };

    fetchCartCount();
  }, []);

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload(); // Reload để cập nhật giao diện
  };

  const navLinks = [
    { name: "home", href: "/" },
    { name: "menu", href: "/b" },
    { name: "mobile-app", href: "/c" },
    { name: "contact us", href: "/add" },
  ];

  return (
    <div>
      <header className="flex justify-between items-center pt-6">
        <img
          alt="Thanh Kitchen logo"
          className="h-12"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/pwIp5rOfYTvQH1fYhyPUp6Wc8geZznZwBs-p3gr5huU.jpg"
          width="150"
        />
        <nav className="hidden md:flex w-full max-w-xs space-x-6">
          {navLinks.map((tab) => (
            <Link
              key={tab.name}
              to={tab.href}
              className={`text-gray-800 hover:text-red-600 ${
                location.pathname === tab.href ? "text-red-600 font-bold" : ""
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <i className="fas fa-search text-gray-800"></i>
          <Link to="/cart">
            <div className="relative">
              <i className="fas fa-shopping-cart text-gray-800"></i>
              {cartCount > 0 && (
                <span className="absolute top-[-8px] right-[-10px] bg-red-500 text-white text-xs px-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {user ? (
            // Nếu đã đăng nhập, hiển thị tên và menu dropdown
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="size-[40px] border-2 border-red-400 rounded-full flex items-center justify-center hover:cursor-pointer">
                  <i className="fa-light fa-user text-lg text-red-400"></i>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Xin chào, {user.name}!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Đơn hàng của tôi</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Nếu chưa đăng nhập, hiển thị nút Sign in
            <Link to="/login">
              <button className="border border-red-600 text-red-600 px-4 py-2 rounded hover:cursor-pointer hover:bg-red-600 hover:text-white">
                Sign in
              </button>
            </Link>
          )}
        </div>

        <nav className="md:hidden">
          <Sheet>
            <SheetTrigger asChild className="align-middle">
              <Button>
                <i className="fa-sharp fa-solid fa-list"></i>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col items-start">
              <SheetTitle>Menu</SheetTitle>
              <nav className="flex flex-col">
                {navLinks.map((tab) => (
                  <Link
                    key={tab.name}
                    to={tab.href}
                    className={`text-gray-800 hover:text-red-600 ${
                      location.pathname === tab.href
                        ? "text-red-600 font-bold"
                        : ""
                    }`}
                  >
                    {tab.name}
                  </Link>
                ))}
                <i className="fas fa-search text-gray-800"></i>
                <Link to="/cart">
                  <div className="relative">
                    <i className="fas fa-shopping-cart text-gray-800"></i>
                    <span className="absolute top-[-6px] right-[55px] bg-red-500 text-white text-xs px-1 rounded-full">
                      0
                    </span>
                  </div>
                </Link>
                {!user ? (
                  <Link to="/login">
                    <button className="border border-red-600 text-red-600 px-4 py-2 rounded">
                      Sign in
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="border border-red-600 text-red-600 px-4 py-2 rounded"
                  >
                    Đăng xuất
                  </button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </div>
  );
}

export default Header;
