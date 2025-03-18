import { useState } from "react";
import ExploreMenu from "@/components/ExploreMenu";
import HeroSection from "@/components/HeroSection";
import ListFood from "@/components/ListFood";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <div>
      <div className="mt-5">
        <HeroSection />
        <div className="my-5">
          <p className="font-bold text-3xl">Explore our menu</p>
          <ExploreMenu onSelectCategory={setSelectedCategory} />
        </div>
        <hr />
        <div className="my-5">
          <p className="font-bold text-3xl">Top dishes near you</p>
          <ListFood categoryId={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
