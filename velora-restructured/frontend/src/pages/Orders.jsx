import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, ShoppingBag, CheckCircle2, Clock, XCircle, RefreshCw } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/ui/StatCard';
import DataTable from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import OrderModal from '../components/orders/OrderModal';
import ConfirmDeleteModal from '../components/ui/ConfirmDeleteModal';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import useOrders from '../hooks/useOrders';

export function Orders() {
  const {
    orders,
    kpis,
    loading,
    error,
    search,
    setSearch,
    selectedStatus,
    setSelectedStatus,
    refresh,
    addOrder,
    updateOrder,
    deleteOrder
  } = useOrders();

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleOpenAdd = () => {
    setEditingOrder(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (ord) => {
    setEditingOrder(ord);
    setModalOpen(true);
  };

  const handleSaveOrder = async (formData) => {
    if (editingOrder) {
      return await updateOrder(editingOrder.id, formData);
    } else {
      return await addOrder(formData);
    }
  };

  const handleOpenDelete = (ord) => {
    setDeletingOrder(ord);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingOrder) return;
    setDeleting(true);
    await deleteOrder(deletingOrder.id, deletingOrder.order_code);
    setDeleting(false);
    setDeleteModalOpen(false);
    setDeletingOrder(null);
  };

  // Order status badge helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="success">Completed</Badge>;
      case 'Pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'Cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const columns = [
    {
      header: 'Order Code',
      accessor: 'order_code',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#238cff]/15 border border-[#238cff]/30 text-[#46d5ff] flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block font-mono">{row.order_code}</span>
            <span className="text-[11px] text-slate-400">Ref #{row.id}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Customer / Client',
      accessor: 'customer',
      render: (row) => (
        <span className="font-medium text-slate-200">{row.customer}</span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => getStatusBadge(row.status)
    },
    {
      header: 'Order Date',
      accessor: 'order_date',
      render: (row) => (
        <span className="text-xs text-slate-400 font-mono">{row.order_date || 'N/A'}</span>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      className: 'text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-2 rounded-lg bg-white/5 hover:bg-[#238cff]/20 text-slate-300 hover:text-[#46d5ff] transition-colors border border-white/10"
            title="Edit Order"
            aria-label={`Edit ${row.order_code}`}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenDelete(row)}
            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors border border-white/10"
            title="Delete Order"
            aria-label={`Delete ${row.order_code}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Orders Management"
        subtitle="Monitor, process and track every warehouse order."
        action={
          <Button onClick={handleOpenAdd} variant="primary" icon={Plus}>
            Create Order
          </Button>
        }
      />

      {/* Top KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Orders"
          value={kpis.total.toString()}
          icon={ShoppingBag}
          subtitle="Registered orders"
          iconColor="text-[#46d5ff]"
          iconBg="bg-[#238cff]/15 border-[#238cff]/30"
        />

        <StatCard
          title="Completed"
          value={kpis.completed.toString()}
          icon={CheckCircle2}
          subtitle="Successfully dispatched"
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/15 border-emerald-500/30"
        />

        <StatCard
          title="Pending"
          value={kpis.pending.toString()}
          icon={Clock}
          subtitle="In staging queue"
          iconColor="text-amber-400"
          iconBg="bg-amber-500/15 border-amber-500/30"
        />

        <StatCard
          title="Cancelled"
          value={kpis.cancelled.toString()}
          icon={XCircle}
          subtitle="Revoked shipments"
          iconColor="text-red-400"
          iconBg="bg-red-500/15 border-red-500/30"
        />
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-[#182331] border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xl">
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by order code or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-velora pl-10 text-xs"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#46d5ff]" />
            <span className="text-xs font-medium text-slate-400 hidden sm:inline">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-velora text-xs py-2 bg-[#0d1827] min-w-[140px]"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <Button onClick={refresh} variant="ghost" size="sm" icon={RefreshCw} title="Refresh Orders">
            Refresh
          </Button>
        </div>

      </div>

      {/* Orders Data Table */}
      {loading ? (
        <LoadingState message="Connecting to MySQL database and fetching order records..." />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : orders.length === 0 ? (
        <EmptyState
          title="No Orders Found"
          description={search ? `No orders matching "${search}"` : "There are currently no orders registered."}
          actionLabel="Create Order"
          onAction={handleOpenAdd}
        />
      ) : (
        <DataTable columns={columns} data={orders} keyField="id" />
      )}

      {/* Modal Components */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveOrder}
        order={editingOrder}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={deletingOrder ? deletingOrder.order_code : ''}
        loading={deleting}
      />
    </div>
  );
}

export default Orders;
