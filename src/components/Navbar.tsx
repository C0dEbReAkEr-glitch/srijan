import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, GamepadIcon, Brain, Film, MessageCircle, Bot, Menu, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: "/games", icon: <GamepadIcon className="h-5 w-5" />, text: "Games" },
    { to: "/quizzes", icon: <Brain className="h-5 w-5" />, text: "Quizzes" },
    { to: "/simulations", icon: <Film className="h-5 w-5" />, text: "Simulations" },
    { to: "/videos", icon: <Film className="h-5 w-5" />, text: "Videos" },
    { to: "/blog", icon: <BookOpen className="h-5 w-5" />, text: "Blog" },
    { to: "/chatroom", icon: <MessageCircle className="h-5 w-5" />, text: "Chatroom" },
    { to: "/assistant", icon: <Bot className="h-5 w-5" />, text: "AI Assistant" }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="h-8 w-8 text-orange-500" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-orange-500 transition-all duration-300">
              Srijan
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                text={item.text}
                isActive={location.pathname === item.to}
              />
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  text={item.text}
                  isActive={location.pathname === item.to}
                  isMobile
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ 
  to, 
  icon, 
  text, 
  isActive, 
  isMobile,
  onClick 
}: { 
  to: string; 
  icon: React.ReactNode; 
  text: string;
  isActive: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        relative flex items-center space-x-2 px-4 py-2 rounded-lg
        transition-colors duration-200
        ${isMobile ? 'w-full' : ''}
        ${isActive 
          ? 'text-orange-600 bg-orange-50' 
          : 'text-black hover:text-orange-600 hover:bg-orange-50'
        }
      `}
    >
      {icon}
      <span className={`${isMobile ? '' : 'hidden sm:inline'}`}>{text}</span>
      {isActive && (
        <motion.div
          layoutId="navbar-active"
          className="absolute inset-0 border-2 border-orange-500 rounded-lg"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

export default Navbar;