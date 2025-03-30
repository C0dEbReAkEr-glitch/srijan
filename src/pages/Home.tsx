import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Users, Award, MessageCircle, Calendar, ArrowRight } from 'lucide-react';

// Import blog posts from the Blog component
const blogs = [
  {
    id: 1,
    title: "Understanding Digital Safety: A Guide for Women",
    excerpt: "Learn essential digital security practices to protect yourself online and maintain privacy in the digital age.",
    date: "2024-03-15",
    category: "Safety",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Self-Defense Techniques Every Woman Should Know",
    excerpt: "Basic self-defense moves and awareness strategies that can help you feel more confident and secure.",
    date: "2024-03-14",
    category: "Self-Defense",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Building Support Networks: Community Safety",
    excerpt: "How to create and maintain strong support networks for enhanced personal safety and emotional well-being.",
    date: "2024-03-13",
    category: "Community",
    readTime: "4 min read"
  }
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      <header className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-400 bg-clip-text text-transparent">
          Welcome to Srijan
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          An interactive platform dedicated to fostering respect, understanding, and equality through
          education and engagement.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<Heart className="w-8 h-8 text-pink-400" />}
          title="Interactive Games"
          description="Learn through engaging games designed to promote empathy and understanding."
          link="/games"
        />
        <FeatureCard
          icon={<Award className="w-8 h-8 text-purple-400" />}
          title="Knowledge Quizzes"
          description="Test your understanding of women's rights and respect through interactive quizzes."
          link="/quizzes"
        />
        <FeatureCard
          icon={<Users className="w-8 h-8 text-blue-400" />}
          title="Simulations"
          description="Experience real-world scenarios through immersive simulations."
          link="/simulations"
        />
        <FeatureCard
          icon={<MessageCircle className="w-8 h-8 text-green-400" />}
          title="Community Chat"
          description="Connect with others in your preferred language and share experiences."
          link="/chatroom"
        />
      </div>

      <section className="glass-card p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-8">Why Srijan Matters</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <StatCard
            number="50M+"
            text="Lives impacted through awareness"
          />
          <StatCard
            number="100+"
            text="Interactive learning modules"
          />
          <StatCard
            number="20+"
            text="Supported Indian languages"
          />
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Latest Safety Insights</h2>
          <Link 
            to="/blog"
            className="text-primary hover:text-primary/80 flex items-center gap-2"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard 
              key={blog.id} 
              {...blog} 
              onClick={() => navigate('/blog')}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link to={link} className="block">
      <div className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

function StatCard({ number, text }: { number: string; text: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary mb-2">{number}</div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}

function BlogCard({ title, excerpt, date, category, readTime, onClick }: {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  onClick: () => void;
}) {
  return (
    <article 
      className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <span>{readTime}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4">{excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
            {category}
          </span>
          <button className="text-primary hover:text-primary/80 text-sm flex items-center gap-1">
            Read More <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default Home;