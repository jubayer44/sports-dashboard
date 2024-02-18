export type TResponseProduct = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image?: string;
  sportType: string;
  brand: string;
  material: string;
  branch: string;
  condition: string;
  isOutdoor: boolean;
  size: string;
  color: string;
  style: string;
  width?: string;
  createdAt: string;
  updatedAt: string;
};

export type TSaleProductResponse = {
  _id: string;
  buyerName: string;
  quantity: number;
  saleDate: string;
  branch?: string;
  product: TResponseProduct;
  createdAt: string;
  updatedAt: string;
};
