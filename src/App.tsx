import React, { useEffect, useState } from 'react';
import DarkModeSwitch from './components/DarkModeSwitch';
import Footer from './components/Footer';
import Header from './components/Header';
import Tester from './components/Tester';
import TesterSelection from './components/TesterSelection';
import sets from "./sets"
import { QuestionSet } from './types';

export interface AppContextState {
  darkmode: boolean,
  setDarkmode: (previous: boolean) => void
}

export const AppContext = React.createContext<AppContextState>({
   darkmode: true,
   setDarkmode: (previous) => previous
});

const App: React.FC = () => {
  const [questionSet, setQuestionSet] = useState<QuestionSet>(sets[0]);
  const [darkmode, setDarkmode] = useState<boolean>(window.localStorage.getItem("theme") !== "light-mode");

  const select = (subject: QuestionSet) => {
    window.localStorage.setItem("current-set", subject.subject);
    setQuestionSet(subject);
  }

  const toggleDarkMode = () => {
    setDarkmode(previous => {
      const next = !previous;
      const mode = next ? "dark-mode" : "light-mode";

      window.localStorage.setItem("theme", mode);

      return next;
    });
  }

  useEffect(() => {
    const subject = window.localStorage.getItem("current-set") ?? sets[0].subject;
    const [selected] = sets.filter(set => set.subject === subject);

    select(selected);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AppContext.Provider value={{darkmode, setDarkmode}}>
        <Header title={questionSet.title} questionsCount={questionSet.questions.length}>
          <TesterSelection className="lg:flex-grow" selected={questionSet} sets={sets} onSelect={select} />
          <DarkModeSwitch dark={darkmode} toggle={toggleDarkMode}/>
        </Header>
        <Tester {...questionSet} />
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
