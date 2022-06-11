export interface HeaderProps {
    title: string,
    questionsCount: number,
    children: JSX.Element,
}

const Header: React.FC<HeaderProps> = ({title, questionsCount, children}: HeaderProps) => {
    return (
        <header className="flex flex-row p-10 bg-black items-start">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-neutral-200">{title}</h1>
                <p className="text-sm text-neutral-500 uppercase font-bold tracking-widest mt-3">Tester obsahuje {questionsCount} otázek</p>
            </div>

            <div className="flex-grow">
                {children}
            </div>
        </header>
    )
}


export default Header;