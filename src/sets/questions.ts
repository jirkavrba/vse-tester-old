import { QuestionSet } from "../types";

import questions3sg201 from "./3sg201-strategicka-analyza.json";
import questions4sa310 from "./4sa310-it-governance.json";
import questions4st204 from "./4st204-statistika-pro-informatiky.json";

const sets: Array<QuestionSet> = [
    {
        title: "3SG201 - Strategická analýza pro informatiky",
        questions: questions3sg201
    },
    {
        title: "4SA310 - IT Governance",
        questions: questions4sa310
    },
    {
        title: "4ST204 - Statistika pro informatiky",
        questions: questions4st204
    }
];

export default sets;