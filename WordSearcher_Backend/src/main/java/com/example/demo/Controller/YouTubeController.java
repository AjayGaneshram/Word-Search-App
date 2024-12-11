package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.YouTube;
import com.example.demo.Service.YouTubeService;

@RestController
@CrossOrigin
@RequestMapping("/youtube")
public class YouTubeController {

    @Autowired
    private YouTubeService youTubeService;

    @PostMapping
    public ResponseEntity<YouTube> createYouTube(@RequestBody YouTube youTube) {
        YouTube createdYouTube = youTubeService.createYouTube(youTube);
        return ResponseEntity.ok(createdYouTube);
    }

    @GetMapping
    public ResponseEntity<List<YouTube>> getAllYouTubeVideos() {
        List<YouTube> youTubeVideos = youTubeService.getAllYouTubeVideos();
        return ResponseEntity.ok(youTubeVideos);
    }

    @GetMapping("/{name}")
    public ResponseEntity<YouTube> getYouTubeById(@PathVariable String name) {
        YouTube youTube = youTubeService.getYouTubeByName(name);
        return ResponseEntity.ok(youTube);
    }
}
