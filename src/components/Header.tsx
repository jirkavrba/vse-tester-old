import { useContext } from "react";
import { AppContext } from "../App";

export interface HeaderProps {
    title: string,
    questionsCount: number,
    children: React.ReactNode,
}

const Header: React.FC<HeaderProps> = ({ title, questionsCount, children }: HeaderProps) => {
    const { darkmode } = useContext(AppContext);

    return (
        <header className={`flex flex-row p-10 ${darkmode ? 'bg-black' : 'bg-gray-200'} items-start`}>
            <div className="flex flex-col">
                <h1 className={`text-3xl font-bold ${darkmode ? 'text-neutral-200' : 'text-black'}`}>{title}</h1>
                <p className="text-sm text-neutral-500 uppercase font-bold tracking-widest mt-3">Tester obsahuje {questionsCount} otázek</p>
            </div>

            {children}
        </header>
    )
}


export default Header;