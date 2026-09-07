import { api } from './api';

const MOCK_DASHBOARD_DATA = {
  totalProducts: 14820,
  ordersToday: 342,
  totalStockUnits: 98450,
  totalOrders: 12540,
  storageUsage: 92,
  ordersProcessed: 88,
  dispatchRate: 97,
  lowStockItems: 14,
  recentActivity: [
    { id: 1, type: 'order', text: 'Order #ORD-8921 dispatched to Bay A-4', time: '5 mins ago', status: 'success' },
    { id: 2, type: 'stock', text: 'Restock required: Pallet Rack #42 (Microchips)', time: '12 mins ago', status: 'warning' },
    { id: 3, type: 'order', text: 'New bulk order #ORD-8922 created by TechCorp', time: '25 mins ago', status: 'info' },
    { id: 4, type: 'system', text: 'Automated AGV Robot #08 completed zone sweep', time: '1 hour ago', status: 'success' }
  ]
};

export const dashboardService = {
  async getDashboardData() {
    try {
      const data = await api.get('/dashboard.php');
      return data;
    } catch (error) {
      console.warn('[DashboardService] API endpoint unavailable, using local dashboard state.', error.message);
      return MOCK_DASHBOARD_DATA;
    }
  }
};

export default dashboardService;
