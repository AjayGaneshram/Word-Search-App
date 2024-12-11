package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.YouTube;
import com.example.demo.Repo.YoutubeRepository;

@Service
public class YouTubeService {

    @Autowired
    private YoutubeRepository youTubeRepository;

    public YouTube createYouTube(YouTube youTube) {
        return youTubeRepository.save(youTube);
    }

    public List<YouTube> getAllYouTubeVideos() {
        return youTubeRepository.findAll();
    }

    public YouTube getYouTubeByName(String name) {
        return youTubeRepository.findByYouTubeURL(name)
                .orElseThrow(() -> new RuntimeException("YouTube video not found: " + name));
    }
    
    public YouTube getYouTubeById(Long id) {
        return youTubeRepository.findById(id).orElseThrow(() -> new RuntimeException("YouTube not found!"));
    }
}
