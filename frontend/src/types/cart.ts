export interface Cart {
    id: number;
    user_id: number;
    food_id: number;
    quantity: number;
    name: string; // Tên món ăn
    description: string;
    price: number; // Giá món ăn
    image_url: string; // Hình ảnh món ăn
  }
  