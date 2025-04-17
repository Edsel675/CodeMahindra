import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Save, Package, Upload, Trash2 } from 'lucide-react';
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

const StoreManagement: React.FC = () => {
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
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isAddingStock, setIsAddingStock] = useState<number | null>(null);
  const [stockAmount, setStockAmount] = useState<number>(0);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'publishDate'>>({
    image: '',
    name: '',
    price: 0,
    description: '',
    quantity: 0,
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsCreating(false);
    setIsAddingStock(null);
  };
  /*
  const handleSave = (product: Product) => {
    setProducts(currentProducts =>
      currentProducts.map(p => (p.id === product.id ? { ...product, quantity: p.quantity } : p))
    );
    setEditingProduct(null);
  };*/

  const handleSave = async (product: Product) => {
    try {
      const response = await axios.put<Product>(
        `${import.meta.env.VITE_BACKEND_URL}/products/${product.id}`,
        {
          image: product.image,
          name: product.name,
          price: product.price,
          description: product.description,
          quantity: product.quantity,
        }
      );
  
      const savedProduct = response.data;
  
      setProducts(currentProducts =>
        currentProducts.map(p =>
          p.id === product.id
            ? {
                ...savedProduct,
                quantity: product.quantity, // if you still want to override quantity
              }
            : p
        )
      );
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  
    setEditingProduct(null);
  };
  

  const handleCreate = async (product: Product) => {
    // Create a new product object with a generated id and publish date.
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const createdProduct = {
      ...product,
      id: newId,
      publishDate: new Date().toISOString().split('T')[0],
    };
  
    try {
      // Post the new product data to the backend
      console.log("this is the created product: ", createdProduct)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/products/`,
        {
          image: createdProduct.image,
          name: createdProduct.name,
          price: createdProduct.price,
          description: createdProduct.description,
          quantity: createdProduct.quantity,
        }
      );
  
      // Optionally update the state with the response from the backend.
      // Here we're assuming the backend returns the created product as response.data.
      setProducts(currentProducts => [...currentProducts, response.data]);
    } catch (error) {
      console.error("Error creating product", error);
      alert("Failed to create product.");
    } finally {
      // Reset the form for creating a new product and exit creation mode.
      setNewProduct({
        image: '',
        name: '',
        price: 0,
        description: '',
        quantity: 0,
      });
      setIsCreating(false);
    }
  };

  const handleAddStock = async (productId: number) => {
    if (stockAmount <= 0) return;
  
    try {
      const response = await axios.post<Product>(
        `${import.meta.env.VITE_BACKEND_URL}/products/${productId}/add_stock`,
        { quantity: stockAmount }
      );
  
      const updatedProduct = response.data;
  
      setProducts(currentProducts =>
        currentProducts.map(p =>
          p.id === productId ? { ...p, quantity: updatedProduct.quantity } : p
        )
      );
    } catch (error) {
      console.error('Failed to add stock:', error);
    }
  
    setStockAmount(0);
    setIsAddingStock(null);
  };
  
  const handleDiscontinue = async (productId: number) => {
    const confirmed = window.confirm("Are you sure you want to discontinue this product?");
    
    if (confirmed) {
      try {
        // Send DELETE request to backend to delete the product
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}`);
  
        // If successful, update the state to remove the product
        setProducts(currentProducts =>
          currentProducts.filter(p => p.id !== productId)
        );
  
        // Optionally reset editingProduct if the discontinued product is currently being edited
        if (editingProduct?.id === productId) {
          setEditingProduct(null);
        }
      } catch (error) {
        console.error('Error discontinuing product:', error);
        alert('Failed to discontinue the product. Please try again.');
      }
    }
  };
  
  const ProductForm = ({ product, onSave, onCancel }: {
    product: Product;
    onSave: (product: Product) => void;
    onCancel: () => void;
  }) => {

    const [uploading, setUploading] = useState(false);
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

    const handleImageUpload = async (
      e: React.ChangeEvent<HTMLInputElement>,
      setProductData: (data: any) => void,
      currentData: any
    ): Promise<void> => {
      console.log("uploading image");
      const file = e.target.files?.[0];
      if (!file) {
        console.log("found nothing", e.target.files);
        return;
      }
      console.log("actually did find an image");
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await axios.post<{ secure_url: string }>(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        console.log(response.data.secure_url);
        setProductData({ ...currentData, image: response.data.secure_url });
      } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed. Check console for details.");
      } finally {
        setUploading(false);
      }
    };

    const [editedProduct, setEditedProduct] = useState({ ...product });
    useEffect(() => {
      console.log("final updated data:", editedProduct);
    }, [editedProduct]);

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <div className="flex items-center space-x-4">
              <div>
                {editedProduct.image ? (
                  <img
                    src={editedProduct.image}
                    alt="Product preview"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg">
                    <span className="text-xs text-gray-500">No Image</span>
                  </div>
                )}
              </div>
              <div>
                <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400">
                  <Upload className="w-6 h-6 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    {uploading ? "Uploading..." : "Click to upload image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, setEditedProduct, editedProduct)}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={editedProduct.name}
              onChange={e => setEditedProduct({ ...editedProduct, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
                type="number"
                value={editedProduct.price}
                onChange={e => setEditedProduct({ ...editedProduct, price: Math.floor(parseFloat(e.target.value)) })}
                className="w-full p-2 border rounded-lg"
                step="1"  // Step size of 1 for integer increment/decrement
                min="0"   // Minimum value of 0
                />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={editedProduct.description}
              onChange={e => setEditedProduct({ ...editedProduct, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={3}
            />
          </div>
          {!product.id && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock</label>
              <input
                type="number"
                value={editedProduct.quantity}
                onChange={e => setEditedProduct({ ...editedProduct, quantity: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-lg"
                min="0"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => onCancel()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedProduct)}
            disabled={uploading}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Store Management</h1>
        <button
          onClick={() => {
            setIsCreating(true);
            setEditingProduct(null);
            setIsAddingStock(null);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {isCreating && (
        <ProductForm
          product={{
            ...newProduct,
            id: 0,
            publishDate: new Date().toISOString().split('T')[0],
          }}
          onSave={handleCreate}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id}>
            {editingProduct?.id === product.id ? (
              <ProductForm
                product={editingProduct}
                onSave={handleSave}
                onCancel={() => setEditingProduct(null)}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-6 flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                      <span>Price: ${product.price}</span>
                      <span>Current Stock: {product.quantity}</span>
                      <span>Published: {new Date(product.publishDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsAddingStock(product.id);
                        setEditingProduct(null);
                        setIsCreating(false);
                      }}
                      className="p-2 text-green-600 hover:text-green-800 rounded-full hover:bg-green-50"
                    >
                      <Package className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDiscontinue(product.id)}
                      className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {isAddingStock === product.id && (
                  <div className="mt-4 p-4 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="flex-grow">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Add Stock Amount
                        </label>
                        <input
                          type="number"
                          value={stockAmount}
                          onChange={(e) => setStockAmount(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full p-2 border rounded-lg"
                          min="0"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsAddingStock(null)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAddStock(product.id)}
                          disabled={stockAmount <= 0}
                          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                            stockAmount <= 0
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                          Add Stock
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreManagement;
