import React from 'react';
import { GamepadIcon } from 'lucide-react';
import { RespectWheel } from '../components/RespectWheel';

function Games() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent">
        Interactive Games
      </h1>
      
      <div className="grid gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Respect Wheel</h2>
          <p className="text-gray-600 text-center mb-8">
            Spin the wheel to learn different ways to show respect and make the world a better place!
          </p>
          <RespectWheel />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">More Games Coming Soon</h3>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <GamepadIcon className="h-12 w-12 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;