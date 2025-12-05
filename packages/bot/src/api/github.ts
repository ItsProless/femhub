import { betterFetch } from '@better-fetch/fetch';
import type { Endpoints } from '@octokit/types';

type RepoResponse = Endpoints['GET /repos/{owner}/{repo}']['response']['data'];
type Release = Endpoints['GET /repos/{owner}/{repo}/releases/latest']['response']['data'];
type ReleaseResponse = Release | Release[];
type UserResponse = Endpoints['GET /users/{username}']['response']['data'];
type IssueResponse = Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data'];
type SingleIssueResponse = Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}']['response']['data'];
type BranchesResponse = Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'];
type CommitsResponse = Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'];
type ContributorsResponse = Endpoints['GET /repos/{owner}/{repo}/contributors']['response']['data'];
type LanguagesResponse = Endpoints['GET /repos/{owner}/{repo}/languages']['response']['data'];
type TagsResponse = Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'];
type ReadmeResponse = Endpoints['GET /repos/{owner}/{repo}/readme']['response']['data'];
type PullRequestsResponse = Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data'];
type SinglePullRequestResponse = Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}']['response']['data'];

export const GithubAPI = {
	repoInfo: async (owner: string, repo: string) => {
		const { data, error } = await betterFetch<RepoResponse>(`https://api.github.com/repos/${owner}/${repo}`);
		if (error) {
			return { error };
		}
		return { data };
	},

	repoRelease: async (owner: string, repo: string) => {
		let endpoint = `https://api.github.com/repos/${owner}/${repo}/releases`;
		const { data, error } = await betterFetch<ReleaseResponse>(endpoint);
		if (error) {
			return { error };
		}
		return { data };
	},

	userInfo: async (username: string) => {
		const { data, error } = await betterFetch<UserResponse>(`https://api.github.com/users/${username}`);
		if (error) {
			return { error };
		}
		return { data };
	},

	issueInfo: async (owner: string, repo: string) => {
		const { data, error } = await betterFetch<IssueResponse>(`https://api.github.com/repos/${owner}/${repo}/issues`);
		if (error) {
			return { error };
		}
		return { data };
	},

	singleIssue: async (owner: string, repo: string, issueNumber: number) => {
		const { data, error } = await betterFetch<SingleIssueResponse>(
			`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`,
		);
		if (error) {
			return { error };
		}
		return { data };
	},

	branches: async (owner: string, repo: string) => {
		const { data, error } = await betterFetch<BranchesResponse>(
			`https://api.github.com/repos/${owner}/${repo}/branches`,
		);
		if (error) {
			return { error };
		}
		return { data };
	},

	commits: async (owner: string, repo: string, branch?: string) => {
		let endpoint = `https://api.github.com/repos/${owner}/${repo}/commits`;
		if (branch) {
			endpoint += `?sha=${branch}`;
		}
		const { data, error } = await betterFetch<CommitsResponse>(endpoint);
		if (error) {
			return { error };
		}
		return { data };
	},

	contributors: async (owner: string, repo: string) => {
		const { data, error } = await betterFetch<ContributorsResponse>(
			`https://api.github.com/repos/${owner}/${repo}/contributors`,
		);
		if (error) {
			return { error };
		}
		return { data };
	},

	languages: async (owner: string, repo: string) => {
		const { data, error } = await betterFetch<LanguagesResponse>(
			`https://api.github.com/repos/${owner}/${repo}/languages`,
		);
		if (error) {
			return { error };
		}
		return { data };
	},

	tags: async (owner: string, repo: string) => {
		const { data, error } = await betterFetch<TagsResponse>(`https://api.github.com/repos/${owner}/${repo}/tags`);
		if (error) {
			return { error };
		}
		return { data };
	},

	readme: async (owner: string, repo: string) => {
		const { data, error } = await betterFetch<ReadmeResponse>(`https://api.github.com/repos/${owner}/${repo}/readme`);
		if (error) {
			return { error };
		}
		return { data };
	},

	pullRequests: async (owner: string, repo: string) => {
		const { data, error } = await betterFetch<PullRequestsResponse>(
			`https://api.github.com/repos/${owner}/${repo}/pulls`,
		);
		if (error) {
			return { error };
		}
		return { data };
	},

	singlePullRequest: async (owner: string, repo: string, prNumber: number) => {
		const { data, error } = await betterFetch<SinglePullRequestResponse>(
			`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
		);
		if (error) {
			return { error };
		}
		return { data };
	},
};
