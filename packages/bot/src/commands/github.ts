import type { CacheType, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from './index';
import { GithubAPI } from '../api';

export default {
	data: {
		name: 'github',
		description: 'Retrieve GitHub information',
		type: 1,
		options: [
			{
				name: 'repo',
				description: 'Repository information',
				type: 2,
				options: [
					{
						name: 'get',
						description: 'Get repository details',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
						],
					},
					{
						name: 'branches',
						description: 'List branches of a repository',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
						],
					},
					{
						name: 'commits',
						description: 'List commits of a repository',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
							{ name: 'branch', description: 'Branch name (default: main)', type: 3, required: false },
						],
					},
					{
						name: 'contributors',
						description: 'List contributors of a repository',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
						],
					},
					{
						name: 'languages',
						description: 'List languages used in a repository',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
						],
					},
					{
						name: 'tags',
						description: 'List tags of a repository',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
						],
					},
					{
						name: 'releases',
						description: 'List releases of a repository',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
						],
					},
					{
						name: 'readme',
						description: 'Get repository README',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
						],
					},
				],
			},
			{
				name: 'issue',
				description: 'Issue information',
				type: 2,
				options: [
					{
						name: 'list',
						description: 'List issues of a repository',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
						],
					},
					{
						name: 'get',
						description: 'Get details of a specific issue',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
							{ name: 'number', description: 'Issue number', type: 4, required: true },
						],
					},
				],
			},
			{
				name: 'pull',
				description: 'Pull request information',
				type: 2,
				options: [
					{
						name: 'list',
						description: 'List pull requests of a repository',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
						],
					},
					{
						name: 'get',
						description: 'Get details of a pull request',
						type: 1,
						options: [
							{ name: 'owner', description: 'Repository owner', type: 3, required: true },
							{ name: 'repo', description: 'Repository name', type: 3, required: true },
							{ name: 'number', description: 'PR number', type: 4, required: true },
						],
					},
				],
			},
		],
	},
	execute: async (interaction) => {
		await interaction.deferReply();

		const subcommandGroup = interaction.options.getSubcommandGroup();
		const subcommand = interaction.options.getSubcommand();

		switch (subcommandGroup) {
			case 'repo':
				switch (subcommand) {
					case 'get': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const { data, error } = await GithubAPI.repoInfo(owner, repo);
						console.log(owner, repo, data, error);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						await interaction.editReply(
							`**${data.full_name}**\n${data.description || 'No description'}\n⭐ ${data.stargazers_count} | 🍴 ${data.forks_count} | 👀 ${data.watchers_count}\n${data.html_url}`,
						);
						break;
					}
					case 'branches': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const { data, error } = await GithubAPI.branches(owner, repo);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						const branchList = data
							.slice(0, 10)
							.map((b) => `• ${b.name}`)
							.join('\n');
						await interaction.editReply(
							`**Branches** (showing ${Math.min(data.length, 10)} of ${data.length}):\n${branchList}`,
						);
						break;
					}
					case 'commits': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const branch = interaction.options.getString('branch') || undefined;
						const { data, error } = await GithubAPI.commits(owner, repo, branch);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						const commitList = data
							.slice(0, 5)
							.map((c) => `• \`${c.sha.substring(0, 7)}\` ${c.commit.message.split('\n')[0]}`)
							.join('\n');
						await interaction.editReply(`**Recent Commits**${branch ? ` on \`${branch}\`` : ''}:\n${commitList}`);
						break;
					}
					case 'contributors': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const { data, error } = await GithubAPI.contributors(owner, repo);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						const contributorList = data
							.slice(0, 10)
							.map((c) => `• ${c.login} (${c.contributions} contributions)`)
							.join('\n');
						await interaction.editReply(
							`**Top Contributors** (showing ${Math.min(data.length, 10)} of ${data.length}):\n${contributorList}`,
						);
						break;
					}
					case 'languages': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const { data, error } = await GithubAPI.languages(owner, repo);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						const total = Object.values(data).reduce((sum, bytes) => sum + bytes, 0);
						const languageList = Object.entries(data)
							.map(([lang, bytes]) => `• ${lang}: ${((bytes / total) * 100).toFixed(1)}%`)
							.join('\n');
						await interaction.editReply(`**Languages**:\n${languageList}`);
						break;
					}
					case 'tags': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const { data, error } = await GithubAPI.tags(owner, repo);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						if (data.length === 0) {
							await interaction.editReply('No tags found.');
							return;
						}
						const tagList = data
							.slice(0, 10)
							.map((t) => `• ${t.name}`)
							.join('\n');
						await interaction.editReply(
							`**Tags** (showing ${Math.min(data.length, 10)} of ${data.length}):\n${tagList}`,
						);
						break;
					}
					case 'releases': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const { data, error } = await GithubAPI.repoRelease(owner, repo);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						if (!Array.isArray(data)) {
							await interaction.editReply(`**Latest Release**: ${data.name || data.tag_name}\n${data.html_url}`);
							return;
						}
						if (data.length === 0) {
							await interaction.editReply('No releases found.');
							return;
						}
						const releaseList = data
							.slice(0, 5)
							.map((r) => `• ${r.name || r.tag_name} (${r.tag_name})`)
							.join('\n');
						await interaction.editReply(
							`**Releases** (showing ${Math.min(data.length, 5)} of ${data.length}):\n${releaseList}`,
						);
						break;
					}
					case 'readme': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const { data, error } = await GithubAPI.readme(owner, repo);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						await interaction.editReply(`**README**: ${data.name}\n${data.html_url}`);
						break;
					}
				}
				break;
			case 'issue':
				switch (subcommand) {
					case 'list': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const { data, error } = await GithubAPI.issueInfo(owner, repo);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						if (data.length === 0) {
							await interaction.editReply('No issues found.');
							return;
						}
						const issueList = data
							.slice(0, 10)
							.map((i) => `• #${i.number}: ${i.title} (${i.state})`)
							.join('\n');
						await interaction.editReply(
							`**Issues** (showing ${Math.min(data.length, 10)} of ${data.length}):\n${issueList}`,
						);
						break;
					}
					case 'get': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const number = interaction.options.getInteger('number', true);
						const { data, error } = await GithubAPI.singleIssue(owner, repo, number);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						await interaction.editReply(
							`**Issue #${data.number}**: ${data.title}\n**State**: ${data.state}\n**Author**: ${data.user?.login}\n${data.html_url}`,
						);
						break;
					}
				}
				break;
			case 'pull':
				switch (subcommand) {
					case 'list': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const { data, error } = await GithubAPI.pullRequests(owner, repo);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						if (data.length === 0) {
							await interaction.editReply('No pull requests found.');
							return;
						}
						const prList = data
							.slice(0, 10)
							.map((pr) => `• #${pr.number}: ${pr.title} (${pr.state})`)
							.join('\n');
						await interaction.editReply(
							`**Pull Requests** (showing ${Math.min(data.length, 10)} of ${data.length}):\n${prList}`,
						);
						break;
					}
					case 'get': {
						const { owner, repo } = await getDefaultGithubData(interaction);
						const number = interaction.options.getInteger('number', true);
						const { data, error } = await GithubAPI.singlePullRequest(owner, repo, number);
						if (error) {
							await interaction.editReply(`Error: ${error.message}`);
							return;
						}
						await interaction.editReply(
							`**PR #${data.number}**: ${data.title}\n**State**: ${data.state}\n**Author**: ${data.user?.login}\n**Base**: ${data.base.ref} ← **Head**: ${data.head.ref}\n${data.html_url}`,
						);
						break;
					}
				}
				break;
		}
	},
} satisfies Command;

export async function getDefaultGithubData(interaction: ChatInputCommandInteraction<CacheType>) {
	const owner = interaction.options.getString('owner', true);
	const repo = interaction.options.getString('repo', true);
	return { owner, repo };
}
