import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Understanding Gender Equality",
    description: "Test your knowledge about fundamental concepts of gender equality",
    questions: [
      {
        question: "What is the fundamental principle of gender equality?",
        options: [
          "Equal rights and opportunities regardless of gender",
          "Women having more rights than men",
          "Men having more rights than women",
          "Separate rights for different genders"
        ],
        correct: 0,
        explanation: "Gender equality means ensuring equal rights, responsibilities, and opportunities for all genders."
      },
      {
        question: "Which of these promotes gender equality in the workplace?",
        options: [
          "Equal pay for equal work",
          "Hiring based on gender",
          "Gender-specific roles",
          "Separate facilities"
        ],
        correct: 0,
        explanation: "Equal pay for equal work is a fundamental principle of workplace gender equality."
      },
      {
        question: "What is gender bias?",
        options: [
          "Treating someone differently based on their gender",
          "Having different dress codes",
          "Natural differences between genders",
          "Gender-based job preferences"
        ],
        correct: 0,
        explanation: "Gender bias occurs when we make assumptions or treat people differently based on their gender."
      }
    ]
  },
  {
    id: 2,
    title: "Workplace Respect",
    description: "Learn about creating a respectful workplace environment",
    questions: [
      {
        question: "What constitutes workplace harassment?",
        options: [
          "Giving constructive feedback",
          "Unwanted advances or inappropriate comments",
          "Professional disagreements",
          "Regular performance reviews"
        ],
        correct: 1,
        explanation: "Harassment includes any unwanted behavior that creates a hostile work environment."
      },
      {
        question: "How should you respond to witnessing harassment?",
        options: [
          "Ignore it to avoid conflict",
          "Report it to appropriate authorities",
          "Join in to fit in",
          "Blame the victim"
        ],
        correct: 1,
        explanation: "Reporting harassment helps maintain a safe and respectful workplace for everyone."
      }
    ]
  },
  {
    id: 3,
    title: "Understanding Consent",
    description: "Learn about the importance of consent in relationships",
    questions: [
      {
        question: "What is the key principle of consent?",
        options: [
          "It must be freely given and can be withdrawn",
          "Once given, it cannot be taken back",
          "It's implied in relationships",
          "It's not necessary between partners"
        ],
        correct: 0,
        explanation: "Consent must be freely given, informed, and can be withdrawn at any time."
      },
      {
        question: "Which statement about consent is true?",
        options: [
          "Silence means consent",
          "Previous consent applies to future situations",
          "Consent must be explicit and enthusiastic",
          "Consent can't be withdrawn"
        ],
        correct: 2,
        explanation: "Consent must be explicit, enthusiastic, and given for each specific situation."
      }
    ]
  }
];

function Quizzes() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizSelect = (quizId: number) => {
    setSelectedQuiz(quizId);
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setIsCorrect(null);
    setQuizComplete(false);
  };

  const handleAnswer = (selectedOption: number) => {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    const correct = selectedOption === quiz?.questions[currentQuestion].correct;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setIsCorrect(null);
    } else {
      setQuizComplete(true);
    }
  };

  const currentQuiz = quizzes.find(q => q.id === selectedQuiz);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent">
        Knowledge Quizzes
      </h1>

      {!selectedQuiz ? (
        <div className="grid md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg cursor-pointer"
              onClick={() => handleQuizSelect(quiz.id)}
            >
              <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
              <p className="text-gray-600 mb-4">{quiz.description}</p>
              <p className="text-sm text-orange-600">
                {quiz.questions.length} questions
              </p>
            </motion.div>
          ))}
        </div>
      ) : currentQuiz && !quizComplete ? (
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {currentQuiz.title}
            </h2>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {currentQuiz.questions.length}</span>
              <span>Score: {score}</span>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg font-medium">
              {currentQuiz.questions[currentQuestion].question}
            </p>

            <div className="space-y-3">
              {currentQuiz.questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={showFeedback}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    showFeedback
                      ? index === currentQuiz.questions[currentQuestion].correct
                        ? 'bg-green-50 border-green-500'
                        : 'bg-gray-50 border-gray-200'
                      : 'border-gray-200 hover:border-orange-500'
                  }`}
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {showFeedback && (
              <div className={`mt-6 p-4 rounded-lg flex items-start space-x-3 ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                {isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="text-gray-600 mt-1">
                    {currentQuiz.questions[currentQuestion].explanation}
                  </p>
                </div>
              </div>
            )}

            {showFeedback && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                onClick={handleNext}
              >
                {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'See Results'}
              </motion.button>
            )}
          </div>
        </div>
      ) : currentQuiz ? (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-xl mb-6">
            You scored {score} out of {currentQuiz.questions.length}
          </p>
          <button
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            onClick={() => setSelectedQuiz(null)}
          >
            Try Another Quiz
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Quizzes;