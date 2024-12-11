package com.example.demo.Entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import jakarta.persistence.JoinColumn;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "word")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Word {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String wordName;

	private String wordNameDescription;

	private String wordName_FirstLetter;

	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST,CascadeType.MERGE})
	@JoinTable(name = "word_book", joinColumns = @JoinColumn(name = "word_id"), inverseJoinColumns = @JoinColumn(name = "book_id"))
//	@JsonManagedReference
	private Set<Book> books = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST,CascadeType.MERGE})
	@JoinTable(name = "word_maraimoozhi", joinColumns = @JoinColumn(name = "word_id"), inverseJoinColumns = @JoinColumn(name = "maraimoozhi_id"))
//	@JsonManagedReference
	private Set<MaraiMoozhi> maraimoozhis = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST,CascadeType.MERGE})
	@JoinTable(name = "word_youtube", joinColumns = @JoinColumn(name = "word_id"), inverseJoinColumns = @JoinColumn(name = "youtube_id"))
//	@JsonManagedReference
	private Set<YouTube> youTubeVideos = new HashSet<>();

	   public void addBook(Book book) {
	        if (book != null && !this.books.contains(book)) {
	            this.books.add(book);
	            if (!book.getWords().contains(this)) {
	                book.addWord(this);
	            }
	        }
	    }

	    public void addMaraiMoozhi(MaraiMoozhi maraiMoozhi) {
	        if (maraiMoozhi != null && !this.maraimoozhis.contains(maraiMoozhi)) {
	            this.maraimoozhis.add(maraiMoozhi);
	            if (!maraiMoozhi.getWords().contains(this)) {
	                maraiMoozhi.addWord(this);
	            }
	        }
	    }

	    public void addYouTube(YouTube youTube) {
	        if (youTube != null && !this.youTubeVideos.contains(youTube)) {
	            this.youTubeVideos.add(youTube);
	            if (!youTube.getWords().contains(this)) {
	                youTube.addWord(this);
	            }
	        }
	    }
}
