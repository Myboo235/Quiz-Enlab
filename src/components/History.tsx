import React from 'react'
import {BiArrowBack} from 'react-icons/bi'
interface HistoryItem {
  score: number;
  time: number;
}

interface HistoryProps {
  history: HistoryItem[];
  handleBack: () => void;
}
const History: React.FC<HistoryProps> = ({ history, handleBack }) => {
  return (
    <>
      <div className="flex flex-col text-white items-center">
        <div className="text-2xl">Score History :</div>
        <ul className="my-5">
          {history
            ?.slice()
            .reverse()
            .map((item, index) => (
              <li key={index}>
                Score: {item.score}, Time: {item.time}
              </li>
            ))}
        </ul>
        <button
          className="w-[8rem] p-2 bg-white hover:bg-gray-300 rounded-2xl text-black flex justify-center items-center gap-2"
          onClick={handleBack}
        >
          <BiArrowBack size={20} />
          Back
        </button>
      </div>
    </>
  );
};

export default History