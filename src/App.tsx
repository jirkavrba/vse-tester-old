import React, { useState } from 'react';
import TesterSelection from './components/TesterSelection';
import sets from "./sets"
import { QuestionSet } from './types';

const App: React.FC = () => {
  const [questionSet, setQuestionSet] = useState<QuestionSet>(sets[0]);

  return (
    <>
      <TesterSelection subjects={sets.map(set => set.subject)} />
    </>
  );
}

export default App;
