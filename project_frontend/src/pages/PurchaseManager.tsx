import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Check, ChevronUp, ChevronDown } from 'lucide-react';
import Toast from '@/components/Toast';

interface Product {
  product_id: number;
  name: string;
  image: string;
  quantity: number;
  delivered: boolean;
}

interface Purchase {
  purchase_date: string;
  purchase_id: number;
  employee_id: string;
  profileEpic: string;
  firstName: string;
  lastName: string;
  products: Product[];
}

const PurchaseManager: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsedCards, setCollapsedCards] = useState<Set<number>>(new Set());
  
  const [toast, setToast] = useState<{show: boolean; success: boolean; msg: string}>({
        show: false,
        success: true,
        msg: ""
      });
      
      const showToast = (success: boolean, msg: string) => {
        setToast({ show: true, success, msg });
        // auto‑hide after 2.5 s
        setTimeout(() => setToast(t => ({ ...t, show: false })), 2500);
      };
  

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/purchases/details/`);
      const data: Purchase[] = response.data;

      const autoCollapsed = new Set<number>();
      data.forEach(purchase => {
        const allDelivered = purchase.products.every(p => p.delivered);
        if (allDelivered) autoCollapsed.add(purchase.purchase_id);
      });

      setPurchases(data);
      setCollapsedCards(autoCollapsed);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDelivered = async (purchaseId: number, employeeId: string, productId: number) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/purchases/items/`, {
        purchase_id: purchaseId,
        employee_id: employeeId,
        product_id: productId
      });
  
      setPurchases(current => {
        return current.flatMap(purchase => {
          if (purchase.purchase_id === purchaseId) {
            const updatedProducts = purchase.products.map(product =>
              product.product_id === productId
                ? { ...product, delivered: true }
                : product
            );
  
            const allDelivered = updatedProducts.every(p => p.delivered);
  
            // Remove this purchase entirely if all items are delivered
            if (allDelivered) return [];
  
            return [{ ...purchase, products: updatedProducts }];
          }
          return [purchase];
        });
      });
  
      // Clean up collapsed state too (optional, just in case)
      setCollapsedCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(purchaseId);
        return newSet;
      });
  
      showToast(true, "Marking as delivered worked successfully");
    } catch (error) {
      showToast(false, "Error marking as delivered");
      console.error('Error marking as delivered:', error);
    }
  };
  

  const toggleCard = (purchaseId: number) => {
    setCollapsedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(purchaseId)) {
        newSet.delete(purchaseId);
      } else {
        newSet.add(purchaseId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-20">
        <div className="bg-white rounded-xl shadow-md p-6 w-4/5 text-center text-gray-800">
          <p className="text-lg font-medium">Loading purchases...</p>
        </div>
      </div>
    );
  }
  
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Manage Purchases</h1>

      <div className="grid grid-cols-1 gap-6">
        {purchases.map(purchase => (
          <div key={purchase.purchase_id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={purchase.profileEpic}
                  alt={`${purchase.firstName} ${purchase.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">
                    {purchase.firstName} {purchase.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Purchase ID: {purchase.purchase_id} •{" "}
                    {new Date(purchase.purchase_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleCard(purchase.purchase_id)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                {collapsedCards.has(purchase.purchase_id)
                  ? <ChevronDown className="w-5 h-5" />
                  : <ChevronUp className="w-5 h-5" />}
              </button>
            </div>

            {!collapsedCards.has(purchase.purchase_id) && (
              <div className="space-y-4">
                {purchase.products.filter(product => !product.delivered).map(product => (
                  <div
                    key={product.product_id}
                    className="flex items-center justify-between border-t border-gray-100 pt-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleMarkAsDelivered(purchase.purchase_id, purchase.employee_id, product.product_id)}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Mark as Delivered
                    </button>
                  </div>
                ))}

                {purchase.products.filter(product => !product.delivered).length === 0 && (
                  <div className="flex items-center justify-center py-4 text-green-500">
                    <Check className="w-5 h-5 mr-2" />
                    All products delivered
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <Toast
        show={toast.show}
        success={toast.success}
        msg={toast.msg}
        onClose={() => setToast(t => ({ ...t, show: false }))}
      />
    </div>
  );
};

export default PurchaseManager;
