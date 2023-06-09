import {BsRobot} from 'react-icons/bs'


interface IntroProps {
  play: boolean;
  handlePlay: () => void;
}

const Intro: React.FC<IntroProps> = ({ handlePlay }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-white my-5">
        <BsRobot size={100} />
      </div>
      <button
        className="w-[8rem] p-2 bg-red-500 hover:bg-red-700 rounded-2xl text-white"
        onClick={handlePlay}
      >
        Start quiz
      </button>
    </div>
  );
};

export default Intro