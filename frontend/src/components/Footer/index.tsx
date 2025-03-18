function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            {/* <!-- About Us Section --> */}
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">About Us</h2>
              <p className="text-gray-400">
                We are a company dedicated to providing the best services and
                products to our customers. Our mission is to make your life
                easier and more enjoyable.
              </p>
            </div>

            {/* <!-- Quick Links Section --> */}
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
              <ul>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-white">
                    Services
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Contact Us Section --> */}
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-400">
                1234 Street Name, City, State, 12345
              </p>
              <p className="text-gray-400">Email: info@example.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>

            {/* <!-- Social Media Section --> */}
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            &copy; 2023 Your Company. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
