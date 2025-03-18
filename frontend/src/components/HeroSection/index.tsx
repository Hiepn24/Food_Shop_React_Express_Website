function HeroSection() {
  return (
    <section className="bg-[#890303] text-white flex flex-col md:flex-row items-center overflow-hidden">
      <div className="md:w-1/2 p-14">
        <img
          alt="Thanh Kitchen logo"
          className="h-16 mb-4"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/pwIp5rOfYTvQH1fYhyPUp6Wc8geZznZwBs-p3gr5huU.jpg"
          width="150"
        />
        <h1 className="text-4xl font-bold mb-4">
          Order your favorite food here
        </h1>
        <p className="mb-6">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button className="bg-white text-black px-6 py-3 rounded-full font-bold">
          View Menu
        </button>
        <div className="mt-6 flex space-x-4">
          <div className="flex items-center space-x-2">
            <i className="fas fa-phone-alt"></i>
            <span>+123-456-7890</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-map-marker-alt"></i>
            <span>631, Le Duc Tho, Go Vap District</span>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 relative">
        <img
          alt="Delicious food"
          className="rounded-full ml-[20%] -mt-20 border-8 border-[#ffdd59]"
          height="900"
          src="https://storage.googleapis.com/a1aa/image/np53ZnCcnFVcQ3CCS1sV1jNIdGUa9U0aEcqoW1P26y4.jpg"
          width="500"
        />
        <img
          alt="Delicious food"
          className="rounded-full absolute top-[45%] left-[10px] size-[300px] border-8 border-[#ffdd59]"
          height="900"
          src="https://storage.googleapis.com/a1aa/image/np53ZnCcnFVcQ3CCS1sV1jNIdGUa9U0aEcqoW1P26y4.jpg"
          width="500"
        />
      </div>
    </section>
  );
}

export default HeroSection;
