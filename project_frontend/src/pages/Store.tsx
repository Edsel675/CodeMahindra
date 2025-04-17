import React, { useEffect, useState } from 'react';
import { Star, ShoppingCart, AlertCircle } from 'lucide-react';
import {useCart} from '../contexts/CartContext'
import axios from 'axios';
interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  publishDate: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { items, addToCart } = useCart();
  const cartItem = items.find(item => item.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;
  const isOutOfStock = product.quantity === 0;
  const hasReachedLimit = currentQuantity >= product.quantity;

  const handleAddToCart = () => {
    if (!hasReachedLimit && !isOutOfStock) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
            <Star className="w-5 h-5 text-yellow-500" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-red-500">${product.price}</span>
          <span className="text-sm text-gray-500">
            Published: {new Date(product.publishDate).toLocaleDateString()}
          </span>
        </div>
        <div className="text-sm text-gray-600 mb-3">
          Available: {product.quantity - currentQuantity} of {product.quantity}
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={hasReachedLimit || isOutOfStock}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
            hasReachedLimit || isOutOfStock
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {isOutOfStock ? (
            <>
              <AlertCircle className="w-5 h-5" />
              Out of Stock
            </>
          ) : hasReachedLimit ? (
            <>
              <AlertCircle className="w-5 h-5" />
              Max Quantity Reached
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const Store: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // Fetch products from API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${import.meta.env.VITE_BACKEND_URL}/products/`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProducts();
  }, []);
  console.log("these are the products: ", products)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Store;