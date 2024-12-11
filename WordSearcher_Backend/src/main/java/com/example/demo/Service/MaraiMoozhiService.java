package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.MaraiMoozhi;
import com.example.demo.Repo.MaraiMoozhiRepository;

@Service
public class MaraiMoozhiService {

    @Autowired
    private MaraiMoozhiRepository maraimoozhiRepository;

    public MaraiMoozhi createMaraimoozhi(MaraiMoozhi maraimoozhi) {
        return maraimoozhiRepository.save(maraimoozhi);
    }

    public List<MaraiMoozhi> getAllMaraimoozhis() {
        return maraimoozhiRepository.findAll();
    }
 

    public MaraiMoozhi getMaraimoozhiByName(String name) {
        return maraimoozhiRepository.findByMaraiMoozhiName(name)
                .orElseThrow(() -> new RuntimeException("Maraimoozhi not found: " + name));
    }
    
    public MaraiMoozhi getMaraimoozhiById(Long id) {
        return maraimoozhiRepository.findById(id).orElseThrow(() -> new RuntimeException("Maraimoozhi not found!"));
    }
}
