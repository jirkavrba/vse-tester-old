import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="flex flex-row justify-between bg-black py-5 px-10">
            <span className="text-neutral-700 uppercase text-xs font-black">VŠE Tester</span>
            <a className="text-gray-500" href="https://github.com/jirkavrba/vse-tester" target="_blank" rel="noreferrer">
                <FaGithub />
            </a>
        </footer>
    );
}

export default Footer;