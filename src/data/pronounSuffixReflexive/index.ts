export type { Level, FormEntry, ExampleSentence, FillInQuestion, FlashcardQuestion, ConversationQuestion, FormsTable, FinalQuizQuestion, HomeworkSection } from "./types";
export { level1 } from "./level1";
export { level2 } from "./level2";
export { level3 } from "./level3";
export { level4 } from "./level4";
export { finalQuizQuestions, homeworkSections } from "./finalQuizAndHomework";

import { level1 } from "./level1";
import { level2 } from "./level2";
import { level3 } from "./level3";
import { level4 } from "./level4";

export const allLevels = [level1, level2, level3, level4];
