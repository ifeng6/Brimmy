import config from './config.json' assert { type: 'json' }
import { REST, Routes } from 'discord.js'
import { commands } from './commands/commands.js'

const { clientId, guildId, token } = config;
// Convert each command to JSON to comply with Form Body in PUT
const commandsJSON = commands.map((command) => command.data.toJSON());
// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// Deploy commands
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// Put method fully refreshes all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId), // Remove guildId param if want to deploy commands to all servers the bot is in
			{ body: commandsJSON },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// Check for errors
		console.error(error);
	}
})();
