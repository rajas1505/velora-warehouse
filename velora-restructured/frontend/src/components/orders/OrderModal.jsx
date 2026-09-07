import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export function OrderModal({ isOpen, onClose, onSave, order = null }) {
  const [orderCode, setOrderCode] = useState('');
  const [customer, setCustomer] = useState('');
  const [status, setStatus] = useState('Pending');
  const [orderDate, setOrderDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (order) {
      setOrderCode(order.order_code || '');
      setCustomer(order.customer || '');
      setStatus(order.status || 'Pending');
      setOrderDate(order.order_date || new Date().toISOString().substring(0, 10));
    } else {
      setOrderCode(`ORD-${Math.floor(8000 + Math.random() * 1900)}`);
      setCustomer('');
      setStatus('Pending');
      setOrderDate(new Date().toISOString().substring(0, 10));
    }
  }, [order, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.trim()) return;

    setSubmitting(true);
    const success = await onSave({
      order_code: orderCode.trim() || `ORD-${Math.floor(8000 + Math.random() * 1900)}`,
      customer: customer.trim(),
      status: status,
      order_date: orderDate || new Date().toISOString().substring(0, 10)
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
      title={order ? 'Edit Order Details' : 'Create New Warehouse Order'}
      subtitle={order ? `Updating ${order.order_code}` : 'Enter new shipment dispatch credentials'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#b9c7dd] mb-1.5 uppercase tracking-wider">
            Order Code / ID *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. ORD-8927"
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            className="input-velora"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#b9c7dd] mb-1.5 uppercase tracking-wider">
            Customer / Logistics Client *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Apex Logistics Inc."
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="input-velora"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#b9c7dd] mb-1.5 uppercase tracking-wider">
            Shipment Status *
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-velora bg-[#0d1827]"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#b9c7dd] mb-1.5 uppercase tracking-wider">
            Order Date *
          </label>
          <input
            type="date"
            required
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            className="input-velora bg-[#0d1827]"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-6">
          <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Processing...' : order ? 'Update Order' : 'Create Order'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default OrderModal;
