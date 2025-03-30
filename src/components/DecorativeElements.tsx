import React from 'react';

export const DecorativeElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Background decorative circles */}
      <div className="decorative-circle top-20 left-[10%] opacity-30" />
      <div className="decorative-circle top-40 right-[15%] opacity-40" />
      <div className="decorative-circle bottom-20 left-[20%] opacity-25" />
      
      {/* Cartoon-style decorative elements */}
      <div className="absolute top-10 right-10 w-16 h-16 opacity-50 animate-float">
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z'/%3E%3C/svg%3E"
          alt=""
          className="w-full h-full"
        />
      </div>
      
      {/* Floating Books */}
      <div className="absolute top-1/4 left-[5%] w-12 h-12 opacity-40 animate-float" style={{ animationDelay: '0.5s' }}>
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z'/%3E%3C/svg%3E"
          alt=""
          className="w-full h-full"
        />
      </div>

      {/* Floating Light Bulb */}
      <div className="absolute top-1/3 right-[8%] w-14 h-14 opacity-40 animate-float" style={{ animationDelay: '1s' }}>
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z'/%3E%3C/svg%3E"
          alt=""
          className="w-full h-full"
        />
      </div>

      {/* Floating Star */}
      <div className="absolute bottom-1/4 left-[15%] w-10 h-10 opacity-50 animate-float" style={{ animationDelay: '1.5s' }}>
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E"
          alt=""
          className="w-full h-full animate-pulse-slow"
        />
      </div>

      {/* Floating Heart */}
      <div className="absolute bottom-[20%] right-[12%] w-16 h-16 opacity-40 animate-float" style={{ animationDelay: '2s' }}>
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E"
          alt=""
          className="w-full h-full"
        />
      </div>

      {/* Floating Pencil */}
      <div className="absolute top-[15%] left-[25%] w-12 h-12 opacity-30 animate-float" style={{ animationDelay: '2.5s' }}>
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'/%3E%3C/svg%3E"
          alt=""
          className="w-full h-full"
        />
      </div>

      {/* Floating Chat Bubble */}
      <div className="absolute bottom-[30%] right-[20%] w-14 h-14 opacity-35 animate-float" style={{ animationDelay: '3s' }}>
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z'/%3E%3C/svg%3E"
          alt=""
          className="w-full h-full"
        />
      </div>

      {/* Floating Graduation Cap */}
      <div className="absolute top-[40%] left-[18%] w-16 h-16 opacity-30 animate-float" style={{ animationDelay: '3.5s' }}>
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z'/%3E%3C/svg%3E"
          alt=""
          className="w-full h-full"
        />
      </div>

      {/* Floating Music Note */}
      <div className="absolute bottom-[15%] left-[30%] w-10 h-10 opacity-40 animate-float" style={{ animationDelay: '4s' }}>
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z'/%3E%3C/svg%3E"
          alt=""
          className="w-full h-full"
        />
      </div>
    </div>
  );
};