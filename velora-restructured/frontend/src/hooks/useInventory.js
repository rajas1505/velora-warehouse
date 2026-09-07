import { useState, useEffect, useCallback, useMemo } from 'react';
import inventoryService from '../services/inventoryService';
import { useToast } from '../context/ToastContext';

export function useInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const { showSuccess, showError } = useToast();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryService.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load inventory products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (productData) => {
    try {
      await inventoryService.addProduct(productData);
      showSuccess(`Product "${productData.name}" added successfully!`);
      await fetchProducts();
      return true;
    } catch (err) {
      showError(err.message || 'Failed to add product');
      return false;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      await inventoryService.updateProduct(id, productData);
      showSuccess(`Product updated successfully!`);
      await fetchProducts();
      return true;
    } catch (err) {
      showError(err.message || 'Failed to update product');
      return false;
    }
  };

  const deleteProduct = async (id, productName) => {
    try {
      await inventoryService.deleteProduct(id);
      showSuccess(`Product "${productName || id}" deleted successfully!`);
      await fetchProducts();
      return true;
    } catch (err) {
      showError(err.message || 'Failed to delete product');
      return false;
    }
  };

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

      let itemStatus = 'In Stock';
      if (item.stock === 0) itemStatus = 'Out of Stock';
      else if (item.stock > 0 && item.stock <= 20) itemStatus = 'Low Stock';

      const matchesStatus = selectedStatus === 'All' || itemStatus === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, selectedCategory, selectedStatus]);

  return {
    products: filteredProducts,
    allProducts: products,
    categories,
    loading,
    error,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    refresh: fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };
}

export default useInventory;
