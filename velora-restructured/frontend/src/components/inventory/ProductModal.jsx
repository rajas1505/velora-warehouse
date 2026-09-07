import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export function ProductModal({ isOpen, onClose, onSave, product = null }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategory(product.category || '');
      setStock(product.stock !== undefined ? String(product.stock) : '');
    } else {
      setName('');
      setCategory('General');
      setStock('0');
    }
  }, [product, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    const success = await onSave({
      name: name.trim(),
      category: category.trim() || 'General',
      stock: parseInt(stock, 10) || 0
    });
    setSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Warehouse Product' : 'Add New Inventory Product'}
      subtitle={product ? `Modifying SKU #${product.id}` : 'Enter new stock item specifications'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#b9c7dd] mb-1.5 uppercase tracking-wider">
            Product Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Industrial Conveyor Belt Motor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-velora"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#b9c7dd] mb-1.5 uppercase tracking-wider">
            Category
          </label>
          <input
            type="text"
            placeholder="e.g. Machinery, Storage, Electronics"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-velora"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#b9c7dd] mb-1.5 uppercase tracking-wider">
            Stock Quantity *
          </label>
          <input
            type="number"
            min="0"
            required
            placeholder="e.g. 50"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="input-velora"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-6">
          <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ProductModal;
