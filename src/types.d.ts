export interface Answer {
    text: string,
    correct: boolean
}

export interface Question {
    text: string,
    answers: Array<Answer>
}

export interface QuestionSet {
    title: string,
    questions: Array<Question>
}