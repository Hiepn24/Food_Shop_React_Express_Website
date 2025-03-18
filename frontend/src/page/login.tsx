import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // Reset lỗi trước khi gửi request
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;
      console.log(response);
      console.log(token);
      // Lưu vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("oke");

      // window.location.reload(); // Reload để cập nhật giao diện
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold">Login</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleLogin}
      >
        Đăng nhập
      </button>
    </div>
  );
}

export default LoginPage;
