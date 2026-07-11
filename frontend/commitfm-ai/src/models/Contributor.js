export class Contributor {
    constructor(data = {}) {
        this.id = data.id || null;
        this.login = data.login || "";
        this.avatarUrl = data.avatarUrl || data.avatar_url || "";
        this.htmlUrl = data.htmlUrl || data.html_url || "";
        this.contributionsCount = data.contributionsCount !== undefined ? data.contributionsCount : (data.contributions || 0);
        this.type = data.type || "User";
    }

    /**
     * Factory method to deserialize backend DTO or GitHub API payload
     */
    static fromJSON(json) {
        if (!json) return null;
        return new Contributor(json);
    }

    /**
     * Serializes instance to a standard DTO format for API requests
     */
    toJSON() {
        return {
            id: this.id,
            login: this.login,
            avatarUrl: this.avatarUrl,
            htmlUrl: this.htmlUrl,
            contributionsCount: this.contributionsCount,
            type: this.type
        };
    }

    /**
     * Checks if this is a standard user or bot account
     */
    get isBot() {
        return this.type === "Bot" || this.login.toLowerCase().includes("bot");
    }
}

export default Contributor;
