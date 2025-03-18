import { Route, Routes } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "./components/Footer";
import HomePage from "./page/home";
import CartPage from "./page/cart";
import CheckoutPage from "./page/checkout";
import LoginPage from "./page/login";
import SignUpPage from "./page/signup";
import SuccessPage from "./page/success";

function App() {
  return (
    <div>
      <div className="px-[5%] flex h-screen flex-col">
        <Header />
        {/* Hiển thị trang con */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/success" element={<SuccessPage />} />
          {/* <Route path="/add" element={<AddProduct></AddProduct>}></Route>
          <Route path="/edit-product/:id" element={<EditProduct />} /> */}
        </Routes>
        <Footer />
      </div>

      <link
        rel="stylesheet"
        data-purpose="Layout StyleSheet"
        title="Web Awesome"
        href="/css/app-wa-025281ccfe06a9d63cd35694641e07d3.css?vsn=d"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-thin.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-solid.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-regular.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-light.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-thin.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-solid.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-regular.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-light.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-thin.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-regular.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-light.css"
      ></link>
    </div>
  );
}

export default App;
