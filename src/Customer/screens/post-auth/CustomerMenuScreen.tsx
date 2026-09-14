import React, { useState } from 'react';
import { MOCK_CATALOG_ITEMS } from '../../../data/mockData';
import { Plus, Search, ShoppingBag } from 'lucide-react';
import { CustomerCartOverlay } from '../../components/shared/CustomerCartOverlay';
import { CatalogItem } from '../../../types';

export const CustomerMenuScreen = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cartItems, setCartItems] = useState<(CatalogItem & { quantity: number })[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(MOCK_CATALOG_ITEMS.map(item => item.category)))];

  // Filter items
  const items = activeCategory === 'All' 
    ? MOCK_CATALOG_ITEMS 
    : MOCK_CATALOG_ITEMS.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: CatalogItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(i => {
        if (i.id === id) {
          const newQ = Math.max(0, i.quantity + delta);
          return { ...i, quantity: newQ };
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-[1280px] mx-auto pb-24 relative min-h-[80vh]">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-[#222]">Menu / Order</h2>
          <p className="text-sm text-[#666] mt-1">Order ahead and skip the line.</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-[#999] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search the menu..." 
            className="w-full md:w-64 pl-9 pr-4 py-2 bg-white border border-[#E6E6E6] rounded-xl text-sm focus:outline-none focus:border-[#C89B3C] focus:ring-1 focus:ring-[#C89B3C] transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat 
                ? 'bg-[#222] text-white shadow-md' 
                : 'bg-white border border-[#E6E6E6] text-[#666] hover:border-[#C89B3C] hover:text-[#C89B3C]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-[24px] border border-[#E6E6E6] overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-[#222] shadow-sm">
                  {item.category}
                </span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex-1">
                <h3 className="font-black text-[#222] mb-1 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-[#666] line-clamp-2 mb-3">{item.cuppingNotes}</p>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-black text-[#C89B3C]">${item.price.toFixed(2)}</p>
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="w-8 h-8 rounded-full bg-[#F8F8F6] border border-[#E6E6E6] flex items-center justify-center hover:bg-[#C89B3C] hover:border-[#C89B3C] hover:text-white transition-colors text-[#222]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Button */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-50 animate-in slide-in-from-bottom-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-[#222] text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 hover:bg-black transition-all"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C89B3C] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            </div>
            <span className="font-bold text-sm">View Cart</span>
          </button>
        </div>
      )}

      {/* Cart Overlay */}
      <CustomerCartOverlay 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};
