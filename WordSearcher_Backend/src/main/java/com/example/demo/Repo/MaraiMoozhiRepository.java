package com.example.demo.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.MaraiMoozhi;

@Repository
public interface MaraiMoozhiRepository extends JpaRepository<MaraiMoozhi, Long> {

	

	Optional<MaraiMoozhi> findByMaraiMoozhiName(String name);
}
