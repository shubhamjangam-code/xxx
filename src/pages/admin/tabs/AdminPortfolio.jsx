import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  X, 
  Filter,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getPortfolioItems, 
  addPortfolioItem, 
  updatePortfolioItem, 
  deletePortfolioItem 
} from '../../../services/dataService';
import { PORTFOLIO_CATEGORIES } from '../../../data/photographyData';

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Weddings');
  const [formHeightClass, setFormHeightClass] = useState('h-[500px]');
  const [formImageFile, setFormImageFile] = useState(null);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {
    setLoading(true);
    try {
      const data = await getPortfolioItems();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFormImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  function resetForm() {
    setFormTitle('');
    setFormCategory('Weddings');
    setFormHeightClass('h-[500px]');
    setFormImageFile(null);
    setFormImageUrl('');
    setPreviewUrl('');
    setEditingItem(null);
  }

  function handleOpenAdd() {
    resetForm();
    setIsAddModalOpen(true);
  }

  function handleOpenEdit(item) {
    setEditingItem(item);
    setFormTitle(item.title || '');
    setFormCategory(item.category || 'Weddings');
    setFormHeightClass(item.heightClass || 'h-[500px]');
    setFormImageUrl(item.image || '');
    setPreviewUrl(item.image || '');
    setFormImageFile(null);
    setIsAddModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formTitle.trim()) return;

    setSubmitting(true);
    setStatusMsg('');

    try {
      if (editingItem) {
        // Edit mode
        const updated = await updatePortfolioItem(
          editingItem.id, 
          {
            title: formTitle,
            category: formCategory,
            heightClass: formHeightClass,
            image: formImageUrl
          }, 
          formImageFile
        );
        setItems(prev => prev.map(item => item.id === editingItem.id ? updated : item));
        setStatusMsg('Photo updated successfully!');
      } else {
        // Add mode
        const newItem = await addPortfolioItem(
          {
            title: formTitle,
            category: formCategory,
            heightClass: formHeightClass,
            image: formImageUrl
          }, 
          formImageFile
        );
        setItems(prev => [newItem, ...prev]);
        setStatusMsg('New photo added successfully!');
      }
      setTimeout(() => {
        setIsAddModalOpen(false);
        resetForm();
      }, 1000);
    } catch (err) {
      console.error(err);
      setStatusMsg('Error saving photo. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteConfirm(id) {
    try {
      await deletePortfolioItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
      setDeletingId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete item.');
    }
  }

  // Filtered items
  const filteredItems = (items || []).filter(item => {
    if (!item) return false;
    const title = String(item.title || '').toLowerCase();
    const category = String(item.category || '').toLowerCase();
    const search = String(searchTerm || '').toLowerCase();

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = title.includes(search) || category.includes(search);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-[#241C18]/10 shadow-sm">
        <div>
          <h2 className="text-xl font-serif text-[#241C18]">Portfolio Photo Gallery</h2>
          <p className="text-xs text-[#241C18]/60">Manage all website photos, upload new frames, rename titles & categories</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadPortfolio}
            className="p-2.5 rounded-xl border border-[#241C18]/15 hover:bg-[#F8F5EF] text-[#241C18] transition-colors cursor-pointer"
            title="Refresh Portfolio"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-[#8D9B7A] hover:bg-[#7A8868] text-white rounded-xl text-sm font-medium shadow-md shadow-[#8D9B7A]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Photo</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-[#241C18]/10">
        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter className="w-4 h-4 text-[#8D9B7A] flex-shrink-0" />
          {PORTFOLIO_CATEGORIES.map(cat => {
            const count = cat.id === 'All' 
              ? (items || []).length 
              : (items || []).filter(i => i && i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-[#8D9B7A] text-white shadow-sm font-semibold'
                    : 'bg-white/80 hover:bg-white text-[#241C18]/70 border border-[#241C18]/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${selectedCategory === cat.id ? 'bg-white/30 text-white' : 'bg-[#F8F5EF] text-[#8D9B7A]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#241C18]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search photos by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#241C18]/15 rounded-xl text-xs text-[#241C18] focus:outline-none focus:ring-2 focus:ring-[#8D9B7A]"
          />
        </div>
      </div>

      {/* Photos Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-3 border-[#8D9B7A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-[#241C18]/60 font-medium">Loading Portfolio Photos...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-white/50 rounded-2xl border border-dashed border-[#241C18]/20">
          <ImageIcon className="w-12 h-12 text-[#241C18]/20 mx-auto mb-3" />
          <h3 className="text-base font-serif text-[#241C18]">No photos found</h3>
          <p className="text-xs text-[#241C18]/60 mt-1">Try changing category filter or add a new photo</p>
          <button
            onClick={handleOpenAdd}
            className="mt-4 px-4 py-2 bg-[#8D9B7A] text-white text-xs font-medium rounded-xl inline-flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload First Photo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <motion.div
              key={item.id || Math.random()}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl border border-[#241C18]/10 overflow-hidden shadow-sm group hover:shadow-md transition-shadow relative flex flex-col"
            >
              {/* Photo Preview Container */}
              <div className="relative h-48 bg-[#F8F5EF] overflow-hidden">
                <img
                  src={item.image || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"}
                  alt={item.title || "Portfolio Photo"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1519741497674-611481863552?w=800";
                  }}
                />
                <span className="absolute top-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-semibold rounded-md tracking-wider">
                  {item.category || "Portfolio"}
                </span>
              </div>

              {/* Title & Actions Footer */}
              <div className="p-3.5 flex flex-col justify-between flex-grow bg-white">
                <h4 className="font-serif text-sm text-[#241C18] line-clamp-1 mb-3" title={item.title || "Untitled"}>
                  {item.title || "Untitled Photo"}
                </h4>

                <div className="flex items-center justify-between pt-2 border-t border-[#241C18]/5">
                  <span className="text-[11px] text-[#241C18]/50 uppercase tracking-wider font-mono">
                    ID: {String(item.id || '').slice(0, 6)}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-[#8D9B7A] hover:bg-[#8D9B7A]/10 rounded-lg transition-colors"
                      title="Edit Title & Category"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingId(item.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* --- ADD / EDIT MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#241C18]/10 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#241C18]/10">
                <h3 className="font-serif text-lg text-[#241C18]">
                  {editingItem ? 'Edit Portfolio Photo' : 'Add New Portfolio Photo'}
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-[#241C18]/50 hover:text-[#241C18] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {statusMsg && (
                <div className={`p-3 rounded-xl text-xs font-medium ${statusMsg.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                  {statusMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Photo Title */}
                <div>
                  <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">
                    Photo Title / Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Bridal Portrait"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A] focus:outline-none"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A] focus:outline-none bg-white"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Baby & Kids">Baby & Kids</option>
                    <option value="Family & Events">Family & Events</option>
                  </select>
                </div>

                {/* Photo Upload Option */}
                <div>
                  <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">
                    Upload Photo File (From Computer / Mobile)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#241C18]/15 border-dashed rounded-xl bg-[#F8F5EF]/50 hover:bg-[#F8F5EF] transition-colors relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-[#8D9B7A]" />
                      <div className="flex text-xs text-[#241C18]/70">
                        <span className="font-medium text-[#8D9B7A]">Click to select image</span>
                      </div>
                      <p className="text-[10px] text-[#241C18]/50">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Or Paste Image URL */}
                <div>
                  <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">
                    Or Enter Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={formImageUrl}
                    onChange={(e) => {
                      setFormImageUrl(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A] focus:outline-none"
                  />
                </div>

                {/* Preview Image */}
                {previewUrl && (
                  <div>
                    <span className="block text-[11px] font-semibold text-[#241C18]/60 mb-1">Image Preview:</span>
                    <div className="h-32 rounded-xl overflow-hidden border border-[#241C18]/10 bg-[#F8F5EF]">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

                {/* Modal Buttons */}
                <div className="flex justify-end gap-3 pt-3 border-t border-[#241C18]/10">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-[#241C18]/15 text-[#241C18]/70 rounded-xl text-xs hover:bg-[#F8F5EF]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 bg-[#8D9B7A] text-white rounded-xl text-xs font-medium shadow-md shadow-[#8D9B7A]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{editingItem ? 'Update Photo' : 'Upload Photo'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#241C18]/10 shadow-2xl text-center space-y-4"
            >
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#241C18]">Confirm Delete?</h4>
                <p className="text-xs text-[#241C18]/60 mt-1">This photo will be removed permanently from your portfolio gallery.</p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeletingId(null)}
                  className="px-4 py-2 border border-[#241C18]/15 rounded-xl text-xs text-[#241C18]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteConfirm(deletingId)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-medium"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
