package com.example.demo.Entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "youTube")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class YouTube {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String youTubetitle;

//    @Column(nullable = false)
    private String youTubeURL;

    @ManyToMany(mappedBy = "youTubeVideos", cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JsonIgnore
//    @JsonBackReference
    private Set<Word> words = new HashSet<>();

    // Getters, setters, equals, hashCode, toString
    
    public void addWord(Word word) {
        if (word != null && !this.words.contains(word)) {
            this.words.add(word);
        }
    }
}