import { useContext } from "react";
import { AppContext } from "../App";

export interface AnswerProps {
    correct: boolean,
    revealed: boolean,
    text: string,
    onSelect: (correct: boolean) => void
};

const Answer: React.FC<AnswerProps> = ({correct, revealed, text, onSelect}: AnswerProps) => {
    const {darkmode} = useContext(AppContext);

    const base = darkmode 
        ? "border-neutral-800 bg-neutral-800 text-neutral-300 hover:border-neutral-600 hover:shadow-lg" 
        : "bg-white text-neutral-700 hover:border-neutral-500 hover:shadow-lg";

    const color = correct
        ? (darkmode ? "bg-green-900 border-green-300 text-white" : "border-green-500 bg-green-500 text-white")
        : (darkmode ? "bg-neutral-900 border-neutral-700 text-neutral-500" : "text-gray-400");

    return (
        <button onClick={() => onSelect(correct)} className={`text-left px-10 py-8 mb-5 rounded-xl border-2 transition font-black ${revealed ? color : base}`}>
            {text}
        </button>
    )
};

export default Answer;