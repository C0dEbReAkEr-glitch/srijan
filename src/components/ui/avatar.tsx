import React from 'react';

interface AvatarProps {
  src?: string;
  fallback?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({ src, fallback, className = '', children }) => {
  return (
    <div className={`relative w-8 h-8 rounded-full overflow-hidden ${className}`}>
      {children || (src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : fallback ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm font-medium">
          {fallback}
        </div>
      ) : null)}
    </div>
  );
};

export const AvatarImage: React.FC<{ src: string; alt?: string }> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
};

export const AvatarFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm font-medium">
      {children}
    </div>
  );
}; 