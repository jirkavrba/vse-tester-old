import { useEffect, useState } from "react";
import { FaArrowRight, FaRandom } from "react-icons/fa";
import { Question, QuestionState } from "../types";

export interface TesterProps {
    questions: Array<Question>
}

const Tester: React.FC<TesterProps> = ({ questions }: TesterProps) => {
    const [revealed, setRevealed] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [states, setStates] = useState<Array<QuestionState>>([]);

    useEffect(() => {
        setIndex(Math.floor(Math.random() * questions.length));
        setStates([...new Array(questions.length)].fill([QuestionState.Unanswered]));
        setRevealed(false);
    }, [questions]);

    const question = questions[index % questions.length];

    const correct = states.filter(state => state === QuestionState.Correct).length;
    const incorrect = states.filter(state => state === QuestionState.Incorrect).length;
    const percentage = Math.floor(correct * 100 / Math.max(1, correct + incorrect));

    const selected = (correct: boolean): void => {
        if (revealed) {
            return;
        }

        setRevealed(true);
        setStates(states => {
            const current = correct ? QuestionState.Correct : QuestionState.Incorrect;
            const copy = [...states];

            copy.splice(index, 1, current);

            return copy;
        });
    }

    const nextQuestion = () => {
        setIndex(index => (index + 1) % questions.length);
        setRevealed(false);
    }

    const randomQuestion = () => {
        setIndex(Math.floor(Math.random() * questions.length));
        setRevealed(false);
    }

    const directQuestion = (index: number) => {
        setIndex(index);
        setRevealed(false);
    }

    return (
        <div className="flex flex-grow p-10 flex-row items-stretch bg-neutral-900">
            <div className="w-3/4">
                <h1 className="text-white font-bold text-3xl">{question.text}</h1>
                <div className="flex flex-col mt-10">
                    {question.answers.map((question, i) => {
                        const classes = question.correct
                            ? "bg-green-900 border-green-300 text-white"
                            : "bg-neutral-900 border-neutral-700 text-neutral-500";

                        return (
                            <button onClick={() => selected(question.correct)} key={i} className={`text-left px-10 py-8 mb-5 rounded-xl border-2 transition font-black ${revealed ? classes : 'border-neutral-800 bg-neutral-800 text-neutral-300 hover:border-neutral-600 hover:shadow-lg'}`}>
                                {question.text}
                            </button>
                        )
                    })}
                </div>
            </div>
            <aside className="w-1/4 flex flex-col p-5 ml-5 border-2 border-neutral-700 bg-neutral-800 rounded-lg shadow-lg">
                <div className="flex flex-row items-center justify-between bg-neutral-800 rounded-lg p-5 font-bold">
                    <h1 className="text-3xl text-white flex-grow">{percentage}&nbsp;%</h1>
                    <span className="text-green-500">{correct} správně</span>
                    <span className="text-neutral-600 mx-3">/</span>
                    <span className="text-red-500">{incorrect} špatně</span>
                </div>
                <button className={`flex flex-row items-center justify-center mt-5 w-full font-bold uppercase tracking-wide text-sm py-5 rounded-lg transition ${revealed ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-800 text-neutral-700'}`} disabled={!revealed} onClick={randomQuestion}>
                    <FaRandom className="mr-5"/>
                    Náhodná otázka
                </button>
                <button className={`flex flex-row items-center justify-center mt-5 w-full font-bold uppercase tracking-wide text-sm py-5 rounded-lg transition ${revealed ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-800 text-neutral-700'}`} disabled={!revealed} onClick={nextQuestion}>
                    <FaArrowRight className="mr-5"/>
                    Další otázka
                </button>
                <div className="flex-grow flex flex-row flex-wrap items-start content-start justify-start mt-5">
                    {
                        states.map((state, i) => {
                            const classes = {
                                [QuestionState.Unanswered]: "bg-neutral-700 hover:bg-neutral-500 text-neutral-400 ring-neutral-500",
                                [QuestionState.Correct]: "bg-green-700 text-white hover:bg-green-400 ring-green-300",
                                [QuestionState.Incorrect]: "bg-red-700 text-white hover:bg-red-500 ring-red-300",
                            }

                            return <div key={i} className={`font-bold text-xs flex flex-col items-center justify-center transition cursor-pointer rounded font-mono py-1 px-2 m-1 ${i === index ? 'ring-2' : ''} ${classes[state] }`} onClick={() => directQuestion(i)}>
                                {i.toString().padStart(3, "0")}
                            </div>
                        })
                    } 
                </div> 
            </aside>
        </div>
    );
}

export default Tester;