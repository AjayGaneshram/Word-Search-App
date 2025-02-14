const fs = require('fs');
const path = require('path');

function generateOutput() {
    const inputFile = path.resolve(__dirname, '../src/input.json');  // Adjust path
    const outputFile = path.resolve(__dirname, '../src/Output.jsx');

    if (!fs.existsSync(inputFile)) {
        console.error(`❌ Error: input.json not found at ${inputFile}`);
        process.exit(1);
    } else {
        console.log(`✅ Found input.json at ${inputFile}`);
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
        firstLetterList: [],
        eachMaraimoozhi: {},
        eachBook: {},
        eachWord: {},
        firstLetterWords: {}
    };

    const wordSet = new Set();
    const bookSet = new Set();
    const maraiMoozhiSet = new Set();
    const youtubeSet = new Set();

    inputData.forEach(word => {
        const wordEntry = {
            wordName: word.wordName,
            wordName_FirstLetter: word.wordName_FirstLetter,
            wordNameDescription: word.wordNameDescription || '',
            books: [],
            maraimoozhis: [],
            youtubeNames: []  // This is where youtube info will go
        };

        // Track words
        if (!wordSet.has(word.wordName)) {
            wordSet.add(word.wordName);
            outputData.wordList.push(word.wordName);
        }

        const firstLetter = word.wordName_FirstLetter;
        if (!outputData.firstLetterWords[firstLetter]) {
            outputData.firstLetterWords[firstLetter] = [];
        }
        outputData.firstLetterWords[firstLetter].push(word.wordName);

        // Add books for the word
        if (word.books) {
            word.books.forEach(book => {
                if (!bookSet.has(book.bookName)) {
                    bookSet.add(book.bookName);
                    outputData.bookList.push(book.bookName);
                }

                if (!outputData.books[book.bookName]) {
                    outputData.books[book.bookName] = {
                        bookName_firstLetter: book.bookName_firstLetter,
                        bookName: book.bookName,
                        wordIyal: ((book.wordIyal != undefined && book.wordIyal != null) && book.wordIyal),
                        words: []
                    };
                }

                if (!outputData.books[book.bookName].words.includes(word.wordName)) {
                    outputData.books[book.bookName].words.push(word.wordName);
                }

                if (!wordEntry.books.includes(book.bookName)) {
                    wordEntry.books.push(book.bookName);
                }

                // Collect word and maraiMoozhi details for "each-book"
                if (!outputData.eachBook[book.bookName]) {
                    outputData.eachBook[book.bookName] = [];
                }

                const bookDetails = {
                    wordName: word.wordName,
                    wordNameDescription: word.wordNameDescription || '',
                    maraiMoozhiNames: word.maraimoozhis ? word.maraimoozhis.sort().map(maraiMoozhi => maraiMoozhi.maraiMoozhiName) : [],
                    bookNames: [{
                        "bookName": book.bookName,
                        "wordIyal": ((book.wordIyal != undefined && book.wordIyal != null) ? book.wordIyal : null)
                    }],
                    youtubeNames: word.youTubeVideos ? word.youTubeVideos.sort().map(youtube => ({
                        youtubeName: youtube.youtubeNFame,
                        youTubeURL: youtube.youTubeURL
                    })) : []
                };

                outputData.eachBook[book.bookName].push(bookDetails);
            });
        }

        // Add maraiMoozhis for the word
        if (word.maraimoozhis) {
            word.maraimoozhis.forEach(maraiMoozhi => {
                if (!maraiMoozhiSet.has(maraiMoozhi.maraiMoozhiName)) {
                    maraiMoozhiSet.add(maraiMoozhi.maraiMoozhiName);
                    outputData.maraiMoozhiList.push(maraiMoozhi.maraiMoozhiName);
                }

                if (!outputData.maraiMoozhis[maraiMoozhi.maraiMoozhiName]) {
                    outputData.maraiMoozhis[maraiMoozhi.maraiMoozhiName] = {
                        maraiMoozhiName: maraiMoozhi.maraiMoozhiName,
                        maraiMoozhiDescription: maraiMoozhi.maraiMoozhiDescription || '',
                        words: []
                    };
                }

                if (!outputData.maraiMoozhis[maraiMoozhi.maraiMoozhiName].words.includes(word.wordName)) {
                    outputData.maraiMoozhis[maraiMoozhi.maraiMoozhiName].words.push(word.wordName);
                }

                if (!wordEntry.maraimoozhis.includes(maraiMoozhi.maraiMoozhiName)) {
                    wordEntry.maraimoozhis.push(maraiMoozhi.maraiMoozhiName);
                }

                // Collect word, book, and youtube details for "each-maraimoozhi"
                if (!outputData.eachMaraimoozhi[maraiMoozhi.maraiMoozhiName]) {
                    outputData.eachMaraimoozhi[maraiMoozhi.maraiMoozhiName] = [];
                }

                const maraiMoozhiDetails = {
                    wordName: word.wordName,
                    wordNameDescription: word.wordNameDescription || '',
                    bookNames: word.books ? word.books.sort().map(book => book.bookName) : [],
                    maraiMoozhiNames: [maraiMoozhi.maraiMoozhiName],
                    youtubeNames: word.youTubeVideos ? word.youTubeVideos.sort().map(youtube => ({
                        youtubeName: youtube.youtubeName,
                        youTubeURL: youtube.youTubeURL
                    })) : []
                };

                outputData.eachMaraimoozhi[maraiMoozhi.maraiMoozhiName].push(maraiMoozhiDetails);
            });
        }

        // Add youtube entries for the word
        if (word.youTubeVideos) {
            word.youTubeVideos.forEach(youtube => {
                if (!youtubeSet.has(youtube.youtubeName)) {
                    youtubeSet.add(youtube.youtubeName);
                    outputData.youtubeList.push(youtube.youtubeName);
                }

                if (!outputData.youtube[youtube.youtubeName]) {
                    outputData.youtube[youtube.youtubeName] = {
                        youtubeName: youtube.youtubeName,
                        youTubeURL: youtube.youTubeURL,
                        words: []
                    };
                }

                if (!outputData.youtube[youtube.youtubeName].words.includes(word.wordName)) {
                    outputData.youtube[youtube.youtubeName].words.push(word.wordName);
                }

                // Add youtube name and URL under "youtubeNames" for the word entry
                wordEntry.youtubeNames.push({
                    youtubeName: youtube.youtubeName,
                    youTubeURL: youtube.youTubeURL
                });
            });
        }

        outputData.words.push(wordEntry);

        // Add the first letter if not already added
        if (!outputData.firstLetterList.includes(word.wordName_FirstLetter)) {
            outputData.firstLetterList.push(word.wordName_FirstLetter);
        }

        // Add the word to "each-word"
        outputData.eachWord[word.wordName] = {
            wordName: word.wordName,
            wordNameDescription: word.wordNameDescription || '',
            wordName_FirstLetter: word.wordName_FirstLetter,
            books: word.books ? word.books.sort().map(book => ({ bookName: book.bookName })) : [],
            maraimoozhis: word.maraimoozhis ? word.maraimoozhis.sort().map(maraiMoozhi => ({ maraiMoozhiName: maraiMoozhi.maraiMoozhiName })) : [],
            youtubeNames: wordEntry.youtubeNames  // This should now include youtubeName and URL
        };



    });

    // Convert books, maraiMoozhis, and youtube into arrays of objects with names and ids
    outputData.books = Object.values(outputData.books);
    outputData.maraiMoozhis = Object.values(outputData.maraiMoozhis);
    outputData.youtube = Object.values(outputData.youtube);

    const jsContent = `const jsonData = ${JSON.stringify(outputData)};
    export default jsonData;`;

    fs.writeFileSync(outputFile, jsContent, 'utf-8');

    console.log(`✅ output.json successfully written at ${outputFile}`);
}

generateOutput();
