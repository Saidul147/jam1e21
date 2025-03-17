import React, { useEffect, useState } from 'react';
import getAllQuestion from '../getAllQuestion';
import Link from 'next/link';


interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    answer: string;
}

const QuizComponent = () => {


    const [showResult, setShowResult] = useState(false)
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

//     const getAllQuestion = async () => {
//         const response = await fetch('http://localhost:4000/api/quiz-test/questions');
//         const data = await response.json();
//         console.log(data.questions)
//         return data.questions;
//       };
// getAllQuestion()
    // ✅ Fetch questions when the component mounts

    const fetchQuestions = async () => {
        try {
          const allQuestions = await getAllQuestion();
          const selectedQuestions = [];
          const usedIndexes = new Set();
      
          while (selectedQuestions.length < 40) {
            const randomIndex = Math.floor(Math.random() * allQuestions.length);
            if (!usedIndexes.has(randomIndex)) {
              selectedQuestions.push(allQuestions[randomIndex]);
              usedIndexes.add(randomIndex);
            }
          }
      
          setQuestions(selectedQuestions);
          setSelectedOptions(Array(selectedQuestions.length).fill(null)); // Reset options
          setCurrentQuestionIndex(0);
          setIsAnswerSubmitted(false);
          setShowResult(false);
        } catch (error) {
          console.error('Error fetching questions:', error);
        } finally {
          setLoading(false);
        }
      };
      
      useEffect(() => {
        fetchQuestions();
      }, []);
      
      const allReset = () => {
        setLoading(true);
        fetchQuestions();
      };
      
    
      if (loading) return <p>Loading...</p>;

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



    // calculateScore()

    const getResultOptionStyle = (option: string, question: QuizQuestion, index: number) => {
        const selectedOption = selectedOptions[index];

        if (option === question.answer) {
            // Correct answer
            return "border border-blue-500 bg-blue-100 rounded p-3";
        } else if (option === selectedOption && option !== question.answer) {
            // Wrong selected option
            return "border border-red-500 bg-red-100 rounded p-3";
        } else {
            return "border border-gray-300 rounded p-3 opacity-50";
        }
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach((question, index) => {
          if (selectedOptions[index] === question.answer) {
            correct++;
          }
        });
        const percentage = Math.round((correct / questions.length) * 100);
        return { correct, percentage };
      };

    const { correct, percentage } = calculateScore();


    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-[800px] p-6 ">
            <div className={`${showResult && "hidden"}`}>
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
                    {currentQuestionIndex === 39 ?
                        <div
                            className={`${isAnswerSubmitted ? "bg-blue-400 hover:ring-1 cursor-pointer" : "bg-gray-300 "
                                } `}
                        >
                            {isAnswerSubmitted ? <button onClick={() => setShowResult(!showResult)} className='text-white font-bold py-2 block cursor-pointer  px-12 rounded'>
                                Show Your Result
                            </button> : <button className='text-white font-bold py-2 px-12 rounded cursor-not-allowed' onClick={handleNextQuestion} disabled={!isAnswerSubmitted}>
                                Next
                            </button>}


                        </div> :
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
            <div className={`${showResult ? "block" : "hidden"}`}>
                <div className="text-center my-6">
                    <h2 className="text-2xl text-black font-bold">Your Result</h2>
                    <p className="mt-2 text-black text-lg">
                        Correct Answers: {correct} / {questions.length}
                    </p>
                    <p className="mt-2 text-black text-lg mb-10">Score: {percentage}%</p>
                    <Link href="/theory-quiz" onClick={allReset} className='px-8 py-4 bg-blue-300 scale-100 hover:scale-105 text-2xl mt-5 rounded-md'>
                        Re Try
                    </Link>
                </div>
                <div className='mt-15'>
                    {questions.map((qus, ind) => (
                        <div key={ind} className="mb-10">
                            <h2 className='text-lg font-medium mb-4 text-black'>{qus.question}</h2>

                            <div className="space-y-3 text-black font-bold">
                                {qus.options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={getResultOptionStyle(option, qus, ind)} // ✅ Use result styling function
                                    >
                                        <label className="flex items-center space-x-3 select-none">
                                            <div className="h-5 w-5 rounded-full border-1 flex items-center justify-center">
                                                {selectedOptions[ind] === option && (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-blue-900" />
                                                )}
                                            </div>
                                            <span className="text-black font-medium">{option}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default QuizComponent;