import { api } from './api';

const INITIAL_INVENTORY = [
  { id: 1, name: 'Industrial Conveyor Belt Motor', category: 'Machinery', stock: 45, created_at: '2026-07-15 10:30:00' },
  { id: 2, name: 'RFID Scanner Wand v4', category: 'Electronics', stock: 12, created_at: '2026-07-18 14:20:00' },
  { id: 3, name: 'Heavy Duty Wooden Pallet (48x40)', category: 'Storage', stock: 120, created_at: '2026-07-20 09:15:00' },
  { id: 4, name: 'Lithium Forklift Battery 48V', category: 'Power & Fuel', stock: 0, created_at: '2026-07-22 16:45:00' },
  { id: 5, name: 'Barcode Label Printer Roll', category: 'Packaging', stock: 85, created_at: '2026-07-25 11:10:00' },
  { id: 6, name: 'Automated Guided Vehicle (AGV) Wheel', category: 'Robotics', stock: 8, created_at: '2026-07-28 13:00:00' },
  { id: 7, name: 'High-Bay LED Warehouse Light 200W', category: 'Lighting', stock: 64, created_at: '2026-08-01 08:30:00' },
  { id: 8, name: 'Thermal Insulation Packing Wrap', category: 'Packaging', stock: 18, created_at: '2026-08-04 15:50:00' }
];

function getLocalInventory() {
  const stored = localStorage.getItem('velora_inventory');
  if (!stored) {
    localStorage.setItem('velora_inventory', JSON.stringify(INITIAL_INVENTORY));
    return INITIAL_INVENTORY;
  }
  return JSON.parse(stored);
}

function saveLocalInventory(data) {
  localStorage.setItem('velora_inventory', JSON.stringify(data));
}

export const inventoryService = {
  async getProducts() {
    try {
      const data = await api.get('/inventory.php');
      return data;
    } catch (error) {
      console.warn('[InventoryService] API unavailable, using local storage state');
      return getLocalInventory();
    }
  },

  async addProduct(product) {
    try {
      return await api.post('/inventory.php', product);
    } catch (error) {
      console.warn('[InventoryService] API unavailable, adding to local storage');
      const current = getLocalInventory();
      const newProduct = {
        id: Date.now(),
        name: product.name,
        category: product.category || 'General',
        stock: parseInt(product.stock, 10) || 0,
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      const updated = [newProduct, ...current];
      saveLocalInventory(updated);
      return newProduct;
    }
  },

  async updateProduct(id, product) {
    try {
      return await api.put(`/inventory.php?id=${id}`, product);
    } catch (error) {
      console.warn('[InventoryService] API unavailable, updating local storage');
      const current = getLocalInventory();
      const updated = current.map(p => {
        if (p.id === id || String(p.id) === String(id)) {
          return {
            ...p,
            name: product.name,
            category: product.category,
            stock: parseInt(product.stock, 10)
          };
        }
        return p;
      });
      saveLocalInventory(updated);
      return { success: true, id };
    }
  },

  async deleteProduct(id) {
    try {
      return await api.delete(`/inventory.php?id=${id}`);
    } catch (error) {
      console.warn('[InventoryService] API unavailable, deleting from local storage');
      const current = getLocalInventory();
      const updated = current.filter(p => p.id !== id && String(p.id) !== String(id));
      saveLocalInventory(updated);
      return { success: true, id };
    }
  }
};

export default inventoryService;
