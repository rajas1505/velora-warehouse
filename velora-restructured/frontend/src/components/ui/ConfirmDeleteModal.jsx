import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  itemName = 'this record',
  loading = false
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex items-start gap-4 py-2">
        <div className="p-3 rounded-full bg-red-500/15 text-red-400 shrink-0 border border-red-500/30">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-200">
            Are you sure you want to permanently delete <strong className="text-white">{itemName}</strong>?
          </p>
          <p className="text-xs text-slate-400 mt-2">
            This action will issue a request to the backend database and cannot be undone.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10 mt-6">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Permanently'}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
