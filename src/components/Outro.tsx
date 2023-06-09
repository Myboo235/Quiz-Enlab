import React from 'react'
import { BsArrowRepeat } from "react-icons/bs";
import {FaMedal} from 'react-icons/fa'
interface OutroProps {
  score: number;
  time: number;
  handlePlayAgain: (finalScore: number) => void;
  handleShowHistory: () => void;
}

const Outro: React.FC<OutroProps> = ({
  score,
  time,
  handlePlayAgain,
  handleShowHistory,
}) => {
  return (
    <div className="flex flex-col items-center bg-white py-4 px-8 rounded-xl">
      {score < 5 ? (
        <>
          <div className="flex flex-col justify-center items-center">
            <div className="my-4 text-slate-500">
              <BsArrowRepeat size={80} />
            </div>
            <div className="text-2xl font-bold">Completed!</div>
            <p>Better luck next time ! </p>
            <p className="mb-2">
              {score}/10 correct answers in {time} seconds
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <div className="my-4 text-yellow-500">
              <FaMedal size={80} />
            </div>
            <div className="text-2xl font-bold">Congratulation!!</div>
            <p>You are amazing!! </p>
            <p>
              {score}/10 correct answers in {time} seconds{" "}
            </p>
          </div>
        </>
      )}
      <button
        className="w-[8rem] p-2 bg-red-500 hover:bg-red-700 rounded-2xl text-white my-4"
        onClick={() => handlePlayAgain(score)}
      >
        Play again
      </button>
      <button
        className="w-[8rem] p-2 bg-slate-500 hover:bg-slate-700 rounded-2xl text-white"
        onClick={handleShowHistory}
      >
        Leaderboard
      </button>
    </div>
  );
};

export default Outro