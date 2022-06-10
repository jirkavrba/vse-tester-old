import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export interface TesterSelectionProps {
    subjects: Array<string>,
    onSelect: (selected: string) => void
}

const TesterSelection: React.FC<TesterSelectionProps> = ({ subjects, onSelect }: TesterSelectionProps) => {
    const [selected, setSelected] = useState<string>(subjects[0]);
    const [expanded, setExpanded] = useState<boolean>(false);

    const select = (subject: string): void => {
        onSelect(subject);
        setSelected(subject);
        setExpanded(false);
    }

    return (
        <div className="absolute p-5 rounded-xl top-0 right-0 transition" onMouseLeave={() => setExpanded(false)}>
            <button onMouseEnter={() => setExpanded(true)} onClick={() => setExpanded(expanded => !expanded)} className={`cursor-pointer px-5 py-3 bg-white border-2 rounded-lg uppercase text-gray-500 tracking-widest font-bold transition flex flex-row items-center ${expanded ? 'border-gray-400 shadow-lg' : 'border-gray-200 hover:border-gray-400'}`}>
                {selected}
                <FaChevronDown className={`ml-3 transition transform ${expanded ? 'rotate-180' : 'rotate-0'}`}/>
            </button>
            <div className={`${expanded ? 'visible' : 'invisible'}`}>
                {
                    subjects
                        .filter(subject => subject !== selected)
                        .map(subject =>
                            <div key={subject} onClick={() => select(subject)} className={`block text-center cursor-pointer px-5 py-3 mt-3 bg-white text-gray-500 border-2 border-gray-200 rounded-lg uppercase tracking-widest font-bold transition transform ${expanded ? 'shadow-lg opacity-1 translate-y-0 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-500' : 'opacity-0 -translate-y-10'}`}>
                                {subject}
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default TesterSelection;