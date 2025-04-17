import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2, Check, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
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


const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

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

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products/buy`, {
        employee_id: '3a1e74c9-8f2a-4ccd-83f4-6e4121672f69',
        products_to_buy: items.map(item => ({
          product_id: item.id,
          quantity_to_buy: item.quantity,
        })),
      });
  
      clearCart();
      setCheckoutComplete(true);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };
  

  if (checkoutComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Successful!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
          <Link 
            to="/store" 
            className="inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/store" className="inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map(item => {
            const product = products.find(p => p.id === item.id);
            const maxQuantity = product?.quantity || 0;
            const isAtMaxQuantity = item.quantity >= maxQuantity;

            return (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 mb-4 flex items-center">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="ml-6 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  {isAtMaxQuantity && (
                    <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                      <AlertCircle className="w-4 h-4" />
                      Max quantity reached
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={isAtMaxQuantity}
                      className={`p-1 rounded-full ${
                        isAtMaxQuantity ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              isCheckingOut 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isCheckingOut ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              'Proceed to Checkout'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;