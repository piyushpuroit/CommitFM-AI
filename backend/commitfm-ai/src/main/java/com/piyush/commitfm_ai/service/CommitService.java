package com.piyush.commitfm_ai.service;

import com.piyush.commitfm_ai.dto.CommitDto;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommitService {

    public List<CommitDto> getMockCommits(Long repositoryId) {
        List<CommitDto> commits = new ArrayList<>();
        Instant baseInstant = Instant.now();

        // 15 realistic commits
        commits.add(new CommitDto("a1b2c3d4", "feat: integrate Repository Context context provider in onboarding flow", "Piyush Purohit", baseInstant.toString()));
        commits.add(new CommitDto("b2c3d4e5", "fix: resolve memory leaks on dev server reconnect loop", "Piyush Purohit", baseInstant.minus(1, ChronoUnit.HOURS).toString()));
        commits.add(new CommitDto("c3d4e5f6", "refactor: simplify grid structure layout in dashboard components", "Piyush Purohit", baseInstant.minus(4, ChronoUnit.HOURS).toString()));
        commits.add(new CommitDto("d4e5f6g7", "docs: update API endpoints documentation and environment vars", "Piyush Purohit", baseInstant.minus(12, ChronoUnit.HOURS).toString()));
        commits.add(new CommitDto("e5f6g7h8", "test: add mock integration test coverage for auth pipeline", "Piyush Purohit", baseInstant.minus(1, ChronoUnit.DAYS).toString()));
        commits.add(new CommitDto("f6g7h8i9", "feat: create developer evolution timeline visual grid", "Piyush Purohit", baseInstant.minus(2, ChronoUnit.DAYS).toString()));
        commits.add(new CommitDto("g7h8i9j0", "style: enhance onboarding step loading animation layout", "Piyush Purohit", baseInstant.minus(3, ChronoUnit.DAYS).toString()));
        commits.add(new CommitDto("h8i9j0k1", "chore: upgrade telemetry parsing engines to next minor package version", "Piyush Purohit", baseInstant.minus(4, ChronoUnit.DAYS).toString()));
        commits.add(new CommitDto("i9j0k1l2", "fix: handle empty repository results error exception gracefully", "Piyush Purohit", baseInstant.minus(5, ChronoUnit.DAYS).toString()));
        commits.add(new CommitDto("j0k1l2m3", "feat: introduce Career Coach prompt suggestion system", "Piyush Purohit", baseInstant.minus(6, ChronoUnit.DAYS).toString()));
        commits.add(new CommitDto("k1l2m3n4", "refactor: extract AI insights panel data loader custom hook", "Piyush Purohit", baseInstant.minus(7, ChronoUnit.DAYS).toString()));
        commits.add(new CommitDto("l2m3n4o5", "docs: update development guide readme instructions", "Piyush Purohit", baseInstant.minus(8, ChronoUnit.DAYS).toString()));
        commits.add(new CommitDto("m3n4o5p6", "feat: deploy automated build compilation integrity test checks", "Piyush Purohit", baseInstant.minus(9, ChronoUnit.DAYS).toString()));
        commits.add(new CommitDto("n4o5p6q7", "fix: clean up memory allocation references in radar visual hooks", "Piyush Purohit", baseInstant.minus(10, ChronoUnit.DAYS).toString()));
        commits.add(new CommitDto("o5p6q7r8", "chore: initial commit structure and layout scaffold setup", "Piyush Purohit", baseInstant.minus(12, ChronoUnit.DAYS).toString()));

        return commits;
    }
}