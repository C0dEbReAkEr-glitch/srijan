import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, X, ArrowLeft, Tag } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Digital Safety: A Guide for Women",
    excerpt: "Learn essential digital security practices to protect yourself online and maintain privacy in the digital age.",
    content: `
      Digital safety is crucial in today's interconnected world. Here are key practices to stay safe online:

      1. Strong Password Management
      - Use unique, complex passwords for each account
      - Enable two-factor authentication when possible
      - Consider using a password manager

      2. Privacy Settings
      - Regularly review social media privacy settings
      - Be selective about sharing personal information
      - Understand app permissions and data collection

      3. Online Behavior
      - Think before sharing personal details
      - Be cautious with friend requests from strangers
      - Verify sources before clicking links

      4. Digital Footprint Awareness
      - Regularly Google yourself to monitor your online presence
      - Set up alerts for your name
      - Be mindful of what you post and share

      Remember, your digital safety is as important as your physical safety. Stay informed and stay safe!
    `,
    date: "2024-03-15",
    category: "Safety",
    readTime: "5 min read",
    author: "Sarah Johnson",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'/%3E%3C/svg%3E"
  },
  {
    id: 2,
    title: "Self-Defense Techniques Every Woman Should Know",
    excerpt: "Basic self-defense moves and awareness strategies that can help you feel more confident and secure.",
    content: `
      Self-defense is about awareness, confidence, and having a plan. Here are essential techniques:

      1. Awareness Strategies
      - Stay alert to your surroundings
      - Trust your instincts
      - Identify potential exits in any situation

      2. Basic Defense Moves
      - Palm strike: Use the heel of your palm to strike upward
      - Knee strike: Target vulnerable areas
      - Elbow strike: Effective in close-range situations

      3. Verbal Defense
      - Use a firm, confident voice
      - Set clear boundaries
      - Practice saying "NO" firmly

      4. Escape Techniques
      - Break free from common holds
      - Create distance from threats
      - Run when possible

      Remember: The goal is to get away safely, not to win a fight.
    `,
    date: "2024-03-14",
    category: "Self-Defense",
    readTime: "7 min read",
    author: "Maria Chen",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/%3E%3Cpath d='M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z'/%3E%3C/svg%3E"
  },
  {
    id: 3,
    title: "Building Support Networks: Community Safety",
    excerpt: "How to create and maintain strong support networks for enhanced personal safety and emotional well-being.",
    content: `
      A strong support network is crucial for both safety and well-being. Here's how to build one:

      1. Identify Your Circle
      - Family members you can rely on
      - Trusted friends
      - Supportive colleagues
      - Professional contacts

      2. Strengthen Connections
      - Regular check-ins
      - Share your schedule with trusted contacts
      - Create emergency plans together
      - Use safety apps that connect to your network

      3. Community Involvement
      - Join local women's groups
      - Attend community safety workshops
      - Participate in neighborhood watch programs
      - Connect with advocacy organizations

      4. Professional Resources
      - Know local emergency numbers
      - Have contact information for support services
      - Build relationships with local law enforcement
      - Connect with counseling services

      Remember: You're not alone. There's strength in community!
    `,
    date: "2024-03-13",
    category: "Community",
    readTime: "4 min read",
    author: "Priya Patel",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/%3E%3C/svg%3E"
  }
];

function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {selectedPost ? (
          <BlogPostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
        ) : (
          <BlogList posts={blogPosts} onPostClick={setSelectedPost} />
        )}
      </AnimatePresence>
    </div>
  );
}

function BlogList({ posts, onPostClick }: { 
  posts: BlogPost[]; 
  onPostClick: (post: BlogPost) => void; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
        Safety Insights & Resources
      </h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <motion.article
            key={post.id}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-xl overflow-hidden cursor-pointer"
            onClick={() => onPostClick(post)}
          >
            <div className="p-6 flex gap-6">
              <div className="w-16 h-16 flex-shrink-0">
                <img src={post.image} alt="" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}

function BlogPostDetail({ post, onClose }: { 
  post: BlogPost; 
  onClose: () => void; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Articles
        </button>
        <button
          onClick={onClose}
          className="p-2 hover:bg-orange-50 rounded-full transition-colors"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <article className="glass-card rounded-xl p-8">
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12">
              <img src={post.image} alt="" className="w-full h-full rounded-full" />
            </div>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-muted-foreground">Author</p>
            </div>
          </div>
        </header>

        <div className="prose prose-orange max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </article>
    </motion.div>
  );
}

export default Blog;