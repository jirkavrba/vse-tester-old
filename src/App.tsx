import React, { useEffect, useState } from 'react';
import TesterSelection from './components/TesterSelection';
import sets from "./sets"
import { QuestionSet } from './types';

const App: React.FC = () => {
  const [questionSet, setQuestionSet] = useState<QuestionSet>(sets[0]);

  const select = (subject: string) => {
    window.localStorage.setItem("current-set", subject);
    setQuestionSet(sets.filter(set => set.subject === subject)[0]);
  }

  useEffect(() => {
    const subject = window.localStorage.getItem("current-set") ?? sets[0].subject;
    const [selected] = sets.filter(set => set.subject === subject);

    select(selected.subject);
  }, []);

  return (
    <>
      <header className="flex flex-col p-10 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-600">{questionSet.title}</h1>
        <p className="text-sm text-gray-400 uppercase font-bold tracking-widest mt-3">Tester obsahuje {questionSet.questions.length} otázek</p>
        <TesterSelection selected={questionSet.subject} subjects={sets.map(set => set.subject)} onSelect={select}/>
      </header>
    </>
  );
}

export default App;
