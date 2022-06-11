import { useEffect, useMemo, useState } from "react";
import { FaArrowRight, FaRandom, FaUndo } from "react-icons/fa";
import seedrandom from "seedrandom";
import { Question, QuestionState } from "../types";

export interface TesterProps {
    title: string,
    questions: Array<Question>
}

const Tester: React.FC<TesterProps> = ({ questions, title }: TesterProps) => {
    const [revealed, setRevealed] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [nonce, setNonce] = useState<number>(Math.random());
    const [states, setStates] = useState<Array<QuestionState>>([]);

    const key = `key_${title.replace(/[^a-zA-Z0-9]+/, '-')}`;

    useEffect(() => {
        const defaultStates = [...new Array(questions.length)].fill([QuestionState.Unanswered]);

        setIndex(Math.floor(Math.random() * questions.length));
        setRevealed(false);
        setStates(defaultStates);
        setNonce(Math.random());

        const stored = window.localStorage.getItem(key);

        if (stored !== null) {
            setStates(JSON.parse(stored));
        }

        document.title = title;
    }, [questions]);

    const question = questions[index % questions.length];

    const correct = states.filter(state => state === QuestionState.Correct).length;
    const incorrect = states.filter(state => state === QuestionState.Incorrect).length;
    const percentage = Math.floor(correct * 100 / Math.max(1, correct + incorrect));

    const select = (correct: boolean): void => {
        if (revealed) {
            return;
        }

        setRevealed(true);
        setStates(states => {
            const current = correct ? QuestionState.Correct : QuestionState.Incorrect;
            const copy = [...states];

            copy.splice(index, 1, current);
            window.localStorage.setItem(key, JSON.stringify(copy));

            return copy;
        });
    }

    const nextQuestion = () => {
        setIndex(index => (index + 1) % questions.length);
        setRevealed(false);
        setNonce(Math.random());
    }

    const randomQuestion = () => {
        const remaining = states.every(state => state !== QuestionState.Unanswered)
            ? states.map((_, i) => i)
            : states.map((state, i) => state === QuestionState.Unanswered ? i : null).filter(state => state !== null);

        setIndex(remaining[Math.floor(Math.random() * remaining.length)] ?? 0);
        setRevealed(false);
        setNonce(Math.random());
    }

    const directQuestion = (index: number) => {
        setIndex(index);
        setRevealed(false);
        setNonce(Math.random());
    }

    const reset = () => {
        setRevealed(false);
        setIndex(Math.floor(Math.random() * questions.length));
        setStates([...new Array(questions.length)].fill(QuestionState.Unanswered));

        window.localStorage.removeItem(key);
    }

    const random = seedrandom(nonce.toString());
    const answers = useMemo(() => question.answers.sort((_a, _b) => 0.5 - random()), [nonce]);

    return (
        <div className="flex flex-grow p-10 flex-row items-stretch bg-neutral-900">
            <div className="w-1/2 xl:w-3/5 2xl:w-3/4">
                <h1 className="text-white font-bold text-3xl">{question.text}</h1>
                <div className="flex flex-col mt-10">
                    {answers.map((question, i) => {
                        const classes = question.correct
                            ? "bg-green-900 border-green-300 text-white"
                            : "bg-neutral-900 border-neutral-700 text-neutral-500";

                        return (
                            <button onClick={() => select(question.correct)} key={i} className={`text-left px-10 py-8 mb-5 rounded-xl border-2 transition font-black ${revealed ? classes : 'border-neutral-800 bg-neutral-800 text-neutral-300 hover:border-neutral-600 hover:shadow-lg'}`}>
                                {question.text}
                            </button>
                        )
                    })}
                </div>
            </div>
            <aside className="w-1/2 xl:w-2/5 2xl:w-1/4 flex flex-col p-5 ml-5 border-2 border-neutral-700 bg-neutral-800 rounded-lg shadow-lg">
                <div className="flex flex-row items-center justify-between bg-neutral-800 rounded-lg p-5 font-bold">
                    <h1 className="text-3xl text-white flex-grow">{percentage}&nbsp;%</h1>
                    <span className="text-green-500">{correct} správně</span>
                    <span className="text-neutral-600 mx-3">/</span>
                    <span className="text-red-500">{incorrect} špatně</span>
                </div>
                <button className={`flex flex-row items-center justify-center mt-5 w-full font-bold uppercase tracking-wide text-sm py-5 rounded-lg transition ${revealed ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-800 text-neutral-700'}`} disabled={!revealed} onClick={nextQuestion}>
                    <FaArrowRight className="mr-5" />
                    Další otázka
                </button>
                <button className={`flex flex-row items-center justify-center mt-5 w-full font-bold uppercase tracking-wide text-sm py-5 rounded-lg transition ${revealed ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-neutral-800 text-neutral-700'}`} disabled={!revealed} onClick={randomQuestion}>
                    <FaRandom className="mr-5" />
                    Náhodná otázka
                </button>
                <div className="flex-grow flex flex-row flex-wrap items-start content-start justify-start mt-5">
                    {
                        states.map((state, i) => {
                            const classes = {
                                [QuestionState.Unanswered]: "bg-neutral-700 hover:bg-neutral-500 text-neutral-400 ring-neutral-500",
                                [QuestionState.Correct]: "bg-green-700 text-white hover:bg-green-400 ring-green-300",
                                [QuestionState.Incorrect]: "bg-red-700 text-white hover:bg-red-500 ring-red-300",
                            }

                            return <div key={i} className={`font-bold text-xs flex flex-col items-center justify-center transition cursor-pointer rounded font-mono py-1 px-2 m-1 ${i === index ? 'ring-2' : ''} ${classes[state]}`} onClick={() => directQuestion(i)}>
                                {i.toString().padStart(3, "0")}
                            </div>
                        })
                    }
                </div>
                <button onClick={reset} className="flex flex-row items-center justify-center text-neutral-700 uppercase tracking-widest text-sm font-bold transition hover:text-neutral-500">
                    <FaUndo className="mr-2" />
                    Reset
                </button>
            </aside>
        </div>
    );
}

export default Tester;