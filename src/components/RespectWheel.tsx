import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Ear, Share2, MessageCircle, HandHeart, Clock, Users, Sparkles } from 'lucide-react';

interface RespectAction {
  text: string;
  color: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
}

const respectActions: RespectAction[] = [
  {
    text: "Listen Actively",
    color: "bg-orange-500",
    description: "Give your full attention when others speak. Make eye contact, nod, and ask questions to show you care.",
    icon: <Ear className="w-6 h-6" />,
    examples: [
      "Make eye contact when someone is speaking",
      "Ask follow-up questions to show interest",
      "Avoid interrupting others"
    ]
  },
  {
    text: "Share Fairly",
    color: "bg-orange-500",
    description: "Ensure everyone gets equal opportunities and resources. Take turns and include others in activities.",
    icon: <Share2 className="w-6 h-6" />,
    examples: [
      "Take turns when playing games",
      "Share materials in group projects",
      "Give everyone a chance to lead"
    ]
  },
  {
    text: "Use Kind Words",
    color: "bg-orange-500",
    description: "Choose words that uplift and encourage. Express gratitude and give sincere compliments.",
    icon: <MessageCircle className="w-6 h-6" />,
    examples: [
      "Say 'please' and 'thank you'",
      "Give genuine compliments",
      "Use encouraging language"
    ]
  },
  {
    text: "Show Kindness",
    color: "bg-orange-500",
    description: "Perform acts of kindness without expecting anything in return. Help others when they need support.",
    icon: <HandHeart className="w-6 h-6" />,
    examples: [
      "Help someone carry their books",
      "Comfort a friend who's sad",
      "Volunteer for community service"
    ]
  },
  {
    text: "Be Patient",
    color: "bg-orange-500",
    description: "Stay calm and understanding when things take time. Give others space to learn and grow.",
    icon: <Clock className="w-6 h-6" />,
    examples: [
      "Wait your turn patiently",
      "Help others learn at their pace",
      "Stay calm in frustrating situations"
    ]
  },
  {
    text: "Show Love",
    color: "bg-orange-500",
    description: "Express care and appreciation for others. Make people feel valued and important.",
    icon: <Heart className="w-6 h-6" />,
    examples: [
      "Tell family members you love them",
      "Show appreciation to friends",
      "Support others in tough times"
    ]
  },
  {
    text: "Include Others",
    color: "bg-orange-500",
    description: "Make everyone feel welcome and valued. Reach out to those who might feel left out.",
    icon: <Users className="w-6 h-6" />,
    examples: [
      "Invite new students to join activities",
      "Form diverse groups for projects",
      "Welcome everyone to participate"
    ]
  },
  {
    text: "Celebrate Uniqueness",
    color: "bg-orange-500",
    description: "Appreciate what makes each person special. Learn from different perspectives and backgrounds.",
    icon: <Sparkles className="w-6 h-6" />,
    examples: [
      "Learn about different cultures",
      "Respect various viewpoints",
      "Celebrate diverse talents"
    ]
  }
];

export const RespectWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedAction, setSelectedAction] = useState<RespectAction | null>(null);
  const spinTimeoutRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        window.clearTimeout(spinTimeoutRef.current);
      }
    };
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedAction(null);
    
    const newRotation = rotation + 1800 + Math.random() * 1800;
    setRotation(newRotation);

    if (spinTimeoutRef.current) {
      window.clearTimeout(spinTimeoutRef.current);
    }

    spinTimeoutRef.current = window.setTimeout(() => {
      const finalPosition = newRotation % 360;
      const sectionSize = 360 / respectActions.length;
      const sectionIndex = Math.floor(finalPosition / sectionSize);
      setSelectedAction(respectActions[sectionIndex]);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative w-96 h-96">
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden shadow-xl"
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          {respectActions.map((action, index) => {
            const rotation = (360 / respectActions.length) * index;
            return (
              <div
                key={action.text}
                className={`absolute w-1/2 h-1/2 origin-bottom-right ${action.color} flex items-center justify-center transform -translate-y-1/2`}
                style={{ transform: `rotate(${rotation}deg) skewY(-45deg)` }}
              >
                <div
                  className="text-white flex flex-col items-center space-y-2 transform"
                  style={{ transform: `rotate(${45 + rotation}deg) skewY(45deg)` }}
                >
                  {action.icon}
                  <span className="text-sm font-medium whitespace-nowrap">
                    {action.text}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full shadow-lg z-20 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-6 h-6">
          <div className="w-full h-full bg-white transform rotate-45 shadow-lg" />
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 text-lg font-semibold shadow-lg"
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel of Respect"}
      </button>

      {selectedAction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-3 rounded-lg ${selectedAction.color} text-white`}>
              {selectedAction.icon}
            </div>
            <h3 className="text-2xl font-bold text-black">{selectedAction.text}</h3>
          </div>
          <p className="text-gray-800 mb-4">{selectedAction.description}</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-orange-500">Try these examples:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              {selectedAction.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};