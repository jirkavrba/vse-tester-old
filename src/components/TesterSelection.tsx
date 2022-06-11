import { useContext, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AppContext } from "../App";
import { QuestionSet } from "../types";

export interface TesterSelectionProps {
    sets: Array<QuestionSet>,
    selected?: QuestionSet,
    className?: string,
    onSelect: (selected: QuestionSet) => void
}

const TesterSelection: React.FC<TesterSelectionProps> = ({ sets, selected, className = "", onSelect }: TesterSelectionProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const {darkmode} = useContext(AppContext);

    const select = (subject: QuestionSet): void => {
        onSelect(subject);
        setExpanded(false);
    }

    return (
        <div className={`relative flex flex-col top-0 right-0 transition items-end justify-start ${className}`} onMouseLeave={() => setExpanded(false)}>
            <button onMouseEnter={() => setExpanded(true)} onClick={() => setExpanded(expanded => !expanded)} 
                    className={`${darkmode ? 'bg-neutral-800 border-neutral-800 text-neutral-400' : 'bg-white shadow border-white text-neutral-600'} cursor-pointer px-5 py-3 border-2 rounded-lg uppercase tracking-widest font-bold transition flex flex-row items-center`}>
                {selected?.subject}
                <FaChevronDown className={`ml-3 transition transform ${expanded ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <div className={`absolute top-full right-0 py-5 ${expanded ? 'visible' : 'invisible'}`} onMouseLeave={() => setExpanded(false)}>
                {
                    sets
                        .filter(subject => subject !== selected)
                        .map(subject =>
                            <div key={subject.title} onClick={() => select(subject)} 
                                 className={`${darkmode ? "bg-neutral-800 border-neutral-700 hover:border-white shadow-lg" : "bg-white shadow hover:shadow-lg hover:border-black"} flex flex-col cursor-pointer px-5 py-3 mb-3  border-2 rounded-lg transition transform group ${expanded ? "opacity-1 translate-y-0" : "opacity-0 -translate-y-10"}`}>
                                <h1 className={`${darkmode ? "text-neutral-300 group-hover:text-white" : "text-neutral-500 group-hover:text-neutral-600" } transition uppercase font-black tracking-widest`}>{subject.subject}</h1>
                                <span className={`${darkmode ? "text-neutral-500 group-hover:text-white" : "text-neutral-400 group-hover:text-black"} transition  tracking-wide font-bold`}>{subject.title}</span> 
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default TesterSelection;
