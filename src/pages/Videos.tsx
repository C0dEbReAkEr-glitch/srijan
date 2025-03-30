import React, { useState } from 'react';
import { Film } from 'lucide-react';
import { VideoCard } from '../components/VideoCard';
import { VideoPlayer } from '../components/VideoPlayer';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
}

// Use direct YouTube video thumbnails
const videos: Video[] = [
  {
    id: "nrZ21nD9I-0",
    title: "Equality and Diversity - Animated Stories",
    description: "Learn about equality and diversity through engaging animated stories that children can relate to.",
    thumbnail: "https://i.ytimg.com/vi/nrZ21nD9I-0/hqdefault.jpg",
    duration: "5:30"
  },
  {
    id: "QGNnz3oq6mQ",
    title: "Gender Equality: Breaking Stereotypes",
    description: "An inspiring video about breaking gender stereotypes and promoting equality in society.",
    thumbnail: "https://i.ytimg.com/vi/QGNnz3oq6mQ/hqdefault.jpg",
    duration: "4:15"
  },
  {
    id: "OIsyVZCB3KM",
    title: "Women's Rights and Empowerment",
    description: "Understanding the importance of women's rights and empowerment in creating a balanced society.",
    thumbnail: "https://i.ytimg.com/vi/OIsyVZCB3KM/hqdefault.jpg",
    duration: "6:20"
  },
  {
    id: "x8I57fmnTdo",
    title: "Respect and Understanding",
    description: "A comprehensive look at fostering respect and understanding between all genders.",
    thumbnail: "https://i.ytimg.com/vi/x8I57fmnTdo/hqdefault.jpg",
    duration: "4:45"
  }
];

function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent">
        Educational Videos
      </h1>

      {videos.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              {...video}
              onPlay={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <Film className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mt-4 text-center">No videos available</h3>
        </div>
      )}

      {selectedVideo && (
        <VideoPlayer
          videoId={selectedVideo.id}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}

export default Videos;