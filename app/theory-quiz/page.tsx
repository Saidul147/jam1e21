"use client"

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import getAllQuestion from "../theory-quiz/getAllQuestion"

import LanguageSwitcher from '../_components/LanguageSwitcher';




interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export default function TheoryQuiz() {



  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);


  // ✅ Fetch questions when the component mounts
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const allQuestions = await getAllQuestion();

        const selectedQuestions = [];
        const usedIndexes = new Set(); // To avoid duplicates

        while (selectedQuestions.length < 10) {
          const randomIndex = Math.floor(Math.random() * allQuestions.length);
          if (!usedIndexes.has(randomIndex)) {
            selectedQuestions.push(allQuestions[randomIndex]);
            usedIndexes.add(randomIndex);
          }
        }

        setQuestions(selectedQuestions); // ✅ Store random 10 questions
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);


  if (loading) {
    return <p className="text-center text-white text-lg">Loading questions...</p>;
  }

  if (questions.length === 0) {
    return <p className="text-center text-red-500 text-lg">No questions available.</p>;
  }


  const handleOptionSelect = (option: string) => {
    if (isAnswerSubmitted) return; // Prevent changing answer after submission

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
    setIsAnswerSubmitted(true);
  };

  // ✅ Handle Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1 && isAnswerSubmitted) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswerSubmitted(false);
    }
  };

  // ✅ Determine Option Styling
  const getOptionStyle = (option: string) => {
    // if (!isAnswerSubmitted) {
    //   return "border border-gray-300 rounded p-3 hover:bg-gray-50 cursor-pointer";
    // }

    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = selectedOptions[currentQuestionIndex];

    if (selectedOption === option) {
      return "border border-blue-500 bg-blue-100 rounded p-3";
    } else {
      return "border border-gray-300 rounded p-3 hover:bg-gray-50 cursor-pointer";
    }
    // if (option === currentQuestion.answer) {
    //   return "border border-green-500 bg-green-100 rounded p-3";
    // } else if (option === selectedOption && option !== currentQuestion.answer) {
    //   return "border border-red-500 bg-red-100 rounded p-3";
    // } else {
    //   return "border border-gray-300 rounded p-3 opacity-50";
    // }
  };


  return (
    <div className="bg-[#FAD0C4] min-h-screen flex flex-col items-center p-4">
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="Interactive quiz application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-lg flex justify-center mt-30 mb-8">
        <nav className="absolute top-15 left-1/2 -translate-x-1/2 bg-gradient-to-r hover:from-[#ff9966] hover:to-[#ff5e62] scale-100 hover:scale-110 transition-all duration-300 from-[#ff7e5f] to-[#feb47b] rounded-[30px] text-white text-center">
          <Link href="/" className="md:text-xl text:lg px-[40px] py-[15px] block font-bold">
            Go Back
          </Link>
        </nav>
      </div>

      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          <span className="mr-2 text-white md:text-2xl text-lg">Select language:</span>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-end mb-4">
          <span className="text-sm text-gray-500">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>

        <h2 className="text-lg font-medium mb-6 text-center text-black">
          {questions[currentQuestionIndex].question}
        </h2>

        <div className="space-y-3 mb-6 text-black font-bold">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div
              key={index}
              className={getOptionStyle(option)}
              onClick={() => handleOptionSelect(option)}

            >
              {/* <label className="flex items-center cursor-pointer w-full">
                <input
                  type="radio"
                  name="quiz-option"
                  className="mr-3 h-5 w-5 rounded-full border-2 border-gray-400 checked:bg-green-500/60 checked:border-white-500  cursor-pointer"
                  checked={selectedOptions[currentQuestionIndex] === option}
                  onChange={() => handleOptionSelect(option)}
                  disabled={isAnswerSubmitted}
                />
                {option}
              </label> */}

              {/* {radio button style} */}
              <label className="flex items-center space-x-3 cursor-pointer select-none">
                <input
                  type="radio"
                  name="quiz-option"
                  className="peer hidden"
                  checked={selectedOptions[currentQuestionIndex] === option}
                  onChange={() => handleOptionSelect(option)}
                  disabled={isAnswerSubmitted}
                />

                    <div className={`h-5 w-5 rounded-full border-1 
                  flex items-center justify-center transition-all
                  ${selectedOptions[currentQuestionIndex] === option ? "border-blue-600 bg-blue-600" : "border-gray-400 bg-white"}
                  ${isAnswerSubmitted ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
              `}>
                  {selectedOptions[currentQuestionIndex] === option && (
                    <div className="h-2.5 w-2.5 rounded-full bg-white" />
                  )}
                </div>

                <span className="text-black font-medium">{option}</span>
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          {currentQuestionIndex === 9 ?
            <button
              className={`${isAnswerSubmitted ? "bg-blue-400 hover:ring-1 cursor-pointer" : "bg-gray-300 cursor-not-allowed"
                } text-white font-bold py-2 px-12 rounded`}
              onClick={handleNextQuestion}
              disabled={!isAnswerSubmitted}
            >
              {isAnswerSubmitted ? "Show Your Result" : "Next"}
            </button> :
            <button
              className={`${isAnswerSubmitted ? "bg-blue-400 hover:ring-1 cursor-pointer" : "bg-gray-300 cursor-not-allowed"
                } text-white font-bold py-2 px-12 rounded`}
              onClick={handleNextQuestion}
              disabled={!isAnswerSubmitted}
            >
              Next
            </button>
          }

        </div>
      </div>
    </div>
  );
}

