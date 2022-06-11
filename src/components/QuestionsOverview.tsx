import { Question, QuestionState } from "../types";

export interface QuestionsOverviewProps {
    questions: Array<QuestionState>,
    selected: number,
    onSelect: (index: number) => void
}


interface QuestionSquareProps {
    state: QuestionState,
    index: number,
    active: boolean,
    onSelect: (index: number) => void
}

const QuestionSquare: React.FC<QuestionSquareProps> = ({ state, index, active, onSelect }: QuestionSquareProps) => {

    const classes = {
        [QuestionState.Unanswered]: "bg-neutral-700 hover:bg-neutral-500 text-neutral-400 ring-neutral-500",
        [QuestionState.Correct]: "bg-green-500 hover:bg-green-400 ring-green-300",
        [QuestionState.Incorrect]: "bg-red-500 hover:bg-red-400 ring-red-300",
    }

    return (
        <div onClick={() => onSelect(index)} className={`font-bold text-xs flex flex-col items-center justify-center transition cursor-pointer rounded font-mono w-4 h-4 m-1 ${active ? 'ring-2' : ''} ${classes[state]}`}/>
    );
}

const QuestionsOverview: React.FC<QuestionsOverviewProps> = ({ questions, selected, onSelect }: QuestionsOverviewProps) => {
    return (
        <div className="flex-grow flex flex-row flex-wrap items-start content-start justify-start mt-5">
            {
                questions.map((state, i) =>
                    <QuestionSquare key={i} index={i} state={state} active={selected === i} onSelect={(index) => onSelect(index)} />
                )
            }
        </div>
    );

}

export default QuestionsOverview;