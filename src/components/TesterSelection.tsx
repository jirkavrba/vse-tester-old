import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { QuestionSet } from "../types";

export interface TesterSelectionProps {
    sets: Array<QuestionSet>,
    selected?: QuestionSet,
    onSelect: (selected: QuestionSet) => void
}

const TesterSelection: React.FC<TesterSelectionProps> = ({ sets, selected, onSelect }: TesterSelectionProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const select = (subject: QuestionSet): void => {
        onSelect(subject);
        setExpanded(false);
    }

    return (
        <div className="relative flex flex-col top-0 right-0 transition items-end justify-start">
            <button onMouseEnter={() => setExpanded(true)} onClick={() => setExpanded(expanded => !expanded)} className={`cursor-pointer px-5 py-3 bg-neutral-800 border-2 rounded-lg uppercase text-neutral-400 tracking-widest font-bold transition flex flex-row items-center ${expanded ? 'border-gray-400 shadow-lg' : 'border-neutral-800 hover:border-gray-400'}`}>
                {selected?.subject}
                <FaChevronDown className={`ml-3 transition transform ${expanded ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <div className={`absolute top-full right-0 py-3 ${expanded ? 'visible' : 'invisible'}`} onMouseLeave={() => setExpanded(false)}>
                {
                    sets
                        .filter(subject => subject !== selected)
                        .map(subject =>
                            <div key={subject.title} onClick={() => select(subject)} className={`flex flex-col cursor-pointer px-5 py-3 mb-3 bg-neutral-800 border-2 border-neutral-800 rounded-lg transition transform group ${expanded ? 'shadow-lg opacity-1 translate-y-0 hover:bg-neutral-900 hover:border-white' : 'opacity-0 -translate-y-10'}`}>
                                <h1 className="transition text-neutral-300 group-hover:text-blue-500 uppercase font-black tracking-widest">{subject.subject}</h1>
                                <span className="transition text-neutral-500 group-hover:text-white tracking-wide font-bold">{subject.title}</span> 
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default TesterSelection;