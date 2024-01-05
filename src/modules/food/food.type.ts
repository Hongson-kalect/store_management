export type CreateFoodParams = {
  name: string;
  rollNo: string;
  describe?: string;
  price: string;
  image: string[];
  discount: string;
  tag?: string[];
  quantity: number;
  buildingId: number;
  foodTypeId: number[];
};
