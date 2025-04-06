import { generate } from "random-words";

export const generateWordLists = (easyCount: number, mediumCount: number, hardCount: number) => {
    const wordLists = {
        easy: [] as string[],
        medium: [] as string[],
        hard: [] as string[],
    };

    while (
        wordLists.easy.length < easyCount ||
        wordLists.medium.length < mediumCount ||
        wordLists.hard.length < hardCount
    ) {
        const word = (generate() as string).toUpperCase();

        if (word.length <= 3 && wordLists.easy.length < easyCount) {
            wordLists.easy.push(word);
        } else if (word.length >= 4 && word.length <= 6 && wordLists.medium.length < mediumCount) {
            wordLists.medium.push(word);
        } else if (word.length >= 7 && wordLists.hard.length < hardCount) {
            wordLists.hard.push(word);
        }
    }

    return wordLists;
};


