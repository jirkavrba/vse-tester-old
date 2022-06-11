import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import Footer from './components/Footer';
import Header from './components/Header';
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
      <Header title={questionSet.title} questionsCount={questionSet.questions.length}>
        <TesterSelection selected={questionSet} sets={sets} onSelect={select} />
      </Header>
      <Tester questions={questionSet.questions} title={questionSet.title} />
      <Footer/>
    </div>
  );
}

export default App;
