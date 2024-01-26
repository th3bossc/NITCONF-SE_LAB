package com.nitconfbackend.nitconf.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nitconfbackend.nitconf.models.Session;
import com.nitconfbackend.nitconf.models.Tags;
import com.nitconfbackend.nitconf.repositories.TagsRepository;



@RestController
@RequestMapping("/api/tags")
public class Tagcontroller {
    @Autowired
    private TagsRepository repository;
    
    @GetMapping("/{title}")
    public ResponseEntity<List<Session>> FindSessions(@PathVariable String title) {
        Tags tag =  repository.findByTitle(title).orElseThrow();
        List<Session> relatedSessions = tag.getSessions();

        return ResponseEntity.ok(relatedSessions);
    }

    @GetMapping("")
    public ResponseEntity<List<Tags>> FindAll() {
        List<Tags> tags = repository.findAll();
        return ResponseEntity.ok(tags);
    }

}