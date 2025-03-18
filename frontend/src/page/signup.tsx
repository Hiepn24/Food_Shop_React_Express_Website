import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn tải lại trang
    try {
      // Gửi request POST đến API http://localhost:5000/api/signup
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          name,
          email,
          password,
        }
      );

      // Xử lý phản hồi từ server
      setMessage(response.data.message); // Hiển thị thông báo từ server
      setName(""); // Reset form
      setEmail("");
      setPassword("");

      // Chuyển hướng sau khi đăng ký thành công
      setTimeout(() => navigate("/login"), 1000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Có lỗi xảy ra!");
    }
  };

  return (
    <div>
      <h2>Đăng Ký</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
}

export default SignUpPage;
