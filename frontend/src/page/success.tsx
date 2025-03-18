import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-500">
        Thanh toán thành công!
      </h1>
      <p>Cảm ơn bạn đã mua hàng.</p>
      <Link to="/">
        <button className="mt-5 px-6 py-2 bg-black text-white font-bold">
          Quay lại trang chủ
        </button>
      </Link>
    </div>
  );
}

export default SuccessPage;
