import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ProductsResponse, Product } from '../types';
import CategoryFilter from './CategoryFilter';
import Rating from './Rating';
import SearchBar from './SearchBar'
import Pagination from './Pagination';
import { toast } from 'react-hot-toast';

const ProductList = () => {
  const [productsResponse, setProductsResponse] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const page = searchParams.get('page') || '1';
  const category = searchParams.get('category') || '';
  const backend = 'http://localhost:5000/products'

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `${backend}?page=${page}`;
      if (category) {
        url += `&category=${category}`;
      }
      
      const response = await axios.get<ProductsResponse>(url);
      setProductsResponse(() => response.data);
    } catch (err) {
      setError('Failed to fetch products');
      toast.error('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      const response = await axios.get<Product[]>(`${backend}/search?q=${searchQuery}`);
      setProductsResponse({
        products: response.data,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalProducts: response.data.length,
          hasNext: false,
          hasPrevious: false
        }
      });
    } catch (err) {
      setError('Failed to search products');
      toast.error('Failed to search products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (selectedCategory: string) => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    setSearchParams(params);
  };

  useEffect(() => {
    if (!searchQuery) {
      fetchProducts();
    }
  }, [page, category, searchQuery]);

  if (loading && !productsResponse) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="container row">
        <div className="col">
          <CategoryFilter selectedCategory={category}
            onCategoryChange={handleCategoryChange} />
        </div>
        <div className="col">
          <SearchBar searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} handleSearch={handleSearch}/>
        </div>
      </div>

      {productsResponse?.products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found</p>
          <button onClick={() => {
              setSearchQuery(''); 
              fetchProducts();
            }}
            className="mt-2 text-indigo-600 hover:underline">Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {productsResponse?.products.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100">
                  <img src={'laptop.jpg'} className="card-img-top" alt="Product Image"/>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price.toFixed(2)}</p>
                    <div className="mb-3">
                      <Rating rating={product.averageRating} />
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <Link  to={`/products/${product.id}`} 
                      className="text-blue-600 hover:text-blue-800 font-medium">
                        View Details & Reviews →
                    </Link>                    
                  </div>
                </div>
              </div>
            ))}
          </div>
 
          {productsResponse?.pagination && (
            <Pagination 
              pagination={productsResponse.pagination}
              onPageChange={(newPage) => {
                const params = new URLSearchParams(searchParams);
                params.set('page', newPage.toString());
                setSearchParams(params);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
