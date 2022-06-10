import { QuestionSet } from "../types";

import questions3sg201 from "./3sg201-strategicka-analyza.json";
import questions4sa310 from "./4sa310-it-governance.json";
import questions4st204 from "./4st204-statistika-pro-informatiky.json";

const sets: Array<QuestionSet> = [
    {
        title: "Strategická analýza pro informatiky",
        subject: "3SG201",
        questions: questions3sg201
    },
    {
        title: "IT Governance",
        subject: "4SA310",
        questions: questions4sa310
    },
    {
        title: "Statistika pro informatiky",
        subject: "4ST204",
        questions: questions4st204
    }
];

export default sets;