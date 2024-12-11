package com.example.demo.Dto;

public class WordBookMaraiMoozhiYouTubeDTO {
    private String bookName;
    private String wordName;
    private String maraiMoozhiName;
    private String youTubeName;

    // Constructor
    public WordBookMaraiMoozhiYouTubeDTO(String bookName, String wordName, String maraiMoozhiName, String youTubeName) {
        this.bookName = bookName;
        this.wordName = wordName;
        this.maraiMoozhiName = maraiMoozhiName;
        this.youTubeName = youTubeName;
    }

    // Getters and setters
    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getWordName() {
        return wordName;
    }

    public void setWordName(String wordName) {
        this.wordName = wordName;
    }

    public String getMaraiMoozhiName() {
        return maraiMoozhiName;
    }

    public void setMaraiMoozhiName(String maraiMoozhiName) {
        this.maraiMoozhiName = maraiMoozhiName;
    }

    public String getYouTubeName() {
        return youTubeName;
    }

    public void setYouTubeName(String youTubeName) {
        this.youTubeName = youTubeName;
    }
}

