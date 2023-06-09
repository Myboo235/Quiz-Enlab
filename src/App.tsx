import Intro from "./components/Intro";
import Outro from "./components/Outro";
import { useState } from "react";
import Quizs from "./components/Quizs";
import History from "./components/History";

interface HistoryItem {
  score: number;
  time: number;
}

function App() {
  const [play, setPlay] = useState(false);
  const [end, setEnd] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [showHistory,setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handlePlay = () => {
    setPlay(true);
  };

  const handleEnd = (finalScore: number, time: number) => {
    setEnd(true);
    setPlay(false);
    setScore(finalScore);
    setTime(time);
    setHistory([...history, { score: finalScore, time }]);
  };

  const handleBack = () => {
    setPlay(false);
    setEnd(true);
    setShowHistory(false);
  };
  const handlePlayAgain = () => {
    setPlay(false);
    setEnd(false);
    setShowHistory(false);
  };

  const handleShowHistory = () =>{
    setPlay(false);
    setEnd(false);
    setShowHistory(true);
  }

  return (
    <>
      <div className="h-[100vh] bg-slate-500 flex justify-center items-center">
        <div className="bg-indigo-950 flex justify-center items-center h-[40rem] w-[25rem] rounded-xl">
          {!play && !end && !showHistory && (
            <Intro play={false} handlePlay={handlePlay} />
          )}
          {play && <Quizs handleEnd={handleEnd} />}
          {end && (
            <Outro
              score={score}
              time={time}
              handlePlayAgain={handlePlayAgain}
              handleShowHistory={handleShowHistory}
            />
          )}
          {showHistory && <History history={history} handleBack={handleBack} />}
        </div>
      </div>
    </>
  );
}

export default App;
