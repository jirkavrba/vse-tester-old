import { useEffect, useMemo, useState } from "react";
import { FaArrowRight, FaRandom, FaUndo } from "react-icons/fa";
import seedrandom from "seedrandom";
import { Question, QuestionState } from "../types";
import Answer from "./Answer";
import Button from "./Button";
import Progress from "./Progress";
import QuestionsOverview from "./QuestionsOverview";

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
    }, [questions, title, key]);

    const question = questions[index % questions.length];

    const correct = states.filter(state => state === QuestionState.Correct).length;
    const incorrect = states.filter(state => state === QuestionState.Incorrect).length;

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
            : states.map((state, i) => state !== QuestionState.Correct ? i : null).filter(state => state !== null);

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

    const answers = useMemo(() => {
            const random = seedrandom(nonce.toString());
            return question.answers.sort((_a, _b) => 0.5 - random());
        }, [nonce, question.answers]
    );

    return (
        <div className="flex flex-grow p-10 flex-row items-stretch bg-neutral-900">
            <div className="w-1/2 xl:w-3/5 2xl:w-3/4">
                <h1 className="text-white font-bold text-3xl">{question.text}</h1>
                <div className="flex flex-col mt-10">
                    {answers.map((answer, i) => <Answer key={i} text={answer.text} correct={answer.correct} revealed={revealed} onSelect={select} />)}
                </div>
            </div>
            <aside className="w-1/2 xl:w-2/5 2xl:w-1/4 flex flex-col p-5 ml-5 bg-neutral-800 rounded-xl shadow-lg">
                <Progress correct={correct} incorrect={incorrect} />
                <Button disabled={!revealed} onClick={nextQuestion}>
                    <FaArrowRight className="mr-5" />
                    Další otázka
                </Button>
                <Button disabled={!revealed} onClick={randomQuestion}>
                    <FaRandom className="mr-5" />
                    Náhodná otázka
                </Button>
                <QuestionsOverview questions={states} selected={index} onSelect={directQuestion} />
                <button onClick={reset} className="flex flex-row items-center justify-center text-neutral-700 uppercase tracking-widest text-sm font-bold transition hover:text-neutral-500">
                    <FaUndo className="mr-2" />
                    Reset
                </button>
            </aside>
        </div>
    );
}

export default Tester;