export interface AnswerProps {
    correct: boolean,
    revealed: boolean,
    text: string,
    onSelect: (correct: boolean) => void
};

const Answer: React.FC<AnswerProps> = ({correct, revealed, text, onSelect}: AnswerProps) => {
    const classes = correct
        ? "bg-green-900 border-green-300 text-white"
        : "bg-neutral-900 border-neutral-700 text-neutral-500";

    return (
        <button onClick={() => onSelect(correct)} className={`text-left px-10 py-8 mb-5 rounded-xl border-2 transition font-black ${revealed ? classes : 'border-neutral-800 bg-neutral-800 text-neutral-300 hover:border-neutral-600 hover:shadow-lg'}`}>
            {text}
        </button>
    )
};

export default Answer;