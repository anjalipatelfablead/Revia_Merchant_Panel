import React, { useState } from 'react';
import {
  Search,
  Plus,
  Coffee,
  Check,
  Percent,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  DollarSign,
  Layers,
  Award
} from 'lucide-react';
import { CatalogItem, CatalogCategory } from '../types';
import { PrimaryButton } from '../components/common/Badges';

interface CatalogPageProps {
  catalog: CatalogItem[];
  onUpdateItem: (item: CatalogItem) => void;
  onAddItem: (item: CatalogItem) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ catalog, onUpdateItem, onAddItem }) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(catalog[0]?.id || '');
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>('All Items');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected item reference or fallback
  const selectedItem = catalog.find((item) => item.id === selectedItemId) || catalog[0];

  // Editor form state synced to selected item
  const [title, setTitle] = useState(selectedItem?.title || '');
  const [sku, setSku] = useState(selectedItem?.sku || '');
  const [category, setCategory] = useState<CatalogItem['category']>(selectedItem?.category || 'Single Origin Coffee');
  const [price, setPrice] = useState<number>(selectedItem?.price || 0);
  const [cost, setCost] = useState<number>(selectedItem?.cost || 0);
  const [cuppingNotes, setCuppingNotes] = useState(selectedItem?.cuppingNotes || '');
  const [stampsAwarded, setStampsAwarded] = useState<number>(selectedItem?.stampsAwarded || 1);
  const [inStock, setInStock] = useState<boolean>(selectedItem?.inStock ?? true);

  // When selected item changes, update editor state
  const handleSelectProduct = (item: CatalogItem) => {
    setSelectedItemId(item.id);
    setTitle(item.title);
    setSku(item.sku);
    setCategory(item.category);
    setPrice(item.price);
    setCost(item.cost);
    setCuppingNotes(item.cuppingNotes);
    setStampsAwarded(item.stampsAwarded);
    setInStock(item.inStock);
  };

  // Live margin calculation
  const calculatedMargin = price > 0 ? (((price - cost) / price) * 100).toFixed(1) : '0.0';

  const handleSaveItem = () => {
    if (!selectedItem) return;
    const updated: CatalogItem = {
      ...selectedItem,
      title,
      sku,
      category,
      price: Number(price),
      cost: Number(cost),
      margin: Number(calculatedMargin),
      cuppingNotes,
      stampsAwarded: Number(stampsAwarded),
      inStock,
    };
    onUpdateItem(updated);
  };

  const filteredItems = catalog.filter((item) => {
    const matchesCategory = activeCategory === 'All Items' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: CatalogCategory[] = [
    'All Items',
    'Single Origin Coffee',
    'Tasting Flights',
    'Artisanal Bakery',
    'Seasonal Brews',
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
            MENU & SPECIALTY MERCHANDISE // CATALOG
          </span>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#1A1615]">Item &amp; Product Catalog Management</h1>
          <p className="text-xs text-[#6E6A66] mt-0.5">
            Single origin roasts, sensory cupping profiles, unit economics, and loyalty stamp multipliers.
          </p>
        </div>

        <PrimaryButton
          onClick={() => {
            const newItem: CatalogItem = {
              id: `ITEM-0${catalog.length + 1}`,
              sku: `REV-NEW-00${catalog.length + 1}`,
              title: 'Guatemala Huehuetenango Washed',
              category: 'Single Origin Coffee',
              price: 8.75,
              cost: 2.20,
              margin: 74.8,
              image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80',
              inStock: true,
              stockCount: 50,
              cuppingNotes: 'Brown sugar caramel, candied apple, milk chocolate finish.',
              roastProfile: 'Light City Filter Roast',
              stampsAwarded: 1,
              active: true,
            };
            onAddItem(newItem);
            handleSelectProduct(newItem);
          }}
          className="py-2 px-3.5 text-xs font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Menu Item</span>
        </PrimaryButton>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#6E6A66] text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">Active Menu Items</span>
            <Coffee className="w-4 h-4 text-[#9E782F]" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-[#1A1615] mt-1">{catalog.length} Available</div>
          <span className="text-[11px] text-[#0D7A53] font-semibold mt-1 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]" /> 100% Live in POS terminals
          </span>
        </div>

        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#6E6A66] text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">Top Revenue Performer</span>
            <TrendingUp className="w-4 h-4 text-[#0D7A53]" />
          </div>
          <div className="text-base font-bold tracking-tight text-[#1A1615] mt-1 truncate">
            Panama Geisha Flight
          </div>
          <span className="text-[11px] text-[#9E782F] font-semibold mt-1 block">
            ₹24.00 Price • 70.0% Margin
          </span>
        </div>

        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[#6E6A66] text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">Low Inventory Alerts</span>
            <AlertCircle className="w-4 h-4 text-[#D4A753]" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-[#1A1615] mt-1">2 Items Restock</div>
          <span className="text-[11px] text-[#6E6A66] font-medium mt-1 block">
            Hazelnut Cruffin (8 left) & Kouign-Amann
          </span>
        </div>
      </div>

      {/* Filter Bar: Category pill filters + Search */}
      <div className="bg-white border border-[#E5E0D8] rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        {/* Category pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-2xs'
                  : 'bg-[#FAF8F5] text-[#6E6A66] hover:bg-[#F5F4F0] border border-[#E5E0D8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-[#9E9A93] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SKU or title..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-[#1A1615] placeholder:text-[#9E9A93] focus:outline-hidden focus:border-[#D4A753]"
          />
        </div>
      </div>

      {/* Master-Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List: Product rows (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E5E0D8] rounded-xl shadow-xs overflow-hidden">
          <div className="p-3 border-b border-[#E5E0D8] bg-[#FAF8F5] flex items-center justify-between text-[10px] uppercase font-bold text-[#9E9A93] tracking-wider">
            <span>PRODUCTS ({filteredItems.length})</span>
            <span>PRICE & MARGIN</span>
          </div>

          <div className="divide-y divide-[#E5E0D8]">
            {filteredItems.map((item) => {
              const isSelected = item.id === selectedItemId;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectProduct(item)}
                  className={`p-3.5 flex items-center justify-between gap-3 hover:bg-[#FAF8F5]/80 transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#FDF8EB]/50 font-medium' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover border border-[#E5E0D8] shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-[#1A1615] truncate">{item.title}</h4>
                        {item.stampsAwarded > 1 && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#FDF8EB] text-[#9E782F] border border-[#F3E5C8] rounded">
                            +{item.stampsAwarded} Stamps
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#9E9A93] font-mono mt-0.5 flex items-center gap-2">
                        <span>{item.sku}</span>
                        <span>•</span>
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-[#1A1615] font-mono">${item.price.toFixed(2)}</div>
                    <div className="text-[10px] font-semibold text-[#0D7A53]">{item.margin.toFixed(1)}% Margin</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Editor Panel: Edit Item Drawer (5 cols) */}
        {selectedItem && (
          <div className="lg:col-span-5 bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-sm sticky top-20 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                  PRODUCT METADATA EDITOR
                </span>
                <h3 className="text-base font-bold text-[#1A1615]">{selectedItem.title}</h3>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded text-[#6E6A66]">
                {selectedItem.sku}
              </span>
            </div>

            {/* Thumbnail preview with image upload placeholder */}
            <div className="relative rounded-lg overflow-hidden border border-[#E5E0D8] h-36 bg-[#FAF8F5] group">
              <img src={selectedItem.image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 cursor-pointer">
                <ImageIcon className="w-4 h-4" /> Replace Image
              </div>
            </div>

            {/* Item Title & Category */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1">
                  Item Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-[#1A1615]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1">
                  Catalog Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CatalogItem['category'])}
                  className="w-full text-xs px-2.5 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-[#1A1615]"
                >
                  <option value="Single Origin Coffee">Single Origin Coffee</option>
                  <option value="Tasting Flights">Tasting Flights</option>
                  <option value="Artisanal Bakery">Artisanal Bakery</option>
                  <option value="Seasonal Brews">Seasonal Brews</option>
                </select>
              </div>
            </div>

            {/* Cost vs. Price vs. Margin Calculation Badges */}
            <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#9E9A93] mb-1">
                    Retail Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs font-bold px-2.5 py-1.5 bg-white border border-[#E5E0D8] rounded-lg font-mono text-[#1A1615]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#9E9A93] mb-1">
                    Unit Cost ($)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={cost}
                    onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs font-bold px-2.5 py-1.5 bg-white border border-[#E5E0D8] rounded-lg font-mono text-[#1A1615]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E5E0D8] text-xs">
                <span className="text-[#6E6A66]">Net Profit Margin:</span>
                <span className="font-bold text-[#0D7A53] bg-[#E6F4ED] px-2 py-0.5 rounded border border-[#BCE3D1]">
                  {calculatedMargin}% MARGIN (${(price - cost).toFixed(2)} Profit)
                </span>
              </div>
            </div>

            {/* Cupping Notes */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1">
                Sensory Cupping Notes
              </label>
              <textarea
                rows={2}
                value={cuppingNotes}
                onChange={(e) => setCuppingNotes(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-[#1A1615] leading-relaxed"
                placeholder="Aroma, floral notes, body, acidity..."
              />
            </div>

            {/* Loyalty Integration Toggle */}
            <div className="p-3 bg-[#FDF8EB]/60 border border-[#F3E5C8] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#9E782F]" />
                <div>
                  <div className="text-xs font-bold text-[#1A1615]">Loyalty Stamp Award</div>
                  <div className="text-[10px] text-[#6E6A66]">Award stamps upon purchase</div>
                </div>
              </div>
              <select
                value={stampsAwarded}
                onChange={(e) => setStampsAwarded(Number(e.target.value))}
                className="text-xs font-bold px-2 py-1 bg-white border border-[#E5E0D8] rounded-md text-[#9E782F]"
              >
                <option value={1}>+1 Stamp</option>
                <option value={2}>+2 Stamps (Bonus)</option>
                <option value={3}>+3 Stamps (Promo)</option>
              </select>
            </div>

            {/* Save Button */}
            <PrimaryButton onClick={handleSaveItem} className="w-full py-2.5 text-xs font-semibold">
              <Save className="w-3.5 h-3.5" /> Save Catalog Changes
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};
