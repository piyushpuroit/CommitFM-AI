export class Commit {
    constructor(data = {}) {
        this.sha = data.sha || "";
        this.message = data.message || "";
        this.authorName = data.author || data.authorName || data.author_name || (data.commit?.author?.name || "");
        this.authorEmail = data.authorEmail || data.author_email || (data.commit?.author?.email || "");
        this.date = data.date ? new Date(data.date) : (data.commit?.author?.date ? new Date(data.commit.author.date) : new Date());
        this.additions = data.additions || 0;
        this.deletions = data.deletions || 0;
        this.changes = data.changes || (this.additions + this.deletions);
        this.htmlUrl = data.htmlUrl || data.html_url || "";
        this.repositoryId = data.repositoryId || data.repository_id || null;
    }

    /**
     * Factory method to deserialize backend DTO or GitHub API payload
     */
    static fromJSON(json) {
        if (!json) return null;
        return new Commit(json);
    }

    /**
     * Serializes instance to a standard DTO format for API requests
     */
    toJSON() {
        return {
            sha: this.sha,
            message: this.message,
            authorName: this.authorName,
            authorEmail: this.authorEmail,
            date: this.date.toISOString(),
            additions: this.additions,
            deletions: this.deletions,
            changes: this.changes,
            htmlUrl: this.htmlUrl,
            repositoryId: this.repositoryId
        };
    }

    /**
     * Getter for abbreviated commit hash
     */
    get shortSha() {
        return this.sha ? this.sha.substring(0, 7) : "";
    }

    /**
     * Helper to determine if commit is descriptive or terse
     */
    get isDescriptive() {
        return this.message.length > 20;
    }
}

export default Commit;
