package com.piyush.commitfm_ai.service;

import com.piyush.commitfm_ai.dto.CommitDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommitService {

    public List<CommitDto> getDummyCommits() {
        return List.of(
                new CommitDto("1", "fix: login bug fixed", "Today"),
                new CommitDto("2", "feat: added dashboard UI", "Yesterday"));
    }
}