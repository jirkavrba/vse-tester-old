import { useEffect, useState } from "react";
import { Question } from "../types";

export interface TesterProps {
    questions: Array<Question>
}

const Tester: React.FC<TesterProps> = ({questions}: TesterProps) => {
    useEffect(() => {
         setRevealed(false); 
         setIndex(0);
    }, [questions]);

    const [revealed, setRevealed] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);

    const question = questions[index % questions.length];
    const selected = (correct: boolean): void => {
        if (revealed) {
             return;
        }

        setRevealed(true);
    }

    const nextQuestion = () => {
        setIndex(index => index + 1);
        setRevealed(false);
    }

    return (
        <div className="flex flex-grow p-10 flex-row items-stretch">
            <div className="w-3/4">
                <h1 className="font-bold text-3xl">{question.text}</h1>

                <div className="flex flex-col mt-10">
                    {question.answers.map((question, i) => {
                        const classes = question.correct
                            ? "bg-green-200 border-green-700 text-green-800"
                            : "bg-red-100 border-red-700 text-red-800";

                        return (
                            <button onClick={() => selected(question.correct)} key={i} className={`text-left px-10 py-8 mb-5 rounded-xl border-2 transition font-black ${revealed ? classes : 'bg-white hover:shadow-lg' }`}>
                                {question.text}
                            </button>
                        )
                    })}
                </div>
            </div>
            <aside className="w-1/4 block p-5 ml-5 border-2 border-gray-300 rounded-lg shadow-lg">
                <button className={`w-full font-bold uppercase tracking-wide text-sm py-5 rounded-lg transition ${revealed ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`} disabled={!revealed} onClick={nextQuestion}>Další otázka</button>
            </aside>
        </div>
    );
}

export default Tester;