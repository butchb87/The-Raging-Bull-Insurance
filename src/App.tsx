import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Shield, 
  Heart, 
  Car, 
  Plane, 
  ChevronRight, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  QrCode, 
  ArrowLeft,
  Menu,
  X,
  User,
  LogOut,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InsuranceProduct, InsuranceApplication, Payment } from './types';
import { auth, signInWithGoogle, logout } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// --- Components ---

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-zinc-100 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-zinc-900">Pioneer</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/products" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">Products</Link>
          <Link to="/about" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">About Us</Link>
          <Link to="/claims" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">Claims</Link>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden border border-zinc-200">
                {user.photoURL ? <img src={user.photoURL} alt="User" referrerPolicy="no-referrer" /> : <User className="w-5 h-5 text-zinc-500" />}
              </div>
              <button onClick={logout} className="text-sm font-medium text-zinc-600 hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={signInWithGoogle}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Sign In
            </button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-zinc-100 p-6 flex flex-col gap-4 shadow-xl"
          >
            <Link to="/products" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link to="/about" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/claims" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Claims</Link>
            {!user && <button onClick={signInWithGoogle} className="bg-blue-600 text-white py-3 rounded-xl font-bold">Sign In</button>}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="pt-40 pb-20 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          One-Stop Insurance Shop
        </span>
        <h1 className="text-6xl md:text-7xl font-bold text-zinc-900 leading-[1.1] mb-8 tracking-tight">
          Protecting what <span className="text-blue-600">matters</span> most.
        </h1>
        <p className="text-xl text-zinc-500 mb-10 leading-relaxed max-w-lg">
          From life savings to travel and motor protection, Pioneer provides comprehensive coverage for every stage of your journey.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/products" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2">
            Browse Products <ChevronRight className="w-5 h-5" />
          </Link>
          <button className="bg-white text-zinc-900 border border-zinc-200 px-8 py-4 rounded-2xl font-bold hover:bg-zinc-50 transition-all">
            Contact an Agent
          </button>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
          <img src="https://picsum.photos/seed/insurance/800/1000" alt="Insurance" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-zinc-100 hidden lg:block">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">Claims Processed</p>
              <p className="text-2xl font-black text-zinc-900">99.8%</p>
            </div>
          </div>
          <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Trusted by millions</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const ProductCard = ({ product }: { product: InsuranceProduct }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group"
  >
    <div className="aspect-video relative overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
      <div className="absolute top-4 left-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${product.type === 'Life' ? 'bg-blue-600 text-white' : 'bg-orange-500 text-white'}`}>
          {product.type}
        </span>
      </div>
    </div>
    <div className="p-8">
      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">{product.category}</p>
      <h3 className="text-2xl font-bold text-zinc-900 mb-4">{product.name}</h3>
      <p className="text-zinc-500 text-sm mb-6 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-400 font-bold uppercase">Starting at</p>
          <p className="text-xl font-black text-zinc-900">₱{product.premium.toLocaleString()}</p>
        </div>
        <Link to={`/apply/${product.id}`} className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
          <ChevronRight className="w-6 h-6" />
        </Link>
      </div>
    </div>
  </motion.div>
);

// --- Pages ---

const HomePage = () => {
  const [products, setProducts] = useState<InsuranceProduct[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <main>
      <Hero />
      <section className="py-20 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-zinc-900 mb-4">Our Products</h2>
              <p className="text-zinc-500 max-w-md">Explore our wide range of insurance solutions tailored to your needs.</p>
            </div>
            <Link to="/products" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
              View all products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(p => (
              <div key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState<InsuranceProduct[]>([]);
  const [filter, setFilter] = useState<'All' | 'Life' | 'Non-Life'>('All');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.type === filter);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-zinc-900 mb-12">Insurance Solutions</h1>
        
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          {['All', 'Life', 'Non-Life'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all ${filter === f ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white border border-zinc-200 text-zinc-600 hover:border-blue-600'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(p => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ApplyPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [product, setProduct] = useState<InsuranceProduct | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProduct(data.find((p: any) => p.id === productId)));
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      signInWithGoogle();
      return;
    }
    navigate(`/checkout/${productId}`, { state: { customerDetails: formData } });
  };

  if (!product) return null;

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 mb-8 font-bold text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to products
          </button>
          <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-sm">
            <img src={product.imageUrl} className="w-full aspect-video rounded-2xl object-cover mb-6" alt={product.name} />
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">{product.name}</h2>
            <p className="text-zinc-500 mb-8">{product.description}</p>
            <div className="space-y-4">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Key Benefits</p>
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500" /> {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 text-white rounded-[2.5rem] p-10 shadow-2xl">
          <h2 className="text-2xl font-bold mb-8">Application Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Full Name</label>
              <input 
                required
                type="text" 
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Phone Number</label>
              <input 
                required
                type="tel" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500"
                placeholder="+63 912 345 6789"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Address</label>
              <textarea 
                required
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                placeholder="123 Street, City"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<InsuranceProduct | null>(null);
  const [method, setMethod] = useState<'Card' | 'GCash' | 'PayMaya'>('Card');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProduct(data.find((p: any) => p.id === productId)));
  }, [productId]);

  const handlePayment = async () => {
    if (method === 'Card') {
      setIsProcessing(true);
      setTimeout(() => navigate('/success'), 2000);
    } else {
      setIsProcessing(true);
      const res = await fetch('/api/generate-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: `PIONEER-PAY-${method}-${productId}-${Date.now()}` })
      });
      const data = await res.json();
      setQrCode(data.qrCode);
      setIsProcessing(false);
    }
  };

  if (!product) return null;

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 mb-8">Checkout</h1>
        
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-10 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-8 pb-8 border-b border-zinc-100">
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Selected Plan</p>
              <h3 className="text-xl font-bold text-zinc-900">{product.name}</h3>
            </div>
            <p className="text-2xl font-black text-zinc-900">₱{product.premium.toLocaleString()}</p>
          </div>

          <h4 className="text-sm font-bold text-zinc-900 mb-6">Select Payment Method</h4>
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { id: 'Card', icon: CreditCard, label: 'Card' },
              { id: 'GCash', icon: Smartphone, label: 'GCash' },
              { id: 'PayMaya', icon: Smartphone, label: 'PayMaya' }
            ].map(m => (
              <button 
                key={m.id}
                onClick={() => { setMethod(m.id as any); setQrCode(null); }}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all ${method === m.id ? 'bg-blue-50 border-blue-600 text-blue-600' : 'bg-white border-zinc-200 text-zinc-400 hover:border-blue-600'}`}
              >
                <m.icon className="w-6 h-6" />
                <span className="text-xs font-bold">{m.label}</span>
              </button>
            ))}
          </div>

          {qrCode ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100"
            >
              <p className="text-sm font-bold text-zinc-900 mb-6">Scan QR to pay with {method}</p>
              <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto mb-6 rounded-xl shadow-lg" />
              <button 
                onClick={() => navigate('/success')}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                I have paid
              </button>
            </motion.div>
          ) : (
            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-zinc-900 text-white font-bold py-5 rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3"
            >
              {isProcessing ? 'Processing...' : (
                <>
                  {method === 'Card' ? <CreditCard className="w-6 h-6" /> : <QrCode className="w-6 h-6" />}
                  {method === 'Card' ? 'Pay with Card' : `Generate ${method} QR`}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const SuccessPage = () => (
  <div className="min-h-screen flex items-center justify-center p-6">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full text-center"
    >
      <div className="w-24 h-24 bg-green-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>
      <h1 className="text-4xl font-bold text-zinc-900 mb-4">Payment Successful!</h1>
      <p className="text-zinc-500 mb-10 leading-relaxed">
        Thank you for choosing Pioneer. Your application is now being processed. You will receive an email confirmation shortly.
      </p>
      <Link to="/" className="inline-block bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all">
        Back to Home
      </Link>
    </motion.div>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-zinc-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/apply/:productId" element={<ApplyPage />} />
          <Route path="/checkout/:productId" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        
        <footer className="bg-zinc-950 text-white py-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <Shield className="w-8 h-8 text-blue-500" />
                <span className="text-3xl font-bold tracking-tighter">Pioneer</span>
              </div>
              <p className="text-zinc-500 max-w-sm leading-relaxed">
                Your trusted partner in insurance for over 60 years. Providing innovative solutions for life and non-life protection.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <div className="flex flex-col gap-4 text-zinc-500 text-sm">
                <Link to="/products" className="hover:text-white transition-colors">Products</Link>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link to="/claims" className="hover:text-white transition-colors">Claims</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <div className="flex flex-col gap-4 text-zinc-500 text-sm">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-600 font-bold uppercase tracking-widest">
            © 2026 Pioneer Insurance and Surety Corporation. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}
