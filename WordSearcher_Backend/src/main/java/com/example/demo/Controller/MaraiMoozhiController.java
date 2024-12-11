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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.MaraiMoozhi;
import com.example.demo.Service.MaraiMoozhiService;

@RestController
@CrossOrigin
@RequestMapping("/maraimoozhis")
public class MaraiMoozhiController {

	@Autowired
	private MaraiMoozhiService maraimoozhiService;

	@PostMapping
	public ResponseEntity<MaraiMoozhi> createMaraimoozhi(@RequestBody MaraiMoozhi maraimoozhi) {
		MaraiMoozhi createdMaraimoozhi = maraimoozhiService.createMaraimoozhi(maraimoozhi);
		return ResponseEntity.ok(createdMaraimoozhi);
	}

	@GetMapping
	public ResponseEntity<List<MaraiMoozhi>> getAllMaraimoozhis() {
		List<MaraiMoozhi> maraimoozhis = maraimoozhiService.getAllMaraimoozhis();
		return ResponseEntity.ok(maraimoozhis);
	}

	@GetMapping("/{name}")
	public ResponseEntity<MaraiMoozhi> getMaraimoozhiById(@PathVariable String name) {
		MaraiMoozhi maraimoozhi = maraimoozhiService.getMaraimoozhiByName(name);
		return ResponseEntity.ok(maraimoozhi);
	}
}
