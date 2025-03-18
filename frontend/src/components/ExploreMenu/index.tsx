import { useEffect, useState } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Category } from "@/types/category";

interface ExploreMenuProps {
  onSelectCategory: (categoryId: number) => void;
}

function ExploreMenu({ onSelectCategory }: ExploreMenuProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get<Category[]>("http://localhost:5000/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh mục:", error);
      });
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId); // Lưu danh mục được chọn
    onSelectCategory(categoryId);
  };

  const chunkedCategories = [];
  for (let i = 0; i < categories.length; i += 8) {
    chunkedCategories.push(categories.slice(i, i + 8));
  }

  return (
    <div className="w-full">
      <Carousel>
        <CarouselContent>
          {chunkedCategories.map((group, groupIndex) => (
            <CarouselItem key={groupIndex}>
              <div className="grid grid-cols-8 gap-4">
                {group.map((category) => (
                  <div
                    key={category.id}
                    className="text-center text-gray-600 grid justify-center w-full cursor-pointer"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <img
                      alt={category.name}
                      className={`rounded-full mb-2 transition-all ${
                        selectedCategory === category.id
                          ? "border-4 border-blue-500"
                          : "hover:border-4 hover:border-blue-500"
                      }`}
                      height="100"
                      src="https://storage.googleapis.com/a1aa/image/R-sMAulo7wGyvnCpqBBlGCZYOPKvkYdRLrc6BP02Zvo.jpg"
                      // src={category.image}
                      width="100"
                    />
                    <p>{category.name}</p>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {chunkedCategories.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
}

export default ExploreMenu;
