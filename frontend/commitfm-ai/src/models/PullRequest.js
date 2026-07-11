export class PullRequest {
    constructor(data = {}) {
        this.id = data.id || null;
        this.number = data.number || null;
        this.title = data.title || "";
        this.body = data.body || "";
        this.state = data.state || "open"; // 'open' | 'closed' | 'merged'
        this.createdAt = data.createdAt ? new Date(data.createdAt) : (data.created_at ? new Date(data.created_at) : new Date());
        this.closedAt = data.closedAt ? new Date(data.closedAt) : (data.closed_at ? new Date(data.closed_at) : null);
        this.mergedAt = data.mergedAt ? new Date(data.mergedAt) : (data.merged_at ? new Date(data.merged_at) : null);
        this.user = data.user || null; // Author metadata
        this.commentsCount = data.commentsCount !== undefined ? data.commentsCount : (data.comments || 0);
        this.additions = data.additions || 0;
        this.deletions = data.deletions || 0;
    }

    /**
     * Factory method to deserialize backend DTO or GitHub API payload
     */
    static fromJSON(json) {
        if (!json) return null;
        return new PullRequest(json);
    }

    /**
     * Serializes instance to a standard DTO format for API requests
     */
    toJSON() {
        return {
            id: this.id,
            number: this.number,
            title: this.title,
            body: this.body,
            state: this.state,
            createdAt: this.createdAt.toISOString(),
            closedAt: this.closedAt ? this.closedAt.toISOString() : null,
            mergedAt: this.mergedAt ? this.mergedAt.toISOString() : null,
            user: this.user,
            commentsCount: this.commentsCount,
            additions: this.additions,
            deletions: this.deletions
        };
    }

    /**
     * Getter for total lines changed
     */
    get totalChanges() {
        return this.additions + this.deletions;
    }

    /**
     * Checks if pull request was successfully merged into target branch
     */
    get isMerged() {
        return this.state === "merged" || !!this.mergedAt;
    }

    /**
     * Calculates age of the pull request in hours
     */
    get ageInHours() {
        const end = this.closedAt || new Date();
        return Math.abs(end - this.createdAt) / 36e5;
    }
}

export default PullRequest;
