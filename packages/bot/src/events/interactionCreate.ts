import type { Interaction } from 'discord.js';
import { loadCommands } from '../util/loaders';
import type { Event } from './index';

// Load commands once at startup
const commands = await loadCommands(new URL('../commands/', import.meta.url));

export default {
	name: 'interactionCreate',
	async execute(interaction: Interaction) {
		// Only handle chat input commands (slash commands)
		if (!interaction.isChatInputCommand()) return;

		const command = commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing command ${interaction.commandName}:`, error);

			const errorMessage = { content: 'There was an error while executing this command!', ephemeral: true };

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp(errorMessage);
			} else {
				await interaction.reply(errorMessage);
			}
		}
	},
} satisfies Event<'interactionCreate'>;
