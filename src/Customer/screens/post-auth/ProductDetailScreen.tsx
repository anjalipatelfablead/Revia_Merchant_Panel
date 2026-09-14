import React, { useState } from 'react';
import { ChevronLeft, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { MOCK_CATALOG_ITEMS } from '../../../data/mockData';
import { MOCK_ADDONS } from '../../data/mockData';
import { CatalogItem } from '../../../types';

interface Props {
  productId: string;
  onBack: () => void;
  addItem: (item: CatalogItem) => void;
}

export const ProductDetailScreen: React.FC<Props> = ({ productId, onBack, addItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const product = MOCK_CATALOG_ITEMS.find(i => i.id === productId);

  if (!product) return null;

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const addonsTotal = MOCK_ADDONS.reduce(
    (sum, a) => (selectedAddons.includes(a.id) ? sum + a.price : sum),
    0
  );

  const unitPrice = product.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    onBack();
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full h-full pb-24 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#666] hover:text-[#222] bg-white px-4 py-2 rounded-full border border-[#E6E6E6] shadow-sm hover:shadow-md transition-all"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Menu
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Col: Sticky Smaller Image & Thumbnails */}
        <div className="lg:col-span-5">
          <div className="space-y-4 lg:sticky lg:top-24">
            {/* Main Image */}
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-lg border border-[#E6E6E6] group bg-[#F8F8F6]">
              <img 
                src={[
                  product.image,
                  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
                  "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800"
                ][activeImageIndex]} 
                alt={product.title} 
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" 
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-[#222] shadow-sm uppercase tracking-[0.2em]">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scrollbar py-2">
              {[
                product.image,
                "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800"
              ].map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 shrink-0 rounded-xl overflow-hidden transition-all ${
                    activeImageIndex === idx 
                      ? 'ring-2 ring-[#C89B3C] ring-offset-2 scale-95 opacity-100 shadow-sm' 
                      : 'opacity-50 hover:opacity-100 hover:scale-95 border border-[#E6E6E6]'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Details */}
        <div className="lg:col-span-7 flex flex-col py-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-[#222] leading-[1.1] mb-3 tracking-tight">{product.title}</h1>
            <p className="text-2xl font-black text-[#C89B3C] mb-8">${product.price.toFixed(2)}</p>

            <div className="space-y-8">
              
              {/* Description */}
              <div>
                <h3 className="text-[10px] font-black text-[#222] uppercase tracking-[0.2em] mb-3">About this item</h3>
                <p className="text-[#666] text-base leading-relaxed">
                  Experience the rich flavors and carefully selected ingredients of our {product.title}. Prepared fresh upon order for the best taste.
                </p>
              </div>

              {/* Tasting Notes */}
              {product.cuppingNotes && (
                <div>
                  <h3 className="text-[10px] font-black text-[#222] uppercase tracking-[0.2em] mb-3">Tasting Notes</h3>
                  <div className="bg-[#F8F8F6] rounded-2xl p-5 border border-[#E6E6E6] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#C89B3C]" />
                    <p className="text-[#666] text-base font-medium italic">"{product.cuppingNotes}"</p>
                  </div>
                </div>
              )}

              {/* Add-ons Configuration */}
              <div>
                <h3 className="text-[10px] font-black text-[#222] uppercase tracking-[0.2em] mb-3">Customize</h3>
                <div className="space-y-3">
                  {MOCK_ADDONS.map(addon => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isSelected ? 'border-[#C89B3C] bg-[#FFF8ED] shadow-sm' : 'border-[#E6E6E6] bg-white hover:border-[#C89B3C]'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#C89B3C] border-[#C89B3C]' : 'border-[#CCC] bg-white'}`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="font-bold text-[#222] text-sm">{addon.name}</span>
                        </div>
                        <span className={`font-bold text-sm ${isSelected ? 'text-[#C89B3C]' : 'text-[#666]'}`}>
                          +${addon.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="mt-10 pt-6 border-t border-[#E6E6E6] flex flex-col sm:flex-row items-center gap-4 sticky bottom-4 z-10 bg-[#F8F8F6] p-4 rounded-3xl shadow-lg border border-[#E6E6E6] shadow-black/5">
            
            {/* Quantity Selector */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-4 bg-white rounded-xl px-4 py-3 border border-[#E6E6E6]">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-[#222] bg-[#F8F8F6] rounded-full hover:bg-[#E6E6E6] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-black w-6 text-center text-[#222]">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-[#222] bg-[#F8F8F6] rounded-full hover:bg-[#E6E6E6] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="w-full flex-1 bg-gradient-to-r from-[#222] to-black hover:from-[#333] hover:to-[#111] text-white rounded-xl py-4 font-black flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-base">Add to Cart • ${(totalPrice).toFixed(2)}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
