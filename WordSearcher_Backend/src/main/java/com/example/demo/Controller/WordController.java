package com.example.demo.Controller;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Dto.UniqueWordDetails;
import com.example.demo.Dto.WordBookMaraiMoozhiYouTubeDTO;
import com.example.demo.Entity.Word;
import com.example.demo.Service.WordService;

@RestController
@CrossOrigin
@RequestMapping("/words")
public class WordController {

	@Autowired
	private WordService wordService;

	@PostMapping
	public ResponseEntity<Word> createWord(@RequestBody Word word) {
		Word createdWord = wordService.createWord(word);
		return new ResponseEntity<>(createdWord, HttpStatus.CREATED);
	}

	@GetMapping("/names")
	public ResponseEntity<List<String>> getAllWordNames() {
		return ResponseEntity.ok(wordService.getAllWordNames());
	}

	@GetMapping("/bookNames")
	public ResponseEntity<List<String>> getAllBookNames() {
		return ResponseEntity.ok(wordService.getAllBookNames());
	}

	@GetMapping("/marai-moozhisNames")
	public ResponseEntity<List<String>> getAllMaraiMoozhiNames() {
		return ResponseEntity.ok(wordService.getAllMaraiMoozhiNames());
	}

	@GetMapping
	public ResponseEntity<List<Word>> getAllWords() {
		List<Word> words = wordService.getAllWords();
		return ResponseEntity.ok(words);
	}

	@GetMapping("/{name}")
	public ResponseEntity<Word> getWordByName(@PathVariable String name) {
		String decodedParam = URLDecoder.decode(name, StandardCharsets.UTF_8);
		Word word = wordService.getWordByName(decodedParam);
		return ResponseEntity.ok(word);
	}

	@GetMapping("/by-book/{name}")
	public ResponseEntity<List<String>> getWordsByBookName(@PathVariable String name) {
		String decodedParam = URLDecoder.decode(name, StandardCharsets.UTF_8);
		return ResponseEntity.ok(wordService.getWordsByBookName(decodedParam));
	}

	@GetMapping("/by-marai-moozhi/{name}")
	public ResponseEntity<List<String>> getWordsByMaraiMoozhiName(@PathVariable String name) {
		String decodedParam = URLDecoder.decode(name, StandardCharsets.UTF_8);
		return ResponseEntity.ok(wordService.getWordsByMaraiMoozhiName(decodedParam));
	}

	@GetMapping("/book-summary/{name}")
	public ResponseEntity<List<UniqueWordDetails>> getWordSummaryByBookName(@PathVariable String name) {
		String decodedParam = URLDecoder.decode(name, StandardCharsets.UTF_8);
		return ResponseEntity.ok(wordService.getWordSummaryByBookName(decodedParam));
	}

	@GetMapping("/marai-moozhi-summary/{maraiMoozhiName}")
	public ResponseEntity<List<UniqueWordDetails>> getWordSummaryByMaraiMoozhi(@PathVariable String maraiMoozhiName) {
		String decodedParam = URLDecoder.decode(maraiMoozhiName, StandardCharsets.UTF_8);
		return ResponseEntity.ok(wordService.getWordSummaryByMaraiMoozhi(decodedParam));
	}

	@GetMapping("/unique-details")
	public ResponseEntity<List<UniqueWordDetails>> getUniqueWordDetails() {
		List<UniqueWordDetails> result = wordService.getUniqueWordDetails();
		return ResponseEntity.ok(result);
	}

	@GetMapping("/api/word-book-marai-moozhi-youtube")
	public ResponseEntity<List<WordBookMaraiMoozhiYouTubeDTO>> getWordBookMaraiMoozhiYouTube() {
		List<WordBookMaraiMoozhiYouTubeDTO> result = wordService.getWordBookMaraiMoozhiYouTubeList();
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
