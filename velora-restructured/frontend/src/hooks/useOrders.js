import { useState, useEffect, useCallback, useMemo } from 'react';
import ordersService from '../services/ordersService';
import { useToast } from '../context/ToastContext';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const { showSuccess, showError } = useToast();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordersService.getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load order records.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const addOrder = async (orderData) => {
    try {
      await ordersService.addOrder(orderData);
      showSuccess(`Order created successfully!`);
      await fetchOrders();
      return true;
    } catch (err) {
      showError(err.message || 'Failed to create order');
      return false;
    }
  };

  const updateOrder = async (id, orderData) => {
    try {
      await ordersService.updateOrder(id, orderData);
      showSuccess(`Order updated successfully!`);
      await fetchOrders();
      return true;
    } catch (err) {
      showError(err.message || 'Failed to update order');
      return false;
    }
  };

  const deleteOrder = async (id, orderCode) => {
    try {
      await ordersService.deleteOrder(id);
      showSuccess(`Order ${orderCode || id} deleted successfully!`);
      await fetchOrders();
      return true;
    } catch (err) {
      showError(err.message || 'Failed to delete order');
      return false;
    }
  };

  const kpis = useMemo(() => {
    const total = orders.length;
    const completed = orders.filter(o => o.status === 'Completed').length;
    const pending = orders.filter(o => o.status === 'Pending').length;
    const cancelled = orders.filter(o => o.status === 'Cancelled').length;
    return { total, completed, pending, cancelled };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        (o.order_code && o.order_code.toLowerCase().includes(search.toLowerCase())) ||
        (o.customer && o.customer.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus = selectedStatus === 'All' || o.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, selectedStatus]);

  return {
    orders: filteredOrders,
    allOrders: orders,
    kpis,
    loading,
    error,
    search,
    setSearch,
    selectedStatus,
    setSelectedStatus,
    refresh: fetchOrders,
    addOrder,
    updateOrder,
    deleteOrder
  };
}

export default useOrders;
