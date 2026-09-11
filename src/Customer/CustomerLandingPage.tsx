import React, { useEffect } from 'react';
import {
  ArrowRight, QrCode, Star, Gift, BarChart3, Globe,
  MessageSquare, Store, Smartphone, Monitor, ChevronRight,
  Settings, Users, ShoppingBag, MapPin, CreditCard,
  Wine, CheckCircle2, Heart, Search, FileText, UserCircle,
  Target
} from 'lucide-react';

// --- REUSABLE COMPONENTS ---

const SectionHeading = ({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-5xl font-bold text-[#222222] tracking-tight mb-6 leading-tight">{title}</h2>
    {subtitle && <p className="text-lg text-[#666666] max-w-3xl mx-auto leading-relaxed">{subtitle}</p>}
  </div>
);

const PrimaryButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <button className={`bg-[#C89B3C] hover:bg-[#B38832] text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-[#C89B3C]/20 flex items-center justify-center gap-2 ${className}`}>
    {children}
  </button>
);

const SecondaryButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <button className={`bg-white hover:bg-[#F8F8F6] text-[#222222] border border-[#E8E8E8] px-8 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${className}`}>
    {children}
  </button>
);

const MockupCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-[24px] border border-[#E8E8E8] shadow-2xl shadow-black/5 overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- MAIN PAGE COMPONENT ---

export const FableadLandingPage: React.FC = () => {

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#222222] font-sans selection:bg-[#C89B3C] selection:text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#E8E8E8]">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C89B3C] flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">R</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#222222]">REVIA</span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-[#666666]">
            <a href="#journey" className="hover:text-[#C89B3C] transition-colors">Journey</a>
            <a href="#builder" className="hover:text-[#C89B3C] transition-colors">Platform</a>
            <a href="#benefits" className="hover:text-[#C89B3C] transition-colors">Benefits</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-medium text-[#666666] hover:text-[#C89B3C] transition-colors">Log in</button>
            <button className="bg-[#222222] hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* SECTION 1 — HERO */}
      <section className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto overflow-hidden relative">
        {/* Subtle Background Glows */}
        <div className="absolute top-20 right-0 -z-10 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C89B3C]/10 via-transparent to-transparent rounded-full blur-3xl opacity-60"></div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 z-10">
            <h1 className="text-5xl lg:text-[4rem] font-bold leading-[1.1] tracking-tight text-[#222222]">
              Turn Every Customer Interaction Into <span className="text-[#C89B3C]">Growth</span>
            </h1>
            <p className="text-xl text-[#666666] leading-relaxed max-w-xl">
              Create powerful QR-powered campaigns, rewards and personalized customer experiences that help businesses engage customers and grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <PrimaryButton className="w-full sm:w-auto px-10">Create Your Campaign</PrimaryButton>
              <SecondaryButton className="w-full sm:w-auto px-10">See How It Works</SecondaryButton>
            </div>
            <p className="text-sm font-medium text-[#C89B3C] tracking-widest uppercase pt-4">
              Build. Engage. Reward. Grow.
            </p>
          </div>

          <div className="flex-1 relative w-full lg:w-auto flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] aspect-square">
              {/* Main Dashboard Mockup */}
              <MockupCard className="absolute inset-0 z-10 transform lg:rotate-[-2deg] hover:rotate-0 transition-transform duration-700 bg-[#FFFFFF]">
                <div className="h-14 border-b border-[#E8E8E8] bg-[#F8F8F6] flex items-center px-4 gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#E8E8E8]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#E8E8E8]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#E8E8E8]"></div>
                  </div>
                  <div className="h-6 flex-1 bg-white rounded-md border border-[#E8E8E8]"></div>
                </div>
                <div className="p-6 flex flex-col h-[calc(100%-3.5rem)]">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-1">Campaign Performance</p>
                      <h3 className="text-3xl font-bold text-[#222222]">24,592</h3>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-24 h-8 bg-[#F8F8F6] rounded-lg border border-[#E8E8E8]"></div>
                      <div className="w-8 h-8 bg-[#C89B3C] rounded-lg"></div>
                    </div>
                  </div>
                  {/* Fake Chart */}
                  <div className="flex-1 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] relative overflow-hidden flex items-end p-4 gap-2">
                    {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#C89B3C] rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="h-16 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]"></div>
                    <div className="h-16 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]"></div>
                    <div className="h-16 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]"></div>
                  </div>
                </div>
              </MockupCard>

              {/* Floating Element 1 */}
              <MockupCard className="absolute -left-12 top-20 w-48 p-4 z-20 transform rotate-[-6deg] hover:rotate-[-2deg] transition-all duration-500 hidden md:block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#E8E8E8] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#222222]">Sarah Jenkins</p>
                    <div className="flex text-[#C89B3C]">
                      <Star className="w-2 h-2 fill-current" /><Star className="w-2 h-2 fill-current" /><Star className="w-2 h-2 fill-current" /><Star className="w-2 h-2 fill-current" /><Star className="w-2 h-2 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-[#666666]">"Incredible tableside experience!"</p>
              </MockupCard>

              {/* Floating Element 2 */}
              <MockupCard className="absolute -right-8 bottom-12 w-40 p-4 z-20 transform rotate-[4deg] hover:rotate-[0deg] transition-all duration-500 hidden md:block">
                <div className="aspect-square bg-[#F8F8F6] rounded-xl flex items-center justify-center border border-[#E8E8E8] mb-3">
                  <QrCode className="w-16 h-16 text-[#222222]" />
                </div>
                <p className="text-[10px] font-bold text-center text-[#222222]">Table 12 Active</p>
              </MockupCard>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PRODUCT INTRO */}
      <section className="bg-[#F8F8F6] py-24 px-6 border-y border-[#E8E8E8]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            title="Everything You Need to Create Better Customer Experiences"
            subtitle="REVIA connects campaigns, QR experiences, reviews, recommendations, rewards and customer insights into one seamless journey."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: QrCode, title: "QR Campaigns", desc: "Connect customers to your digital experience instantly." },
              { icon: Star, title: "Customer Reviews", desc: "Turn customer interactions into valuable feedback and reviews." },
              { icon: Target, title: "Personalized Experiences", desc: "Deliver relevant products, offers and recommendations." }, // Changed icon slightly for variety
              { icon: Gift, title: "Rewards & Loyalty", desc: "Create incentives that bring customers back." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-[24px] border border-[#E8E8E8] hover:border-[#C89B3C]/40 transition-colors shadow-sm">
                <div className="w-12 h-12 bg-[#F8F8F6] rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-[#C89B3C]" />
                </div>
                <h3 className="text-lg font-bold text-[#222222] mb-3">{feature.title}</h3>
                <p className="text-[#666666] leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS (13 STEPS) */}
      <section id="journey" className="py-32 px-6 max-w-[1200px] mx-auto relative">
        <SectionHeading
          title="The Connected Customer Journey"
          subtitle="Explore the complete 13-step lifecycle powered by REVIA."
        />

        <div className="space-y-32 relative before:absolute before:inset-0 before:ml-[50%] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#E8E8E8] before:via-[#C89B3C] before:to-[#E8E8E8]">
          {[
            {
              step: 1, title: "Set Up Your Business Experience", icon: Settings,
              desc: "Create your business profile, configure your campaign and prepare your customer journey.",
              mockup: (
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#E8E8E8]">
                    <div className="w-10 h-10 bg-[#F8F8F6] rounded-lg"></div>
                    <div><div className="h-3 w-24 bg-[#E8E8E8] rounded-full mb-1"></div><div className="h-2 w-16 bg-[#F8F8F6] rounded-full"></div></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 bg-[#F8F8F6] rounded-md w-full border border-[#E8E8E8]"></div>
                    <div className="h-8 bg-[#F8F8F6] rounded-md w-3/4 border border-[#E8E8E8]"></div>
                  </div>
                  <div className="mt-4 flex justify-end"><div className="h-8 w-24 bg-[#222222] rounded-full"></div></div>
                </div>
              )
            },
            {
              step: 2, title: "Connect Customers With QR", icon: QrCode,
              desc: "Generate a QR code that instantly connects customers to your digital experience.",
              mockup: (
                <div className="flex flex-col items-center justify-center p-8 bg-[#F8F8F6] h-full">
                  <div className="w-32 h-32 bg-white p-3 rounded-2xl shadow-sm border border-[#E8E8E8]">
                    <QrCode className="w-full h-full text-[#222222]" />
                  </div>
                  <p className="mt-4 text-xs font-bold text-[#666666] tracking-widest uppercase">Scan to Open</p>
                </div>
              )
            },
            {
              step: 3, title: "Turn Experiences Into Reviews", icon: Star,
              desc: "Guide customers through a simple review experience and collect valuable feedback.",
              mockup: (
                <div className="flex flex-col items-center justify-center p-8 h-full bg-white">
                  <h4 className="font-bold text-[#222222] mb-4">Rate your experience</h4>
                  <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-8 h-8 text-[#C89B3C] fill-current" />)}
                  </div>
                  <div className="w-full h-20 bg-[#F8F8F6] border border-[#E8E8E8] rounded-xl p-3">
                    <div className="h-2 w-1/2 bg-[#E8E8E8] rounded-full"></div>
                  </div>
                </div>
              )
            },
            {
              step: 4, title: "Create an Engaging Offer Experience", icon: Gift,
              desc: "Present relevant dining experiences, offers and promotions to customers.",
              mockup: (
                <div className="p-4 grid grid-cols-2 gap-3 h-full bg-[#F8F8F6]">
                  <div className="bg-white rounded-xl p-3 border border-[#E8E8E8] shadow-sm">
                    <div className="h-20 bg-[#F8F8F6] rounded-lg mb-2"></div>
                    <div className="h-3 w-3/4 bg-[#E8E8E8] rounded-full mb-1"></div>
                    <div className="h-2 w-1/2 bg-[#E8E8E8] rounded-full"></div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-[#E8E8E8] shadow-sm">
                    <div className="h-20 bg-[#F8F8F6] rounded-lg mb-2"></div>
                    <div className="h-3 w-3/4 bg-[#E8E8E8] rounded-full mb-1"></div>
                    <div className="h-2 w-1/2 bg-[#E8E8E8] rounded-full"></div>
                  </div>
                </div>
              )
            },
            {
              step: 5, title: "Engage Customers", icon: MessageSquare,
              desc: "Give customers an interactive experience where they can explore products, content and offers.",
              mockup: (
                <div className="flex flex-col h-full bg-white p-4">
                  <div className="flex gap-2 mb-4 overflow-hidden">
                    <div className="h-6 w-16 rounded-full bg-[#222222]"></div>
                    <div className="h-6 w-20 rounded-full bg-[#F8F8F6] border border-[#E8E8E8]"></div>
                    <div className="h-6 w-24 rounded-full bg-[#F8F8F6] border border-[#E8E8E8]"></div>
                  </div>
                  <div className="flex-1 border border-[#E8E8E8] rounded-xl bg-[#F8F8F6] flex flex-col p-3">
                    <div className="h-24 bg-white rounded-lg border border-[#E8E8E8] mb-2 flex items-center justify-center">
                      <Monitor className="w-8 h-8 text-[#E8E8E8]" />
                    </div>
                    <div className="h-8 bg-[#C89B3C] rounded-lg w-full mt-auto"></div>
                  </div>
                </div>
              )
            },
            {
              step: 6, title: "Showcase Products & Rewards", icon: ShoppingBag,
              desc: "Present detailed product information and connect customers with relevant rewards.",
              mockup: (
                <div className="flex flex-col h-full bg-white">
                  <div className="h-32 bg-[#F8F8F6] w-full relative">
                    <div className="absolute -bottom-6 left-4 w-12 h-12 bg-white rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                      <Gift className="w-5 h-5 text-[#C89B3C]" />
                    </div>
                  </div>
                  <div className="p-4 pt-8">
                    <div className="h-4 w-1/2 bg-[#E8E8E8] rounded-full mb-2"></div>
                    <div className="h-2 w-full bg-[#F8F8F6] rounded-full mb-1"></div>
                    <div className="h-2 w-2/3 bg-[#F8F8F6] rounded-full mb-4"></div>
                    <div className="h-10 w-full bg-[#222222] rounded-xl mt-auto"></div>
                  </div>
                </div>
              )
            },
            {
              step: 7, title: "Connect the Experience to the Table", icon: Store,
              desc: "Create a seamless tableside experience for customers.",
              mockup: (
                <div className="flex flex-col h-full bg-[#F8F8F6] p-4">
                  <div className="bg-white rounded-xl border border-[#E8E8E8] p-3 mb-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C89B3C]" />
                      <span className="text-xs font-bold text-[#222222]">Table 14</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#666666] bg-[#F8F8F6] px-2 py-1 rounded">Active</span>
                  </div>
                  <div className="flex-1 bg-white rounded-xl border border-[#E8E8E8] p-3">
                    <div className="h-8 bg-[#F8F8F6] rounded mb-2"></div>
                    <div className="h-8 bg-[#F8F8F6] rounded mb-2"></div>
                    <div className="h-8 bg-[#F8F8F6] rounded"></div>
                  </div>
                </div>
              )
            },
            {
              step: 8, title: "Launch Your Campaign", icon: Monitor,
              desc: "Publish your campaign and make the complete experience available to customers.",
              mockup: (
                <div className="flex flex-col h-full bg-white p-4 justify-center items-center text-center border-4 border-[#F8F8F6]">
                  <div className="w-16 h-16 bg-[#C89B3C]/10 rounded-full flex items-center justify-center mb-4">
                    <Globe className="w-8 h-8 text-[#C89B3C]" />
                  </div>
                  <h4 className="font-bold text-[#222222] mb-1">Campaign is Live</h4>
                  <p className="text-[10px] text-[#666666] mb-4">Users can now scan and interact</p>
                  <div className="w-full h-8 bg-[#F8F8F6] rounded-lg border border-[#E8E8E8]"></div>
                </div>
              )
            },
            {
              step: 9, title: "Deliver Personalized Recommendations", icon: Wine,
              desc: "Help customers discover the right products through personalized recommendations.",
              mockup: (
                <div className="flex h-full bg-[#F8F8F6] p-4 gap-3">
                  <div className="flex-1 bg-white rounded-xl border border-[#E8E8E8] p-3 shadow-sm">
                    <div className="w-8 h-8 bg-[#C89B3C]/10 rounded-full flex items-center justify-center mb-2">
                      <Star className="w-4 h-4 text-[#C89B3C]" />
                    </div>
                    <div className="h-2 w-3/4 bg-[#E8E8E8] rounded-full mb-1"></div>
                    <div className="h-2 w-1/2 bg-[#F8F8F6] rounded-full"></div>
                  </div>
                  <div className="w-16 flex flex-col gap-2">
                    <div className="flex-1 bg-white rounded-xl border border-[#E8E8E8]"></div>
                    <div className="flex-1 bg-white rounded-xl border border-[#E8E8E8]"></div>
                  </div>
                </div>
              )
            },
            {
              step: 10, title: "Create a Seamless Tableside Experience", icon: Store,
              desc: "Let customers explore, customize and interact directly from their table.",
              mockup: (
                <div className="flex flex-col h-full bg-white border-2 border-[#222222] rounded-[2rem] p-2 m-2 shadow-xl">
                  <div className="h-4 bg-[#F8F8F6] rounded-full w-1/3 mx-auto mb-4"></div>
                  <div className="flex-1 bg-[#F8F8F6] rounded-xl p-3 flex flex-col gap-2">
                    <div className="h-10 bg-white rounded-lg border border-[#E8E8E8]"></div>
                    <div className="h-10 bg-white rounded-lg border border-[#E8E8E8]"></div>
                    <div className="mt-auto h-8 bg-[#222222] rounded-lg"></div>
                  </div>
                </div>
              )
            },
            {
              step: 11, title: "Keep Customers Engaged After Their Visit", icon: Heart,
              desc: "Continue the customer relationship even after they leave.",
              mockup: (
                <div className="flex flex-col items-center justify-center h-full bg-[#F8F8F6] p-6 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#C89B3C]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#222222] mb-1">Thank You!</h4>
                  <div className="h-2 w-24 bg-[#E8E8E8] rounded-full mx-auto mb-4"></div>
                  <div className="w-full h-10 bg-white border border-[#E8E8E8] rounded-xl flex items-center justify-center">
                    <div className="h-2 w-16 bg-[#C89B3C] rounded-full"></div>
                  </div>
                </div>
              )
            },
            {
              step: 12, title: "Understand Your Customers Better", icon: UserCircle,
              desc: "Bring customer preferences, visits, purchases and engagement into one profile.",
              mockup: (
                <div className="flex flex-col h-full bg-white p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#C89B3C] rounded-full text-white flex items-center justify-center font-bold">JD</div>
                    <div>
                      <div className="h-3 w-20 bg-[#222222] rounded-full mb-1"></div>
                      <div className="h-2 w-16 bg-[#E8E8E8] rounded-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="h-12 bg-[#F8F8F6] rounded-lg"></div>
                    <div className="h-12 bg-[#F8F8F6] rounded-lg"></div>
                  </div>
                  <div className="flex-1 bg-[#F8F8F6] rounded-lg border border-[#E8E8E8]"></div>
                </div>
              )
            },
            {
              step: 13, title: "Reward Customers for Their Engagement", icon: Gift,
              desc: "Turn engagement into loyalty with personalized rewards and offers.",
              mockup: (
                <div className="flex flex-col h-full bg-[#F8F8F6] p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#C89B3C]/10 rounded-full blur-xl"></div>
                  <div className="bg-white rounded-xl border border-[#C89B3C]/30 p-4 shadow-sm mb-3 relative z-10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-[#C89B3C]">GOLD TIER</span>
                      <Star className="w-4 h-4 text-[#C89B3C] fill-current" />
                    </div>
                    <div className="h-3 w-1/2 bg-[#222222] rounded-full mb-2"></div>
                    <div className="w-full bg-[#E8E8E8] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#C89B3C] w-[70%] h-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 relative z-10">
                    <div className="h-16 bg-white rounded-xl border border-[#E8E8E8]"></div>
                    <div className="h-16 bg-white rounded-xl border border-[#E8E8E8]"></div>
                  </div>
                </div>
              )
            }
          ].map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={item.step} className={`relative flex flex-col md:flex-row items-center gap-8 lg:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                {/* Timeline Center Node */}
                <div className="absolute left-[50%] -translate-x-1/2 w-10 h-10 bg-white border-4 border-[#F8F8F6] rounded-full shadow-sm z-10 flex items-center justify-center font-bold text-[#222222] text-sm hidden md:flex">
                  {item.step}
                </div>

                {/* Content Side */}
                <div className={`flex-1 w-full text-center md:text-left ${isEven ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-[#F8F8F6] rounded-xl mb-4 text-[#C89B3C] border border-[#E8E8E8] shadow-sm ${isEven ? 'md:ml-auto' : ''}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#222222] mb-3">{item.title}</h3>
                  <p className="text-[#666666] leading-relaxed max-w-sm mx-auto md:mx-0 font-medium ${isEven ? 'md:ml-auto' : ''}">{item.desc}</p>
                </div>

                {/* Mockup Side */}
                <div className={`flex-1 w-full flex justify-center ${isEven ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'}`}>
                  <MockupCard className="w-full max-w-[360px] h-[280px] bg-white group hover:-translate-y-2 transition-all duration-500">
                    {item.mockup}
                  </MockupCard>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 — COMPLETE CUSTOMER JOURNEY VIZ */}
      <section className="bg-[#F8F8F6] py-24 px-6 border-y border-[#E8E8E8] overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            title="One Connected Customer Journey"
            subtitle="From the first scan to long-term loyalty, REVIA connects every interaction."
          />

          <div className="flex items-center gap-3 md:gap-6 overflow-x-auto pb-8 hide-scrollbar px-4 w-full">
            {[
              "Website", "QR", "Review", "Offer", "Engage", "Product",
              "Table", "Live", "Recommend", "Tableside", "Departure", "Patron", "Rewards"
            ].map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex-shrink-0 flex flex-col items-center gap-3 group">
                  <div className="w-12 h-12 bg-white border border-[#E8E8E8] rounded-full flex items-center justify-center font-bold text-xs text-[#222222] shadow-sm group-hover:bg-[#222222] group-hover:text-white group-hover:border-[#222222] transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span className="text-xs font-bold text-[#666666] uppercase tracking-wider group-hover:text-[#222222] transition-colors">{step}</span>
                </div>
                {i < 12 && <ArrowRight className="w-4 h-4 text-[#C89B3C] flex-shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CAMPAIGN BUILDER */}
      <section id="builder" className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#222222] leading-tight">Build Your Campaign Without the Complexity</h2>
            <ul className="space-y-4">
              {[
                "Easy campaign creation",
                "Flexible configuration",
                "Multiple campaign experiences",
                "Real-time preview",
                "QR integration",
                "Reward management"
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-4 text-lg font-medium text-[#666666]">
                  <CheckCircle2 className="w-6 h-6 text-[#C89B3C]" /> {point}
                </li>
              ))}
            </ul>
            <PrimaryButton className="px-10 mt-8">Start Building</PrimaryButton>
          </div>

          <div className="flex-[1.5] w-full">
            <MockupCard className="w-full aspect-[16/10] bg-[#F8F8F6] p-1 flex flex-col">
              <div className="h-12 bg-white rounded-t-2xl border-b border-[#E8E8E8] flex items-center px-4">
                <span className="text-xs font-bold text-[#222222]">Campaign Builder / New Experience</span>
              </div>
              <div className="flex flex-1 overflow-hidden rounded-b-2xl">
                <div className="w-48 bg-white border-r border-[#E8E8E8] p-4 space-y-3">
                  <div className="h-8 bg-[#F8F8F6] rounded-md"></div>
                  <div className="h-8 bg-[#C89B3C]/10 border border-[#C89B3C]/30 text-[#C89B3C] font-bold text-[10px] uppercase flex items-center px-3 rounded-md">Configuration</div>
                  <div className="h-8 bg-[#F8F8F6] rounded-md"></div>
                  <div className="h-8 bg-[#F8F8F6] rounded-md"></div>
                </div>
                <div className="flex-1 bg-[#F8F8F6] p-6">
                  <div className="bg-white border border-[#E8E8E8] rounded-xl h-full p-6 shadow-sm flex flex-col gap-4">
                    <div className="h-10 bg-[#F8F8F6] rounded-lg w-1/3"></div>
                    <div className="h-32 bg-[#F8F8F6] rounded-xl border border-dashed border-[#C89B3C] flex items-center justify-center text-[#C89B3C] text-sm font-bold">Drag & Drop Offers</div>
                    <div className="h-10 bg-[#F8F8F6] rounded-lg w-full mt-auto"></div>
                  </div>
                </div>
              </div>
            </MockupCard>
          </div>
        </div>
      </section>

      {/* SECTION 6 — QR EXPERIENCE */}
      <section className="bg-[#222222] text-white py-32 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full flex justify-center relative">
            <div className="absolute inset-0 bg-[#C89B3C]/10 blur-3xl rounded-full"></div>
            <div className="w-72 bg-white rounded-[2rem] border-8 border-[#333333] shadow-2xl p-8 relative z-10 transform -rotate-3">
              <div className="text-center mb-6">
                <p className="font-bold text-[#222222] text-xl">The Mayfair</p>
                <p className="text-xs text-[#666666]">Scan to order</p>
              </div>
              <div className="aspect-square bg-[#F8F8F6] rounded-2xl flex items-center justify-center p-4">
                <QrCode className="w-full h-full text-[#C89B3C]" />
              </div>
            </div>
            {/* Mobile UI Peeking out */}
            <div className="absolute right-0 bottom-10 w-48 h-72 bg-[#F8F8F6] rounded-[2rem] border-4 border-[#333333] shadow-2xl z-20 transform rotate-6 overflow-hidden p-3 hidden md:flex flex-col gap-2">
              <div className="h-20 bg-white rounded-xl border border-[#E8E8E8] flex items-center justify-center shadow-sm">
                <div className="w-10 h-2 bg-[#E8E8E8] rounded-full"></div>
              </div>
              <div className="h-20 bg-white rounded-xl border border-[#E8E8E8] flex items-center justify-center shadow-sm">
                <div className="w-16 h-2 bg-[#E8E8E8] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8 z-10">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Connect Offline Customers to Your Digital Experience</h2>

            <div className="flex flex-col gap-4">
              {['QR Scan', 'Campaign', 'Explore', 'Engage', 'Review', 'Reward'].map((step, i) => (
                <div key={i} className="flex items-center gap-4 text-lg font-medium text-[#E8E8E8]">
                  <div className="w-8 h-8 rounded-full border border-[#C89B3C] text-[#C89B3C] flex items-center justify-center text-xs font-bold">0{i + 1}</div>
                  {step}
                </div>
              ))}
            </div>

            <PrimaryButton className="mt-8">Create QR Campaign</PrimaryButton>
          </div>
        </div>
      </section>

      {/* SECTION 7 — PERSONALIZATION */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto border-b border-[#E8E8E8]">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#222222] leading-tight">Make Every Customer Experience More Relevant</h2>
            <p className="text-xl text-[#666666]">Leverage patron profiles, preferences, and previous activity to serve highly targeted recommendations and offers.</p>
          </div>
          <div className="flex-1 w-full flex justify-end">
            <MockupCard className="w-full max-w-md bg-[#F8F8F6] p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E8E8E8]">
                <div className="w-16 h-16 rounded-full bg-[#C89B3C] text-white flex items-center justify-center text-2xl font-bold">MC</div>
                <div>
                  <h3 className="text-xl font-bold text-[#222222]">Marcus Chen</h3>
                  <p className="text-sm font-medium text-[#C89B3C]">Reserve Patron • 14 Visits</p>
                </div>
              </div>
              <p className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-4">Personalized Recommendations</p>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-sm flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#222222] text-sm">Aged Wagyu Tartlet</p>
                    <p className="text-xs text-[#666666]">Based on previous order</p>
                  </div>
                  <span className="text-[#C89B3C] bg-[#F8F8F6] px-2 py-1 rounded text-xs font-bold border border-[#E8E8E8]">98% Match</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-sm flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#222222] text-sm">Panama Geisha Pour Over</p>
                    <p className="text-xs text-[#666666]">Matches flavor profile</p>
                  </div>
                  <span className="text-[#C89B3C] bg-[#F8F8F6] px-2 py-1 rounded text-xs font-bold border border-[#E8E8E8]">92% Match</span>
                </div>
              </div>
            </MockupCard>
          </div>
        </div>
      </section>

      {/* SECTION 8 — REWARDS & LOYALTY */}
      <section className="bg-[#F8F8F6] py-32 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <SectionHeading
            title="Give Customers a Reason to Come Back"
            subtitle="Design beautiful digital rewards that sync perfectly with your campaigns and customer profiles."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
            {[
              { title: "Discount", val: "20% OFF", bg: "bg-[#222222]" },
              { title: "Free Item", val: "FREE DRINK", bg: "bg-[#C89B3C]" },
              { title: "Special Offer", val: "BOGO", bg: "bg-[#4A5568]" },
              { title: "Loyalty Reward", val: "500 PTS", bg: "bg-[#2D3748]" },
              { title: "Personalized", val: "VIP GIFT", bg: "bg-[#718096]" }
            ].map((reward, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E8E8E8] shadow-sm overflow-hidden text-left hover:-translate-y-2 transition-transform duration-300">
                <div className={`h-24 ${reward.bg} flex items-center justify-center p-4 text-center`}>
                  <h3 className="text-xl font-bold text-white tracking-widest">{reward.val}</h3>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold text-[#C89B3C] uppercase tracking-widest mb-1">{reward.title}</p>
                  <p className="font-bold text-[#222222] text-sm">Next Visit Reward</p>
                </div>
              </div>
            ))}
          </div>
          <PrimaryButton className="mx-auto">Create a Reward</PrimaryButton>
        </div>
      </section>

      {/* SECTION 9 — BUSINESS BENEFITS */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto">
        <SectionHeading
          title="Everything Your Business Needs to Grow Customer Engagement"
          centered={false}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Increase Customer Engagement", icon: Users },
            { title: "Generate More Reviews", icon: Star },
            { title: "Create QR Experiences", icon: QrCode },
            { title: "Personalize Recommendations", icon: Heart },
            { title: "Build Customer Loyalty", icon: Gift },
            { title: "Manage Campaigns Easily", icon: Monitor }
          ].map((benefit, i) => (
            <div key={i} className="bg-[#F8F8F6] p-8 rounded-[24px] border border-[#E8E8E8] hover:bg-white hover:border-[#C89B3C] transition-colors group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-[#E8E8E8] group-hover:bg-[#C89B3C] transition-colors">
                <benefit.icon className="w-6 h-6 text-[#222222] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-3">{benefit.title}</h3>
              <p className="text-[#666666] leading-relaxed">Leverage REVIA's native toolset to build powerful touchpoints across the entire customer lifecycle.</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10 — LIVE PRODUCT PREVIEW */}
      <section className="bg-[#222222] py-32 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">From Setup to Live in Minutes</h2>

          <div className="flex justify-center items-end gap-6 h-[400px] relative">
            {/* Desktop */}
            <div className="w-[600px] h-[350px] bg-white rounded-t-2xl border-t-8 border-x-8 border-[#333333] hidden lg:block overflow-hidden relative shadow-2xl">
              <div className="h-10 bg-[#F8F8F6] border-b border-[#E8E8E8] flex items-center px-4">
                <div className="flex gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-green-400"></div></div>
              </div>
              <div className="p-8 flex items-center justify-center h-full bg-[#FAFAFA]">
                <div className="text-center">
                  <Monitor className="w-16 h-16 text-[#C89B3C] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#222222]">Campaign Dashboard Live</h3>
                </div>
              </div>
            </div>

            {/* Tablet */}
            <div className="w-[300px] h-[300px] bg-white rounded-t-2xl border-t-8 border-x-8 border-[#444444] hidden md:block overflow-hidden shadow-2xl">
              <div className="p-6 h-full flex flex-col">
                <div className="h-32 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-[#C89B3C]" />
                </div>
                <div className="h-6 w-3/4 bg-[#E8E8E8] rounded-full"></div>
              </div>
            </div>

            {/* Mobile */}
            <div className="w-[220px] h-[380px] bg-white rounded-[2rem] border-8 border-[#111111] overflow-hidden shadow-2xl relative z-10 flex flex-col">
              <div className="h-32 bg-[#222222] w-full flex items-center justify-center relative">
                <div className="absolute top-4 w-1/3 h-1 bg-white/20 rounded-full"></div>
                <Gift className="w-12 h-12 text-[#C89B3C]" />
              </div>
              <div className="p-4 flex-1 flex flex-col bg-[#F8F8F6]">
                <div className="h-4 w-2/3 bg-[#E8E8E8] rounded-full mb-6"></div>
                <div className="h-10 w-full bg-[#C89B3C] rounded-xl mt-auto"></div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-center gap-3 text-sm font-bold text-[#666666] uppercase tracking-widest flex-wrap">
            <span>Create</span> <ArrowRight className="w-4 h-4" />
            <span>Configure</span> <ArrowRight className="w-4 h-4" />
            <span>Preview</span> <ArrowRight className="w-4 h-4" />
            <span>Publish</span> <ArrowRight className="w-4 h-4" />
            <span className="text-[#C89B3C]">Engage</span>
          </div>
        </div>
      </section>

      {/* SECTION 11 — FINAL CTA */}
      <section className="py-32 px-6 bg-[#F8F8F6] border-b border-[#E8E8E8] text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6">Ready to Create Your Next Customer Experience?</h2>
        <p className="text-xl text-[#666666] mb-10 max-w-2xl mx-auto">Build, launch and manage engaging customer experiences with REVIA.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <PrimaryButton className="px-12 py-5 text-lg">Get Started</PrimaryButton>
          <SecondaryButton className="px-12 py-5 text-lg">Book a Demo</SecondaryButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-20 px-6 border-t border-[#E8E8E8]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#C89B3C] flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">R</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#222222]">REVIA</span>
            </div>
            <p className="text-sm text-[#666666] leading-relaxed max-w-xs">Connecting offline interactions to digital growth across the entire hospitality journey.</p>
          </div>

          <div>
            <h4 className="font-bold text-[#222222] mb-6 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-4 text-sm text-[#666666]">
              <li><a href="#" className="hover:text-[#C89B3C] transition-colors">Campaign Builder</a></li>
              <li><a href="#" className="hover:text-[#C89B3C] transition-colors">QR Campaigns</a></li>
              <li><a href="#" className="hover:text-[#C89B3C] transition-colors">Reviews</a></li>
              <li><a href="#" className="hover:text-[#C89B3C] transition-colors">Recommendations</a></li>
              <li><a href="#" className="hover:text-[#C89B3C] transition-colors">Rewards</a></li>
              <li><a href="#" className="hover:text-[#C89B3C] transition-colors">Patron Profiles</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#222222] mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm text-[#666666]">
              <li><a href="#" className="hover:text-[#C89B3C] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#C89B3C] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#C89B3C] transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#222222] mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4 text-sm text-[#666666]">
              <li><a href="#" className="hover:text-[#C89B3C] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#C89B3C] transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-8 border-t border-[#E8E8E8] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#666666]">
          <p>© 2026 REVIA. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-[#F8F8F6] border border-[#E8E8E8] flex items-center justify-center hover:text-[#C89B3C] transition-colors">X</a>
            <a href="#" className="w-8 h-8 rounded-full bg-[#F8F8F6] border border-[#E8E8E8] flex items-center justify-center hover:text-[#C89B3C] transition-colors">in</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
