package com.piyush.commitfm_ai.controller;

import com.piyush.commitfm_ai.dto.CommitDto;
import com.piyush.commitfm_ai.service.CommitService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CommitController {

    private final CommitService commitService;

    public CommitController(CommitService commitService) {
        this.commitService = commitService;
    }

    @GetMapping("/commits")
    public List<CommitDto> getCommits() {
        return commitService.getDummyCommits();
    }
}