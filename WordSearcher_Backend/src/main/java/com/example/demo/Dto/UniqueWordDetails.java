package com.example.demo.Dto;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class UniqueWordDetails {

	private String wordName;
	private String wordNameDescription; // Added description field
	private List<String> bookNames;
	private List<String> maraiMoozhiNames;
	private List<String> youTubeNames;

	public UniqueWordDetails(String wordName, String wordNameDescription, String bookNames, String maraiMoozhiNames,
			String youTubeNames) {
		this.wordName = wordName;
		this.wordNameDescription = wordNameDescription; // Set description
		this.bookNames = parseToList(bookNames);
		this.maraiMoozhiNames = parseToList(maraiMoozhiNames);
		this.youTubeNames = parseToList(youTubeNames);
	}

	public UniqueWordDetails(String wordName, String wordNameDescription, List<String> bookNames,
			List<String> maraiMoozhiNames, List<String> youTubeNames) {
		this.wordName = wordName;
		this.wordNameDescription = wordNameDescription;
		this.bookNames = bookNames;
		this.maraiMoozhiNames = maraiMoozhiNames;
		this.youTubeNames = youTubeNames;
	}

	private List<String> parseToList(String concatenatedValues) {
		if (concatenatedValues == null || concatenatedValues.isEmpty()) {
			return List.of();
		}
		return Arrays.stream(concatenatedValues.split(",")).map(String::trim).collect(Collectors.toList());
	}

	// Getters and Setters
	public String getWordName() {
		return wordName;
	}

	public void setWordName(String wordName) {
		this.wordName = wordName;
	}

	public String getWordNameDescription() {
		return wordNameDescription;
	}

	public void setWordNameDescription(String wordNameDescription) {
		this.wordNameDescription = wordNameDescription;
	}

	public List<String> getBookNames() {
		return bookNames;
	}

	public void setBookNames(List<String> bookNames) {
		this.bookNames = bookNames;
	}

	public List<String> getMaraiMoozhiNames() {
		return maraiMoozhiNames;
	}

	public void setMaraiMoozhiNames(List<String> maraiMoozhiNames) {
		this.maraiMoozhiNames = maraiMoozhiNames;
	}

	public List<String> getYouTubeNames() {
		return youTubeNames;
	}

	public void setYouTubeNames(List<String> youTubeNames) {
		this.youTubeNames = youTubeNames;
	}
}
