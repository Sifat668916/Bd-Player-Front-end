import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Users, 
  Trash2, 
  DollarSign, 
  User, 
  Flag, 
  CircleDollarSign, 
  Menu, 
  X, 
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import playersData from './players.json';

// --- Constants ---
const MAX_PLAYERS = 6;
const INITIAL_COINS = 0;
const FREE_CLAIM_AMOUNT = 600000;

// --- Components ---

const Navbar = ({ coins }) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-6 md:px-12 lg:px-24 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <img src="/images/logo.png" alt="BPL Logo" className="w-12 h-12 object-contain" />
      <span className="font-bold text-xl tracking-tight hidden sm:block">BPL-DREAM 11</span>
    </div>
    
    <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
      <a href="#" className="hover:text-primary transition-colors">Home</a>
      <a href="#" className="hover:text-primary transition-colors">Fixture</a>
      <a href="#" className="hover:text-primary transition-colors">Teams</a>
      <a href="#" className="hover:text-primary transition-colors">Schedules</a>
    </div>

    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg py-2 px-4 font-bold bg-white shadow-sm">
        <span className="text-sm uppercase tracking-wider text-gray-500">Balance:</span>
        <span className="text-dark">{coins.toLocaleString()}</span>
        <CircleDollarSign size={20} className="text-orange-500" />
      </div>
    </div>
  </nav>
);

const Banner = ({ onClaim }) => (
  <header className="mx-6 md:mx-12 lg:mx-24 mt-8 rounded-3xl banner-bg py-20 px-8 flex flex-col items-center text-center overflow-hidden relative border border-gray-100">
    <img src="/images/banner-main.png" alt="Cricket Hub" className="w-64 md:w-80 mb-6 drop-shadow-xl" />
    <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
      Assemble Your Ultimate Dream 11 Cricket Team
    </h1>
    <p className="text-gray-600 text-lg mb-8 max-w-2xl font-medium">
      Beyond Boundaries Beyond Limits. Select your squad and dominate the league with strategy and skill.
    </p>
    <div className="p-1 border border-primary rounded-xl overflow-hidden ring-1 ring-primary/20">
      <button 
        onClick={onClaim}
        className="bg-primary text-dark font-bold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all glow-primary"
      >
        Claim Free Credit
      </button>
    </div>
  </header>
);

const PlayerCard = ({ player, onChoose }) => (
  <div className="p-4 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all group">
    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100">
      <img src={player.image} alt={player.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
    </div>
    
    <div className="flex items-center gap-2 mb-3">
      <User size={18} className="text-gray-500" />
      <h3 className="font-bold text-lg text-gray-800">{player.name}</h3>
    </div>

    <div className="flex items-center justify-between mb-4 text-sm">
      <div className="flex items-center gap-2 text-gray-500">
        <Flag size={14} />
        <span>{player.country}</span>
      </div>
      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-semibold">{player.role}</span>
    </div>

    <div className="h-[1px] bg-gray-100 mb-4" />

    <div className="flex flex-col gap-2 mb-4">
      <div className="flex justify-between items-center text-sm">
        <span className="font-bold text-gray-800">Batting</span>
        <span className="text-gray-500">{player.battingType}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="font-bold text-gray-800">Bowling</span>
        <span className="text-gray-500">{player.bowlingType}</span>
      </div>
    </div>

    <div className="flex items-center justify-between gap-4">
      <span className="font-bold text-gray-800">Price: ${player.price.toLocaleString()}</span>
      <button 
        onClick={() => onChoose(player)}
        className="border border-gray-200 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary hover:border-primary transition-all active:scale-95"
      >
        Choose Player
      </button>
    </div>
  </div>
);

const SelectedPlayerCard = ({ player, onRemove }) => (
  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
    <div className="flex items-center gap-4">
      <img src={player.image} alt={player.name} className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
      <div>
        <h4 className="font-bold text-lg">{player.name}</h4>
        <p className="text-gray-500 text-sm mb-1">{player.role}</p>
        <p className="text-gray-800 text-sm font-bold flex items-center gap-1">
          <DollarSign size={14} />
          {player.price.toLocaleString()}
        </p>
      </div>
    </div>
    <button 
      onClick={() => onRemove(player.playerId)}
      className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors"
    >
      <Trash2 size={22} />
    </button>
  </div>
);

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribedUser, setSubscribedUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('dream11_subscription');
    if (saved) setSubscribedUser(JSON.parse(saved));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    const data = { email, date: new Date().toISOString() };
    localStorage.setItem('dream11_subscription', JSON.stringify(data));
    setSubscribedUser(data);
    toast.success('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section className="mx-6 md:mx-12 lg:mx-24 -mb-40 relative z-40">
      <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
        <div className="banner-bg py-16 px-8 rounded-3xl border border-gray-200/50 flex flex-col items-center text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Subscribe to our Newsletter</h2>
          <p className="text-gray-600 font-medium mb-8">Get the latest updates and news right in your inbox!</p>
          
          {subscribedUser ? (
            <div className="bg-emerald-50 text-emerald-700 px-6 py-4 rounded-xl font-bold">
              Welcome back! You're subscribed as {subscribedUser.email}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-medium"
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all active:scale-95"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-dark pt-60 pb-12 px-6 md:px-12 lg:px-24">
    <div className="flex flex-col items-center mb-16">
      <img src="/images/logo-footer.png" alt="BPL Footer Logo" className="w-32 brightness-0 invert opacity-80" />
      <h3 className="text-white font-bold text-2xl mt-4">BPL-DREAM 11</h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white mb-20">
      <div>
        <h4 className="font-bold text-xl mb-6">About Us</h4>
        <p className="text-gray-400 leading-relaxed max-w-xs">
          We are a passionate team dedicated to providing the best cricket gaming experience 
          to our fans around the world.
        </p>
      </div>

      <div>
        <h4 className="font-bold text-xl mb-6">Quick Links</h4>
        <ul className="text-gray-400 space-y-4">
          <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Services</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-xl mb-6">Subscribe</h4>
        <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest updates.</p>
        <div className="flex rounded-xl overflow-hidden max-w-md">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none"
          />
          <button className="bg-gradient-to-r from-orange-400 to-pink-500 px-6 font-bold text-dark h-auto">
            Subscribe
          </button>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10 pt-8 text-center">
      <p className="text-gray-500 text-sm">
        @2024 Your Company All Rights Reserved.
      </p>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [coins, setCoins] = useState(INITIAL_COINS);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [activeView, setActiveView] = useState('available');

  const handleClaimCoins = () => {
    setCoins(prev => prev + FREE_CLAIM_AMOUNT);
    toast.success('Credit Added to your Account', {
      position: "top-center"
    });
  };

  const handleChoosePlayer = (player) => {
    // Validation 1: Already selected
    if (selectedPlayers.find(p => p.playerId === player.playerId)) {
      toast.error('Player already selected');
      return;
    }

    // Validation 2: Max limit reached
    if (selectedPlayers.length === MAX_PLAYERS) {
      toast.warning('Max Players selected(6)');
      return;
    }

    // Validation 3: Coins check
    if (coins < player.price) {
      toast.error('Not enough money to buy this player. Claim some credit!', {
        position: "top-center"
      });
      return;
    }

    // Success
    setCoins(prev => prev - player.price);
    setSelectedPlayers(prev => [...prev, player]);
    toast.success(`Congrats!! ${player.name} is now in your squad`, {
      position: "top-center"
    });
  };

  const handleRemovePlayer = (id) => {
    const playerToRemove = selectedPlayers.find(p => p.playerId === id);
    setSelectedPlayers(prev => prev.filter(p => p.playerId !== id));
    toast.warning('Player removed', {
      position: "top-right"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary selection:text-dark">
      <ToastContainer autoClose={3000} theme="colored" />
      
      <Navbar coins={coins} />
      
      <main className="pb-20">
        <Banner onClaim={handleClaimCoins} />

        {/* Player Section Header */}
        <div className="mx-6 md:mx-12 lg:mx-24 mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <h2 className="text-3xl font-bold text-dark">
            {activeView === 'available' ? 'Available Players' : `Selected Player (${selectedPlayers.length}/6)`}
          </h2>
          
          <div className="flex bg-white rounded-xl border border-gray-200 p-1 font-bold">
            <button 
              onClick={() => setActiveView('available')}
              className={`px-8 py-3 rounded-lg transition-all ${activeView === 'available' ? 'bg-primary text-dark' : 'text-gray-500 hover:text-dark'}`}
            >
              Available
            </button>
            <button 
              onClick={() => setActiveView('selected')}
              className={`px-8 py-3 rounded-lg transition-all flex items-center gap-2 ${activeView === 'selected' ? 'bg-primary text-dark' : 'text-gray-500 hover:text-dark'}`}
            >
              Selected ({selectedPlayers.length})
            </button>
          </div>
        </div>

        {/* Player Views */}
        <div className="mx-6 md:mx-12 lg:mx-24">
          <AnimatePresence mode="wait">
            {activeView === 'available' ? (
              <motion.div 
                key="available"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {playersData.map(player => (
                  <PlayerCard 
                    key={player.playerId} 
                    player={player} 
                    onChoose={handleChoosePlayer} 
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="selected"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-6"
              >
                {selectedPlayers.length > 0 ? (
                  <>
                    {selectedPlayers.map(player => (
                      <SelectedPlayerCard 
                        key={player.playerId} 
                        player={player} 
                        onRemove={handleRemovePlayer} 
                      />
                    ))}
                    <div className="mt-8 flex justify-start">
                      <div className="p-1 border border-dark rounded-xl">
                        <button 
                          onClick={() => setActiveView('available')}
                          className="bg-primary text-dark font-bold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all border border-dark/20"
                        >
                          Add More Player
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                    <Users size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-400">No players selected yet</h3>
                    <p className="text-gray-400 mb-8">Browse the available list to build your ultimate squad!</p>
                    <button 
                      onClick={() => setActiveView('available')}
                      className="bg-primary text-dark font-bold px-8 py-3 rounded-lg"
                    >
                      Browse Available Players
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}
