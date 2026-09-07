import { api } from './api';

const INITIAL_ORDERS = [
  { id: 101, order_code: 'ORD-8921', customer: 'Apex Logistics Inc.', status: 'Completed', order_date: '2026-08-08', created_at: '2026-08-08 11:20:00' },
  { id: 102, order_code: 'ORD-8922', customer: 'Global Freight Systems', status: 'Pending', order_date: '2026-08-09', created_at: '2026-08-09 09:15:00' },
  { id: 103, order_code: 'ORD-8923', customer: 'Nexus Electronics Depot', status: 'Completed', order_date: '2026-08-07', created_at: '2026-08-07 14:40:00' },
  { id: 104, order_code: 'ORD-8924', customer: 'Titan Industrial Supplies', status: 'Cancelled', order_date: '2026-08-06', created_at: '2026-08-06 16:30:00' },
  { id: 105, order_code: 'ORD-8925', customer: 'Vanguard Retail Chain', status: 'Pending', order_date: '2026-08-09', created_at: '2026-08-09 10:05:00' },
  { id: 106, order_code: 'ORD-8926', customer: 'Horizon Medical Gear', status: 'Completed', order_date: '2026-08-05', created_at: '2026-08-05 13:22:00' }
];

function getLocalOrders() {
  const stored = localStorage.getItem('velora_orders');
  if (!stored) {
    localStorage.setItem('velora_orders', JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  return JSON.parse(stored);
}

function saveLocalOrders(data) {
  localStorage.setItem('velora_orders', JSON.stringify(data));
}

export const ordersService = {
  async getOrders() {
    try {
      const data = await api.get('/orders.php');
      return data;
    } catch (error) {
      console.warn('[OrdersService] API unavailable, using local storage state');
      return getLocalOrders();
    }
  },

  async addOrder(order) {
    try {
      return await api.post('/orders.php', order);
    } catch (error) {
      console.warn('[OrdersService] API unavailable, adding to local storage');
      const current = getLocalOrders();
      const newOrder = {
        id: Date.now(),
        order_code: order.order_code || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        customer: order.customer,
        status: order.status || 'Pending',
        order_date: order.order_date || new Date().toISOString().substring(0, 10),
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      const updated = [newOrder, ...current];
      saveLocalOrders(updated);
      return newOrder;
    }
  },

  async updateOrder(id, order) {
    try {
      return await api.put(`/orders.php?id=${id}`, order);
    } catch (error) {
      console.warn('[OrdersService] API unavailable, updating local storage');
      const current = getLocalOrders();
      const updated = current.map(o => {
        if (o.id === id || String(o.id) === String(id)) {
          return {
            ...o,
            order_code: order.order_code || o.order_code,
            customer: order.customer,
            status: order.status,
            order_date: order.order_date
          };
        }
        return o;
      });
      saveLocalOrders(updated);
      return { success: true, id };
    }
  },

  async deleteOrder(id) {
    try {
      return await api.delete(`/orders.php?id=${id}`);
    } catch (error) {
      console.warn('[OrdersService] API unavailable, deleting from local storage');
      const current = getLocalOrders();
      const updated = current.filter(o => o.id !== id && String(o.id) !== String(id));
      saveLocalOrders(updated);
      return { success: true, id };
    }
  }
};

export default ordersService;
