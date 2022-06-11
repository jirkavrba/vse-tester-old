export interface ProgressProps {
    correct: number,
    incorrect: number,
}

const Progress: React.FC<ProgressProps> = ({ correct, incorrect }: ProgressProps) => {
    const percentage = Math.floor(correct * 100 / Math.max(1, correct + incorrect));

    return (
        <div className="flex flex-row items-center justify-between bg-neutral-900 rounded-lg p-5 font-bold">
            <h1 className="text-3xl text-white flex-grow">{percentage}&nbsp;%</h1>
            <span className="text-green-500">{correct} správně</span>
            <span className="text-neutral-600 mx-3">/</span>
            <span className="text-red-500">{incorrect} špatně</span>
        </div>
    );
}

export default Progress;