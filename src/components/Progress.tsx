import { useContext } from "react";
import { AppContext } from "../App";

export interface ProgressProps {
    correct: number,
    incorrect: number,
}

const Progress: React.FC<ProgressProps> = ({ correct, incorrect }: ProgressProps) => {
    const {darkmode} = useContext(AppContext);
    const percentage = Math.floor(correct * 100 / Math.max(1, correct + incorrect));

    return (
        <div className={`${darkmode ? "bg-neutral-900" : "bg-white"} flex flex-row items-center justify-between rounded-lg p-5 font-bold`}>
            <h1 className={`${darkmode ? "text-white" : "text-black"} text-3xl flex-grow`}>{percentage}&nbsp;%</h1>
            <span className="text-green-500">{correct} správně</span>
            <span className="text-neutral-600 mx-3">/</span>
            <span className="text-red-500">{incorrect} špatně</span>
        </div>
    );
}

export default Progress;