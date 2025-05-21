export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  dateAdded: string;
  averageRating: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export interface ReviewFormData {
  author: string;
  rating: number;
  comment: string;
}
