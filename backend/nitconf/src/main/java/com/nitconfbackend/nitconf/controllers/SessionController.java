package com.nitconfbackend.nitconf.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nitconfbackend.nitconf.RequestTypes.SessionRequest;
import com.nitconfbackend.nitconf.models.DocumentVersion;
import com.nitconfbackend.nitconf.models.Session;
import com.nitconfbackend.nitconf.models.Tags;
import com.nitconfbackend.nitconf.models.User;
import com.nitconfbackend.nitconf.repositories.DocumentVersionRepository;
import com.nitconfbackend.nitconf.repositories.SessionRepository;
import com.nitconfbackend.nitconf.repositories.TagsRepository;
import com.nitconfbackend.nitconf.repositories.UserRepository;
import com.nitconfbackend.nitconf.services.DocumentUtility;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/session")


public class SessionController {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private SessionRepository sessionRepo;

    @Autowired
    private DocumentVersionRepository docRepo;

    @Autowired
    private DocumentUtility documentUtility;

    @Autowired
    private TagsRepository tagsRepo;


    @GetMapping("")
    public ResponseEntity<List<Session>> getAllSessions() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepo.findByEmail(email).orElseThrow();

        List<Session> sessions = sessionRepo.findByUser(currentUser);
        return ResponseEntity.ok(sessions);
    }

    @PostMapping("")
    public ResponseEntity<Session> newSession(@RequestBody SessionRequest entity) {
        if (entity.title == null || entity.language == null || entity.description == null || entity.level == null || entity.status == null)
            return ResponseEntity.badRequest().build();

        List<Tags> tags = new ArrayList<Tags>();
        entity.tags.forEach(tag -> {
            Tags newTag = tagsRepo.findByTitle(tag).orElseThrow();
            tags.add(newTag);
     });

        Session session = new Session(
            entity.title,
            entity.description,
            entity.language,
            entity.level,
            entity.status,
            tags
        );

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepo.findByEmail(email).orElseThrow();
        session.setUser(currentUser);

        sessionRepo.save(session);

        tags.forEach(tag -> {
            tag.getSessions().add(session);
            tagsRepo.save(tag);
        });


        return ResponseEntity.ok(session);
    }

    @PutMapping("/doc/{id}")
    public ResponseEntity<?> uploadPdf(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        if (id == null)
            return ResponseEntity.notFound().build();
        Session session = sessionRepo.findById(id).orElseThrow();
        try {
            byte[] data = documentUtility.pdfToByte(file);
            List<DocumentVersion> allDocs = docRepo.findBySession(session);
            if (data == null)
                return ResponseEntity.notFound().build();
            DocumentVersion newDoc = new DocumentVersion(
                "New Submission",
                data,
                allDocs.size() + 1,
                session
            );
            docRepo.save(newDoc);
        }
        catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }


        return ResponseEntity.ok().build();
    }

    @GetMapping("/doc/{id}")
    public ResponseEntity<Resource> getDocument(@PathVariable String id) {
        if (id == null)
            return ResponseEntity.notFound().build();
        Session session = sessionRepo.findById(id).orElseThrow();
        List<DocumentVersion> allDocs = docRepo.findBySession(session);
        ByteArrayResource resource = documentUtility.downloadFile(allDocs);
        if (resource == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename= " + id) 
                    .contentType(MediaType.APPLICATION_PDF)
                    .contentLength(resource.contentLength())
                    .body(resource);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Session> getSession(@PathVariable String id) {
        if (id == null)
            return ResponseEntity.notFound().build();
        Session session = sessionRepo.findById(id).orElseThrow();
        return ResponseEntity.ok(session);
    }
    
}
//New session created to be added to user sessions