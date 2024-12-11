package com.example.demo.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.YouTube;


@Repository
public interface YoutubeRepository  extends JpaRepository<YouTube, Long> {

	Optional<YouTube> findByYouTubeURL(String name);
}
