import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import Tester from './components/Tester';
import TesterSelection from './components/TesterSelection';
import sets from "./sets"
import { QuestionSet } from './types';

const App: React.FC = () => {
  const [questionSet, setQuestionSet] = useState<QuestionSet>(sets[0]);

  const select = (subject: QuestionSet) => {
    window.localStorage.setItem("current-set", subject.subject);
    setQuestionSet(subject);
  }

  useEffect(() => {
    const subject = window.localStorage.getItem("current-set") ?? sets[0].subject;
    const [selected] = sets.filter(set => set.subject === subject);

    select(selected);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex flex-row p-10 bg-black items-start">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-neutral-200">{questionSet.title}</h1>
          <p className="text-sm text-neutral-500 uppercase font-bold tracking-widest mt-3">Tester obsahuje {questionSet.questions.length} otázek</p>
        </div>

        <div className="flex-grow">
          <TesterSelection selected={questionSet} sets={sets} onSelect={select} />
        </div>
      </header>
      <Tester questions={questionSet.questions} title={questionSet.title} />
      <footer className="flex flex-row justify-between bg-black py-5 px-10">
        <span className="text-neutral-700 uppercase text-xs font-black">VŠE Tester</span>
        <a className="text-gray-500" href="https://github.com/jirkavrba/vse-tester" target="_blank">
          <FaGithub />
        </a>
      </footer>
    </div>
  );
}

export default App;
