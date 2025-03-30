import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  onPlay: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  title,
  description,
  thumbnail,
  duration,
  onPlay,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative group cursor-pointer" onClick={onPlay}>
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="bg-purple-600 text-white p-4 rounded-full"
          >
            <Play className="h-8 w-8" />
          </motion.div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-sm rounded">
          {duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
}