import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { DecorativeElements } from './components/DecorativeElements';
import Home from './pages/Home';
import Games from './pages/Games';
import Quizzes from './pages/Quizzes';
import Simulations from './pages/Simulations';
import Videos from './pages/Videos';
import Chatroom from './pages/Chatroom';
import Assistant from './pages/Assistant';
import Blog from './pages/Blog';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <DecorativeElements />
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main 
            className="container mx-auto px-4 py-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/simulations" element={<Simulations />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/chatroom" element={<Chatroom />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;