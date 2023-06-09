import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

interface Quiz {
  question: string;
  correctAnswer: string;
  incorrectAnswer: string[];
}
interface QuizProps {
  handleEnd: (finalScore: number , time : number) => void;
}
const Quizs: React.FC<QuizProps> = ({ handleEnd }) => {
  const [quizs, setQuizs] = useState<Quiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffledArray, setShuffledArray] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [seconds, setSeconds] = useState(0);
  const timeID = useRef<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10"
        );
        const { results } = response.data;
        console.log(results);
        const formattedQuizs = results.map((quiz: any) => ({
          question: quiz.question,
          correctAnswer: quiz.correct_answer,
          incorrectAnswer: quiz.incorrect_answers,
        }));

        setQuizs(formattedQuizs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

    useEffect(() => {
      if (loading) {
        return;
      }

      timeID.current = window.setInterval(() => {
        setSeconds((prevSecond) => prevSecond + 1);
      }, 1000);

      return () => {
        if (timeID.current) {
          clearInterval(timeID.current);
        }
      };
    }, [loading]);

  useEffect(() => {
    setShowAnswer(false); // Reset showAnswer when moving to the next question

    if (quizs[currentQuizIndex]) {
      const { incorrectAnswer, correctAnswer } = quizs[currentQuizIndex];

      if (incorrectAnswer && correctAnswer) {
        const shuffledArray = shuffleArray([...incorrectAnswer, correctAnswer]);
        setShuffledArray(shuffledArray);
      }
    }

    
  }, [currentQuizIndex, quizs]);

  const shuffleArray = (array: string[]) => {
    const shuffledArray = array.slice(); // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleChooseAnswer = (answer: string) => {
    setShowAnswer(true);
    setCurrentAnswer(answer);
    if (answer === quizs[currentQuizIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuizIndex === quizs.length - 1) {
      clearInterval(timeID.current);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizs.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="text-white text-2xl">Quizs</div>
        <div className="text-white">Time:{seconds}</div>
        {quizs.length > 0 &&
          currentQuizIndex < 10 &&
          shuffledArray.length > 0 && (
            <>
              <div className="text-white w-[20rem] p-2 bg-slate-400 mx-2 rounded-xl">
                {currentQuizIndex + 1} : {quizs[currentQuizIndex]?.question}
              </div>
              {shuffledArray.map((i) => (
                <button
                  key={i}
                  className={`rounded w-[20rem] p-2 hover:bg-slate-700 hover:text-white ${
                    showAnswer
                      ? i === quizs[currentQuizIndex].correctAnswer
                        ? "bg-green-500"
                        : i === currentAnswer
                        ? "bg-red-500"
                        : "bg-slate-500"
                      : "bg-slate-500"
                  }`}
                  disabled={showAnswer}
                  onClick={() => handleChooseAnswer(i)}
                >
                  {i}
                </button>
              ))}
            </>
          )}
        {currentQuizIndex < quizs.length - 1 && (
          <>
            <div className="text-white">Your score is {score}</div>
            <button
              onClick={handleNextQuiz}
              disabled={!showAnswer}
              className="bg-white p-2 rounded-lg disabled:bg-gray-400"
            >
              Next Question
            </button>
          </>
        )}

        {currentQuizIndex === quizs.length - 1 && showAnswer && (
          <>
            <div className="text-white">
              Final Score: {score} / {quizs.length} in {seconds}s
            </div>
            <button
              className="bg-red-500 p-2 rounded-lg"
              onClick={() => handleEnd(score, seconds)}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Quizs;
