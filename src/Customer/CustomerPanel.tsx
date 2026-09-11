import React from 'react';

export const CustomerPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col h-screen">
        <h2 className="text-2xl font-bold text-[#A37837] mb-8">Customer Panel</h2>
        <nav className="flex-1 space-y-2">
          <a href="#" className="block px-4 py-2 rounded-lg bg-[#FAF6EE] text-[#A37837] font-medium">Dashboard</a>
          <a href="#" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">My Orders</a>
          <a href="#" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Rewards</a>
          <a href="#" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Settings</a>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">Welcome, John Doe</span>
            <div className="w-10 h-10 bg-[#A37837] rounded-full text-white flex items-center justify-center font-bold">JD</div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Points</h3>
            <p className="text-3xl font-bold text-[#A37837]">1,250</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active Offers</h3>
            <p className="text-3xl font-bold text-[#A37837]">3</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Orders</h3>
            <p className="text-3xl font-bold text-[#A37837]">12</p>
          </div>
        </div>
      </main>
    </div>
  );
};
