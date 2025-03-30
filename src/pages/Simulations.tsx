import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface Option {
  text: string;
  feedback: string;
  score: number;
}

interface Scenario {
  situation: string;
  context: string;
  options: Option[];
}

interface Simulation {
  id: number;
  title: string;
  description: string;
  scenarios: Scenario[];
}

const simulations: Simulation[] = [
  {
    id: 1,
    title: "Workplace Scenarios",
    description: "Navigate common workplace situations and learn appropriate responses",
    scenarios: [
      {
        situation: "A colleague makes inappropriate comments about a female team member's appearance",
        context: "During a team meeting, a colleague repeatedly makes comments about a female team member's appearance, making her visibly uncomfortable.",
        options: [
          {
            text: "Ignore the situation to avoid conflict",
            feedback: "Ignoring inappropriate behavior enables it to continue and creates a hostile work environment.",
            score: 0
          },
          {
            text: "Speak up and explain why such comments are inappropriate",
            feedback: "Correct! Speaking up helps create a respectful workplace environment and shows support for your colleague.",
            score: 10
          },
          {
            text: "Join in with similar comments",
            feedback: "This perpetuates harmful behavior and contributes to a toxic work environment.",
            score: 0
          }
        ]
      },
      {
        situation: "Credit for a female colleague's work is being given to someone else",
        context: "During a presentation, you notice that a male colleague is taking credit for work primarily done by your female teammate.",
        options: [
          {
            text: "Stay silent to avoid workplace drama",
            feedback: "Staying silent allows unfair treatment to continue and discourages workplace equality.",
            score: 0
          },
          {
            text: "Speak up and ensure proper credit is given",
            feedback: "Excellent! Ensuring proper credit helps maintain fairness and encourages recognition of everyone's contributions.",
            score: 10
          },
          {
            text: "Discuss it privately with others later",
            feedback: "While better than silence, addressing it immediately is more effective in preventing future occurrences.",
            score: 5
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Educational Environment",
    description: "Handle situations in educational settings effectively",
    scenarios: [
      {
        situation: "Gender bias in STEM subjects",
        context: "You notice a teacher consistently calling on male students more often than female students in a science class.",
        options: [
          {
            text: "Raise the issue with school administration",
            feedback: "Good approach! Bringing attention to systemic bias helps create positive change.",
            score: 10
          },
          {
            text: "Accept it as normal behavior",
            feedback: "Accepting bias as normal perpetuates gender inequality in education.",
            score: 0
          },
          {
            text: "Encourage female students to participate more actively",
            feedback: "While encouraging participation is good, addressing the root cause of bias is more effective.",
            score: 5
          }
        ]
      },
      {
        situation: "Sports team discrimination",
        context: "The school provides better facilities and equipment to boys' sports teams compared to girls' teams.",
        options: [
          {
            text: "Start a petition for equal resources",
            feedback: "Excellent! Taking organized action can lead to positive institutional changes.",
            score: 10
          },
          {
            text: "Suggest girls join boys' teams instead",
            feedback: "This doesn't address the underlying inequality and may reinforce discrimination.",
            score: 0
          },
          {
            text: "Document the differences and report to authorities",
            feedback: "Good approach! Documentation can support advocacy for equal treatment.",
            score: 8
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Public Transportation",
    description: "Navigate public spaces safely and respectfully",
    scenarios: [
      {
        situation: "Harassment on public transport",
        context: "You witness someone being harassed on a crowded bus. The victim looks uncomfortable and scared.",
        options: [
          {
            text: "Directly confront the harasser",
            feedback: "While brave, direct confrontation can escalate the situation and may be unsafe.",
            score: 5
          },
          {
            text: "Create a distraction and offer support to the victim",
            feedback: "Excellent! This approach helps the victim while maintaining safety for everyone involved.",
            score: 10
          },
          {
            text: "Ignore the situation",
            feedback: "Ignoring harassment enables harmful behavior and leaves victims without support.",
            score: 0
          }
        ]
      },
      {
        situation: "Late night safety",
        context: "You notice someone following a woman who's walking alone at night.",
        options: [
          {
            text: "Call authorities and maintain a safe distance",
            feedback: "Good choice! This provides help while maintaining personal safety.",
            score: 10
          },
          {
            text: "Mind your own business",
            feedback: "Ignoring potential danger leaves others vulnerable when they need help.",
            score: 0
          },
          {
            text: "Walk faster to catch up and offer company",
            feedback: "While well-intentioned, this might frighten the person more. Calling authorities is safer.",
            score: 5
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Social Media Awareness",
    description: "Handle online interactions responsibly",
    scenarios: [
      {
        situation: "Cyberbullying incident",
        context: "You notice someone posting derogatory comments about a female classmate's photos on social media.",
        options: [
          {
            text: "Report the posts to platform administrators",
            feedback: "Correct! Using platform tools to report harassment is an effective first step.",
            score: 10
          },
          {
            text: "Like supportive comments to counter negativity",
            feedback: "While showing support is good, active intervention through reporting is more effective.",
            score: 5
          },
          {
            text: "Share the posts to show how bad they are",
            feedback: "Sharing harmful content, even to criticize it, can amplify its negative impact.",
            score: 0
          }
        ]
      },
      {
        situation: "Privacy violation",
        context: "Someone shares private information or photos of a female colleague without consent.",
        options: [
          {
            text: "Inform the victim and help report the violation",
            feedback: "Excellent! Supporting the victim and taking action is the best approach.",
            score: 10
          },
          {
            text: "Tell others not to share it further",
            feedback: "While helpful, direct action to remove content and support the victim is more important.",
            score: 5
          },
          {
            text: "Save the evidence for later",
            feedback: "Without taking action or informing the victim, saving evidence alone doesn't help.",
            score: 2
          }
        ]
      }
    ]
  }
];

function Simulations() {
  const [selectedSim, setSelectedSim] = useState<number | null>(null);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showNext, setShowNext] = useState(false);

  const handleSimSelect = (simId: number) => {
    setSelectedSim(simId);
    setCurrentScenario(0);
    setFeedback(null);
    setScore(0);
    setShowNext(false);
  };

  const handleChoice = (option: Option) => {
    setFeedback(option.feedback);
    setScore(score + option.score);
    setShowNext(true);
  };

  const handleNext = () => {
    const simulation = simulations.find(s => s.id === selectedSim);
    if (simulation && currentScenario < simulation.scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setFeedback(null);
      setShowNext(false);
    } else {
      setSelectedSim(null);
    }
  };

  const currentSimulation = simulations.find(s => s.id === selectedSim);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
        Interactive Simulations
      </h1>

      {!selectedSim ? (
        <div className="grid md:grid-cols-2 gap-6">
          {simulations.map((sim) => (
            <motion.div
              key={sim.id}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 rounded-xl cursor-pointer"
              onClick={() => handleSimSelect(sim.id)}
            >
              <h3 className="text-xl font-semibold mb-2 text-black">{sim.title}</h3>
              <p className="text-gray-800">{sim.description}</p>
            </motion.div>
          ))}
        </div>
      ) : currentSimulation ? (
        <div className="glass-card p-8 rounded-xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              {currentSimulation.title}
            </h2>
            <p className="text-gray-800">
              Scenario {currentScenario + 1} of {currentSimulation.scenarios.length}
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-lg font-medium text-black">
                {currentSimulation.scenarios[currentScenario].situation}
              </p>
              <p className="text-gray-800 mt-2">
                {currentSimulation.scenarios[currentScenario].context}
              </p>
            </div>

            <div className="space-y-3">
              {currentSimulation.scenarios[currentScenario].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={!!feedback}
                  className="w-full p-4 text-left rounded-lg border border-orange-200 hover:border-orange-500 transition-colors disabled:opacity-70"
                  onClick={() => handleChoice(option)}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>

            {feedback && (
              <div className="mt-6 p-4 rounded-lg bg-orange-50 border border-orange-200 flex items-start space-x-3">
                {score > 5 ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                )}
                <div>
                  <p className="text-black">{feedback}</p>
                  <p className="text-orange-600 mt-2">Points earned: {score}</p>
                </div>
              </div>
            )}

            {showNext && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                onClick={handleNext}
              >
                {currentScenario < currentSimulation.scenarios.length - 1 ? 'Next Scenario' : 'Complete Simulation'}
              </motion.button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Simulations;