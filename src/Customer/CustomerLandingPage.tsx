import React from 'react';
import { Coffee, ArrowRight, ShieldCheck, Clock, Utensils } from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const CustomerLandingPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1615] font-sans flex flex-col selection:bg-[#FAF6EE] selection:text-[#A37837]">
      
      {/* Top Navbar */}
      <nav className="bg-transparent absolute top-0 w-full z-50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-10 h-24 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <Coffee className="w-8 h-8 text-[#A37837]" />
            <span className="text-2xl font-bold tracking-[0.2em] text-white uppercase">REVIA</span>
          </div>

          {/* Centered Menu Links */}
          <div className="hidden md:flex items-center gap-8">
            <button className="text-sm font-semibold text-white tracking-widest uppercase transition-colors">Home</button>
            <button className="text-sm font-semibold text-white/70 hover:text-white tracking-widest uppercase transition-colors">Menu</button>
            <button className="text-sm font-semibold text-white/70 hover:text-white tracking-widest uppercase transition-colors">Heritage</button>
            <button className="text-sm font-semibold text-white/70 hover:text-white tracking-widest uppercase transition-colors">Reservations</button>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate?.('/login')}
              className="text-sm font-semibold text-white/90 hover:text-white tracking-widest uppercase transition-colors"
            >
              Sign In
            </button>
            <button 
              className="bg-white hover:bg-gray-100 text-[#1A1615] px-6 py-2.5 rounded-sm text-sm font-bold tracking-widest uppercase transition-colors"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex items-center justify-center min-h-[90vh]">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000" 
            alt="Cafe Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1615]/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1615]/80 via-transparent to-[#FAF8F5]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-20">
          <p className="text-[#D4B58A] text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-6">
            Welcome to the Mayfair Atelier
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8 drop-shadow-lg">
            Elevating the Art of <br /> <span className="text-[#D4B58A] italic font-serif">Sensory Curations</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Experience our world-class micro-lot roasts, private cellar allocations, and table-side culinary artistry.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="group bg-[#A37837] hover:bg-[#8A652E] text-white px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3 w-full sm:w-auto justify-center shadow-2xl"
            >
              Explore the Menu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              className="bg-transparent border border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-all w-full sm:w-auto justify-center backdrop-blur-sm"
            >
              Our Heritage
            </button>
          </div>
        </div>
      </main>

      {/* The Atelier Experience Section */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <p className="text-[#A37837] text-xs font-bold uppercase tracking-[0.2em] mb-4">The Experience</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1615] mb-6 leading-tight">
              A Symphony of <br/><span className="italic font-serif text-[#5C544E]">Taste & Time</span>
            </h2>
            <p className="text-[#5C544E] text-lg leading-relaxed mb-8">
              At Revia, we believe that true luxury lies in the details. Every cup is a journey, every dish a masterpiece. Our sommeliers and chefs work in perfect harmony to orchestrate an unforgettable sensory cadence tailored exactly to your palate.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-[#1A1615] mb-2 text-xl">19+</h4>
                <p className="text-sm text-[#7C746C]">Rare Micro-Lot Roasts</p>
              </div>
              <div>
                <h4 className="font-bold text-[#1A1615] mb-2 text-xl">13.2°C</h4>
                <p className="text-sm text-[#7C746C]">Cellar Temperature</p>
              </div>
            </div>
            <button className="text-[#A37837] font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:gap-4 transition-all">
              View Allocations <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 relative">
            <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000" alt="Coffee Pour" className="w-full h-auto rounded-tr-[100px] rounded-bl-[100px] shadow-2xl" />
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
              <ShieldCheck className="w-8 h-8 text-[#A37837] mb-3" />
              <h4 className="font-bold text-[#1A1615] mb-1">Authenticity Guaranteed</h4>
              <p className="text-xs text-[#7C746C]">Direct farm allocations, lot verified.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#A37837] text-xs font-bold uppercase tracking-[0.2em] mb-4">Curations</p>
            <h2 className="text-4xl font-bold text-[#1A1615] mb-4">Featured Collections</h2>
            <p className="text-[#5C544E]">Discover a glimpse of what awaits you in our Mayfair Atelier.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-4 h-80">
                <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800" alt="Coffee" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1615] mb-2 group-hover:text-[#A37837] transition-colors">Micro-Lot Extractions</h3>
              <p className="text-sm text-[#7C746C]">Siphon, V60, and Kyoto Drip methods featuring the world's most sought-after beans.</p>
            </div>
            {/* Card 2 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-4 h-80">
                <img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800" alt="Wine" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1615] mb-2 group-hover:text-[#A37837] transition-colors">Sommelier Allocations</h3>
              <p className="text-sm text-[#7C746C]">Rare vintages and Grand Cru selections, perfectly cellared and served table-side.</p>
            </div>
            {/* Card 3 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-4 h-80">
                <img src="https://images.unsplash.com/photo-1621841957884-1210fe19b66d?auto=format&fit=crop&q=80&w=800" alt="Food" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1615] mb-2 group-hover:text-[#A37837] transition-colors">Atelier Savory</h3>
              <p className="text-sm text-[#7C746C]">Synchronized culinary courses designed to complement your extraction profile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Private Memberships CTA */}
      <section className="py-24 bg-[#1A1615] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[200%] bg-[#A37837] blur-[150px] rounded-full mix-blend-screen" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ShieldCheck className="w-12 h-12 text-[#D4B58A] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">The Obsidian Reserve</h2>
          <p className="text-lg text-gray-300 mb-10 font-light">
            Gain exclusive access to pre-release micro-lots, private tasting vaults, and priority seating by joining our Obsidian Reserve membership.
          </p>
          <button className="bg-[#D4B58A] hover:bg-[#C2A378] text-[#1A1615] px-8 py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-colors">
            Inquire Membership
          </button>
        </div>
      </section>

      {/* Quick Info Bar */}
      <div className="bg-[#FAF8F5] relative z-20 py-12 border-b border-[#EAE6E1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="max-w-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A37837] mb-2">Location</h4>
            <p className="text-[#5C544E] text-sm">42 Mount St, London W1K 2RX<br/>The Cavendish Alcove</p>
          </div>
          <div className="max-w-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A37837] mb-2">Cellar Hours</h4>
            <p className="text-[#5C544E] text-sm">Mon - Sun: 11:00 AM - 11:30 PM<br/>Reservations Highly Recommended</p>
          </div>
          <div className="max-w-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A37837] mb-2">Concierge</h4>
            <p className="text-[#5C544E] text-sm">+44 20 7499 1234<br/>atelier@revia.com</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#A37837] mb-1">REVIA</h4>
            <p className="text-xs text-[#7C746C]">© 2026 Revia Hospitality</p>
          </div>
          <div className="flex gap-8 text-xs font-bold text-[#7C746C] uppercase tracking-widest">
            <a href="#" className="hover:text-[#A37837] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#A37837] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#A37837] transition-colors">Press</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
