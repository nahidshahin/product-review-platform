export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  dateAdded: string;
  averageRating: number;
}

export interface ProductsData {
  products: Product[];
}
