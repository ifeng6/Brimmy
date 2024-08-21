import discordJS from 'discord.js';
import dotenv from "dotenv";
import { commands } from './commands/commands.js'
const { Client, Collection, Events, GatewayIntentBits } = discordJS;
dotenv.config();

// Start up a new client with intents (guild is same thing as 'server')
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers] 
});

client.commands = new Collection()
// Load commands into the client
commands.forEach(command => {
    client.commands.set(command.data.name, command);
})

// Start the bot
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Check for slash commands
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

    try {
        // Execute the command
        await command.execute(interaction);
    } catch (error) {
        console.error(error)
        if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
});

client.login(process.env.TOKEN);