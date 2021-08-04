export interface ShopItem {
  sku: number;
  name: string;
  type: string;
  price: number;
  upc: string;
  category: ShopItemCategoryList[];
  shipping: number;
  description: string;
  manufacturer: string;
  model: string;
  url: string;
  image: string;
}

export interface ShopItemCategoryList {
  id: string;
  name: string;
}
