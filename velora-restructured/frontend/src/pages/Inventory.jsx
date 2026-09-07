import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Boxes, RefreshCw } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import DataTable from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProductModal from '../components/inventory/ProductModal';
import ConfirmDeleteModal from '../components/ui/ConfirmDeleteModal';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import useInventory from '../hooks/useInventory';

export function Inventory() {
  const {
    products,
    categories,
    loading,
    error,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    refresh,
    addProduct,
    updateProduct,
    deleteProduct
  } = useInventory();

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setModalOpen(true);
  };

  const handleSaveProduct = async (formData) => {
    if (editingProduct) {
      return await updateProduct(editingProduct.id, formData);
    } else {
      return await addProduct(formData);
    }
  };

  const handleOpenDelete = (prod) => {
    setDeletingProduct(prod);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    setDeleting(true);
    await deleteProduct(deletingProduct.id, deletingProduct.name);
    setDeleting(false);
    setDeleteModalOpen(false);
    setDeletingProduct(null);
  };

  // Helper for stock status badge
  const getStockBadge = (stock) => {
    if (stock > 20) {
      return <Badge variant="success">In Stock</Badge>;
    } else if (stock >= 1 && stock <= 20) {
      return <Badge variant="warning">Low Stock ({stock})</Badge>;
    } else {
      return <Badge variant="danger">Out of Stock</Badge>;
    }
  };

  const columns = [
    {
      header: 'Product Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#238cff]/15 border border-[#238cff]/30 text-[#46d5ff] flex items-center justify-center shrink-0">
            <Boxes className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-white block">{row.name}</span>
            <span className="text-[11px] text-slate-400 font-mono">ID: #{row.id}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
          {row.category || 'General'}
        </span>
      )
    },
    {
      header: 'Stock Units',
      accessor: 'stock',
      render: (row) => (
        <span className="font-bold text-white text-sm">{row.stock}</span>
      )
    },
    {
      header: 'Status',
      accessor: 'stock',
      render: (row) => getStockBadge(row.stock)
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
            title="Edit Product"
            aria-label={`Edit ${row.name}`}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenDelete(row)}
            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors border border-white/10"
            title="Delete Product"
            aria-label={`Delete ${row.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Inventory Management"
        subtitle="Track warehouse inventory, monitor stock levels and manage products efficiently."
        action={
          <Button onClick={handleOpenAdd} variant="primary" icon={Plus}>
            Add Product
          </Button>
        }
      />

      {/* Filter & Search Bar */}
      <div className="bg-[#182331] border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xl">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by product name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-velora pl-10 text-xs"
          />
        </div>

        {/* Category & Status Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#46d5ff]" />
            <span className="text-xs font-medium text-slate-400 hidden sm:inline">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-velora text-xs py-2 bg-[#0d1827] min-w-[130px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400 hidden sm:inline">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-velora text-xs py-2 bg-[#0d1827] min-w-[130px]"
            >
              <option value="All">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <Button onClick={refresh} variant="ghost" size="sm" icon={RefreshCw} title="Refresh Inventory">
            Refresh
          </Button>
        </div>

      </div>

      {/* Data Section */}
      {loading ? (
        <LoadingState message="Fetching inventory catalogue from backend MySQL service..." />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : products.length === 0 ? (
        <EmptyState
          title="No Products Found"
          description={search ? `No products matching "${search}"` : "Your inventory catalogue is currently empty."}
          actionLabel="Add New Product"
          onAction={handleOpenAdd}
        />
      ) : (
        <DataTable columns={columns} data={products} keyField="id" />
      )}

      {/* Add / Edit Product Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={deletingProduct ? deletingProduct.name : ''}
        loading={deleting}
      />
    </div>
  );
}

export default Inventory;
