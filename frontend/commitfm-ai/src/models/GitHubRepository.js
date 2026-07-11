export class GitHubRepository {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || "";
        this.fullName = data.fullName || data.full_name || "";
        this.description = data.description || "";
        this.htmlUrl = data.htmlUrl || data.html_url || "";
        this.defaultBranch = data.defaultBranch || data.default_branch || "main";
        this.languages = data.languages || (data.language ? { [data.language]: 100000 } : {});
        this.starsCount = data.stars !== undefined ? data.stars : (data.starsCount !== undefined ? data.starsCount : (data.stargazers_count || 0));
        this.forksCount = data.forks !== undefined ? data.forks : (data.forksCount !== undefined ? data.forksCount : (data.forks_count || 0));
        this.openIssuesCount = data.openIssuesCount !== undefined ? data.openIssuesCount : (data.open_issues_count || 0);
        this.isPrivate = data.isPrivate !== undefined ? data.isPrivate : (data.private || false);
        this.lastSyncedAt = data.updatedAt ? new Date(data.updatedAt) : (data.lastSyncedAt ? new Date(data.lastSyncedAt) : null);
        this.owner = data.owner || null; // Can hold user details or login string
    }

    /**
     * Factory method to deserialize backend DTO or GitHub API payload
     */
    static fromJSON(json) {
        if (!json) return null;
        return new GitHubRepository(json);
    }

    /**
     * Serializes instance to a standard DTO format for API requests
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            fullName: this.fullName,
            description: this.description,
            htmlUrl: this.htmlUrl,
            defaultBranch: this.defaultBranch,
            languages: this.languages,
            starsCount: this.starsCount,
            forksCount: this.forksCount,
            openIssuesCount: this.openIssuesCount,
            isPrivate: this.isPrivate,
            lastSyncedAt: this.lastSyncedAt ? this.lastSyncedAt.toISOString() : null,
            owner: this.owner
        };
    }

    /**
     * Getter for total codebase size represented in bytes
     */
    get totalCodebaseBytes() {
        return Object.values(this.languages).reduce((sum, bytes) => sum + bytes, 0);
    }

    /**
     * Helper to compute percentage weights of each language
     */
    get languagePercentages() {
        const total = this.totalCodebaseBytes;
        if (total === 0) return {};
        
        const percentages = {};
        for (const [lang, bytes] of Object.entries(this.languages)) {
            percentages[lang] = parseFloat(((bytes / total) * 100).toFixed(1));
        }
        return percentages;
    }
}

export default GitHubRepository;
