const fs = require('fs');
const path = require('path');

function generateOutput() {
    const inputFile = path.join(__dirname, 'public', 'input.json');  // Use absolute path
    const outputFile = path.join(__dirname, 'public', 'output.json');

    // Ensure input.json exists
    if (!fs.existsSync(inputFile)) {
        console.error('❌ Error: input.json not found in public/');
        process.exit(1);
    }

    console.log('🔍 Reading input.json...');
    const inputData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

    const outputData = {
        words: [],
        books: {},
        maraiMoozhis: {},
        youtube: {},
        wordList: [],
        bookList: [],
        maraiMoozhiList: [],
        youtubeList: [],
        firstLetterList: []
    };

    const wordSet = new Set();
    const bookSet = new Set();
    const maraiMoozhiSet = new Set();
    const youtubeSet = new Set();

    inputData["words"].forEach(word => {
        const wordEntry = {
            id: word.id,
            word: word.word,
            firstLetter: word.firstLetter,
            description: word.description,
            wordNature: word.wordNature,
            books: [],
            maraiMoozhis: [],
            youtube: []
        };

        // Track words
        if (!wordSet.has(word.word)) {
            wordSet.add(word.word);
            outputData.wordList.push(word.word);
        }

        // Add books for the word
        if (word.books) {
            word.books.forEach(book => {
                if (!bookSet.has(book.bookName)) {
                    bookSet.add(book.bookName);
                    outputData.bookList.push(book.bookName);
                }

                if (!outputData.books[book.bookName]) {
                    outputData.books[book.bookName] = {
                        id: book.id,
                        bookNameFirstLetter: book.bookNameFirstLetter,
                        bookName: book.bookName,
                        words: []
                    };
                }

                if (!outputData.books[book.bookName].words.includes(word.word)) {
                    outputData.books[book.bookName].words.push(word.word);
                }

                if (!wordEntry.books.includes(book.bookName)) {
                    wordEntry.books.push(book.bookName);
                }
            });
        }

        // Add maraiMoozhis for the word
        if (word.maraiMoozhis) {
            word.maraiMoozhis.forEach(maraiMoozhi => {
                if (!maraiMoozhiSet.has(maraiMoozhi.maraiMoozhiName)) {
                    maraiMoozhiSet.add(maraiMoozhi.maraiMoozhiName);
                    outputData.maraiMoozhiList.push(maraiMoozhi.maraiMoozhiName);
                }

                if (!outputData.maraiMoozhis[maraiMoozhi.maraiMoozhiName]) {
                    outputData.maraiMoozhis[maraiMoozhi.maraiMoozhiName] = {
                        id: maraiMoozhi.id,
                        description: maraiMoozhi.description,
                        maraiMoozhiName: maraiMoozhi.maraiMoozhiName,
                        words: []
                    };
                }

                if (!outputData.maraiMoozhis[maraiMoozhi.maraiMoozhiName].words.includes(word.word)) {
                    outputData.maraiMoozhis[maraiMoozhi.maraiMoozhiName].words.push(word.word);
                }

                if (!wordEntry.maraiMoozhis.includes(maraiMoozhi.maraiMoozhiName)) {
                    wordEntry.maraiMoozhis.push(maraiMoozhi.maraiMoozhiName);
                }
            });
        }

        // Add youtube entries for the word
        if (word.YouTube) {
            word.YouTube.forEach(youtube => {
                if (!youtubeSet.has(youtube.YoutubeName)) {
                    youtubeSet.add(youtube.YoutubeName);
                    outputData.youtubeList.push(youtube.YoutubeName);
                }

                if (!outputData.youtube[youtube.YoutubeName]) {
                    outputData.youtube[youtube.YoutubeName] = {
                        id: youtube.id,
                        description: youtube.description,
                        youtubeName: youtube.YoutubeName,
                        words: []
                    };
                }

                if (!outputData.youtube[youtube.YoutubeName].words.includes(word.word)) {
                    outputData.youtube[youtube.YoutubeName].words.push(word.word);
                }

                if (!wordEntry.youtube.includes(youtube.YoutubeName)) {
                    wordEntry.youtube.push(youtube.YoutubeName);
                }
            });
        }

        outputData.words.push(wordEntry);

        // Add the first letter if not already added
        if (!outputData.firstLetterList.includes(word.firstLetter)) {
            outputData.firstLetterList.push(word.firstLetter);
        }
    });

    // Convert books, maraiMoozhis, and youtube into arrays of objects with names and ids
    outputData.books = Object.values(outputData.books);
    outputData.maraiMoozhis = Object.values(outputData.maraiMoozhis);
    outputData.youtube = Object.values(outputData.youtube);

    // Write to output file
    fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2), 'utf-8');
    console.log('✅ output.json generated successfully');
}

generateOutput();
