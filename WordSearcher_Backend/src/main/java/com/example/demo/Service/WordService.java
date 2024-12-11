package com.example.demo.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Dto.UniqueWordDetails;
import com.example.demo.Dto.WordBookMaraiMoozhiYouTubeDTO;
import com.example.demo.Entity.Book;
import com.example.demo.Entity.MaraiMoozhi;
import com.example.demo.Entity.Word;
import com.example.demo.Entity.YouTube;
import com.example.demo.Repo.BookRepository;
import com.example.demo.Repo.MaraiMoozhiRepository;
import com.example.demo.Repo.WordRepository;
import com.example.demo.Repo.YoutubeRepository;

@Service
public class WordService {

	@Autowired
	private WordRepository wordRepository;

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private MaraiMoozhiRepository maraimoozhiRepository;

	@Autowired
	private YoutubeRepository youTubeRepository;

	public Word createWord(Word word) {
//		Set<Book> books = new HashSet<>();
//		for (Book book : word.getBooks()) {
//			Book existingBook = bookRepository.findByBookName(book.getBookName()).orElseGet(() -> {
//				Book newBook = new Book();
//				newBook.setBookName(book.getBookName());
//				newBook.setBookName_firstLetter(book.getBookName_firstLetter());
//				newBook.setBookNameDescription(book.getBookNameDescription());
//				return bookRepository.save(newBook);
//			});
//			books.add(existingBook);
//		}
//		word.setBooks(books);
//
//		// Similar logic for MaraiMoozhi
//		Set<MaraiMoozhi> maraimoozhis = new HashSet<>();
//		for (MaraiMoozhi maraimoozhi : word.getMaraimoozhis()) {
//			MaraiMoozhi existingMaraimoozhi = maraimoozhiRepository
//					.findByMaraiMoozhiName(maraimoozhi.getMaraiMoozhiName()).orElseGet(() -> {
//						MaraiMoozhi newMaraimoozhi = new MaraiMoozhi();
//						newMaraimoozhi.setMaraiMoozhiName(maraimoozhi.getMaraiMoozhiName());
//						newMaraimoozhi.setMaraiMoozhiDescription(maraimoozhi.getMaraiMoozhiDescription());
//						return maraimoozhiRepository.save(newMaraimoozhi);
//					});
//			maraimoozhis.add(existingMaraimoozhi);
//		}
//		word.setMaraimoozhis(maraimoozhis);
//
//		// Similar logic for YouTube
//		Set<YouTube> youTubeVideos = new HashSet<>();
//		for (YouTube youTube : word.getYouTubeVideos()) {
//			YouTube existingYouTube = youTubeRepository.findByYouTubeURL(youTube.getYouTubeURL()).orElseGet(() -> {
//				YouTube newYouTube = new YouTube();
//				newYouTube.setYouTubeURL(youTube.getYouTubeURL());
//				newYouTube.setYouTubetitle(youTube.getYouTubetitle());
//				return youTubeRepository.save(newYouTube);
//			});
////			existingYouTube.getWords().add(word);
//			youTubeVideos.add(existingYouTube);
//		}
//		word.setYouTubeVideos(youTubeVideos);
//
//		return wordRepository.save(word);

		Word existingWord = wordRepository.findByWordName(word.getWordName() != null ? word.getWordName().trim() : null).orElse(word);

		// Set the word description if updating an existing word
		if (existingWord.getId() != null) {
		    existingWord.setWordNameDescription(word.getWordNameDescription() != null ? word.getWordNameDescription().trim() : null);
		}

		// Handle the book relationships
		Set<Book> books = new HashSet<>();
		for (Book book : word.getBooks()) {
		    String trimmedBookName = book.getBookName() != null ? book.getBookName().trim() : null;
		    Book existingBook = bookRepository.findByBookName(trimmedBookName).orElseGet(() -> {
		        Book newBook = new Book();
		        newBook.setBookName(trimmedBookName);
		        newBook.setBookName_firstLetter(book.getBookName_firstLetter() != null ? book.getBookName_firstLetter().trim() : null);
		        newBook.setBookNameDescription(book.getBookNameDescription() != null ? book.getBookNameDescription().trim() : null);
		        return bookRepository.save(newBook);
		    });
		    // Maintain bidirectional relationship if needed
		    // existingBook.getWords().add(existingWord); // Uncomment if needed
		    books.add(existingBook);
		}
		existingWord.setBooks(books); // Update the word's book list

		// Handle the maraiMoozhi relationships
		Set<MaraiMoozhi> maraimoozhis = new HashSet<>();
		for (MaraiMoozhi maraimoozhi : word.getMaraimoozhis()) {
		    String trimmedMaraiMoozhiName = maraimoozhi.getMaraiMoozhiName() != null ? maraimoozhi.getMaraiMoozhiName().trim() : null;
		    MaraiMoozhi existingMaraimoozhi = maraimoozhiRepository
		            .findByMaraiMoozhiName(trimmedMaraiMoozhiName).orElseGet(() -> {
		                MaraiMoozhi newMaraimoozhi = new MaraiMoozhi();
		                newMaraimoozhi.setMaraiMoozhiName(trimmedMaraiMoozhiName);
		                newMaraimoozhi.setMaraiMoozhiDescription(maraimoozhi.getMaraiMoozhiDescription() != null ? maraimoozhi.getMaraiMoozhiDescription().trim() : null);
		                return maraimoozhiRepository.save(newMaraimoozhi);
		            });
		    // Maintain bidirectional relationship if needed
		    // existingMaraimoozhi.getWords().add(existingWord); // Uncomment if needed
		    maraimoozhis.add(existingMaraimoozhi);
		}
		existingWord.setMaraimoozhis(maraimoozhis); // Update the word's maraiMoozhi list

		// Handle the YouTube relationships
		Set<YouTube> youTubeVideos = new HashSet<>();
		for (YouTube youTube : word.getYouTubeVideos()) {
		    String trimmedYouTubeURL = youTube.getYouTubeURL() != null ? youTube.getYouTubeURL().trim() : null;
		    YouTube existingYouTube = youTubeRepository.findByYouTubeURL(trimmedYouTubeURL).orElseGet(() -> {
		        YouTube newYouTube = new YouTube();
		        newYouTube.setYouTubeURL(trimmedYouTubeURL);
		        newYouTube.setYouTubetitle(youTube.getYouTubetitle() != null ? youTube.getYouTubetitle().trim() : null);
		        return youTubeRepository.save(newYouTube);
		    });
		    // Maintain bidirectional relationship if needed
		    // existingYouTube.getWords().add(existingWord); // Uncomment if needed
		    youTubeVideos.add(existingYouTube);
		}
		existingWord.setYouTubeVideos(youTubeVideos); // Update the word's YouTube video list

		// Save and return the updated or new word entity
		return wordRepository.save(existingWord);


	}

	public List<String> getAllBookNames() {
		return wordRepository.findAllBookNames();
	}

	public List<String> getAllMaraiMoozhiNames() {
		return wordRepository.findAllMaraiMoozhiNames();
	}

	public List<String> getAllWordNames() {
		return wordRepository.findAllWordNames();
	}

	public List<Word> getAllWords() {
		return wordRepository.findAll();
	}

	  public List<UniqueWordDetails> getWordSummaryByMaraiMoozhi(String maraiMoozhiName) {
	        List<Word> words = wordRepository.findWordSummaryByMaraiMoozhi(maraiMoozhiName);
	        System.out.println(words);
	        return words.stream()
	                .map(word -> new UniqueWordDetails(
	                        word.getWordName(),
	                        word.getWordNameDescription(),
	                        word.getBooks().stream().map(Book::getBookName).collect(Collectors.toList()),
	                        word.getMaraimoozhis().stream().map(MaraiMoozhi::getMaraiMoozhiName).collect(Collectors.toList()),
	                        word.getYouTubeVideos().stream().map(YouTube::getYouTubetitle).collect(Collectors.toList())
	                ))
	                .collect(Collectors.toList());
	    }
	public List<WordBookMaraiMoozhiYouTubeDTO> getWordBookMaraiMoozhiYouTubeList() {
		return wordRepository.findWordBookMaraiMoozhiYouTube();
	}

	public List<String> getWordsByBookName(String bookName) {
		return wordRepository.findWordsByBookName(bookName);
	}

	public List<UniqueWordDetails> getUniqueWordDetails() {
		List<Object[]> results = wordRepository.findUniqueWordDetailsNative();
		return results.stream().map(row -> new UniqueWordDetails((String) row[0], // wordName
				(String) row[1], // wordNameDescription
				(String) row[2], // bookNames (concatenated string)
				(String) row[3], // maraiMoozhiNames (concatenated string)
				(String) row[4] // youTubeNames (concatenated string)
		)).collect(Collectors.toList());
	}

	public List<String> getWordsByMaraiMoozhiName(String maraiMoozhiName) {
		return wordRepository.findWordsByMaraiMoozhiName(maraiMoozhiName);
	}

	public Word getWordByName(String name) {
		return wordRepository.findByWordName(name).orElseThrow(() -> new RuntimeException("Word not found: " + name));
	}

	public List<UniqueWordDetails> getWordSummaryByBookName(String bookName) {
//		return wordRepository.findWordSummaryByBookName(decodedParam);
		System.out.println(bookName);
		List<Word> words = wordRepository.findWordSummaryByBookName(bookName);
		System.out.println(words);
		return words.stream()
				.map(word -> new UniqueWordDetails(word.getWordName(), word.getWordNameDescription(),
						word.getBooks().stream().map(Book::getBookName).toList(),
						word.getMaraimoozhis().stream().map(MaraiMoozhi::getMaraiMoozhiName).toList(),
						word.getYouTubeVideos().stream().map(YouTube::getYouTubetitle).toList()))
				.toList();

	}
}
