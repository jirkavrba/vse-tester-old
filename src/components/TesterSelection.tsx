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
        <div className="absolute flex flex-col p-5 rounded-xl top-0 right-0 transition items-end" onMouseLeave={() => setExpanded(false)}>
            <button onMouseEnter={() => setExpanded(true)} onClick={() => setExpanded(expanded => !expanded)} className={`cursor-pointer px-5 py-3 bg-white border-2 rounded-lg uppercase text-gray-500 tracking-widest font-bold transition flex flex-row items-center ${expanded ? 'border-gray-400 shadow-lg' : 'border-gray-200 hover:border-gray-400'}`}>
                {selected?.subject}
                <FaChevronDown className={`ml-3 transition transform ${expanded ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <div className={`${expanded ? 'visible' : 'invisible'}`}>
                {
                    sets
                        .filter(subject => subject !== selected)
                        .map(subject =>
                            <div key={subject.title} onClick={() => select(subject)} className={`flex flex-col cursor-pointer px-5 py-3 mt-3 bg-white border-2 border-gray-200 rounded-lg transition transform group ${expanded ? 'shadow-lg opacity-1 translate-y-0 hover:bg-white hover:border-black' : 'opacity-0 -translate-y-10'}`}>
                                <h1 className="transition text-gray-400 group-hover:text-blue-500 uppercase font-black tracking-widest">{subject.subject}</h1>
                                <span className="transition text-gray-400 group-hover:text-black tracking-wide font-bold">{subject.title}</span> 
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default TesterSelection;