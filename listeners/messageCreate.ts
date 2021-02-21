import { sendMessage, botCache, LibCache } from '../deps.ts';
import { parseCommand } from '../managers/Commands.ts';
import { Embed } from '../structures/Embed.ts';

botCache.listeners.messageCreate = async (message) => {
    if (message.author.bot) return;
    if (!LibCache.getGuild(message.guildID)) return;

    // If the message is in the verification channel
    if (message.channelID === botCache.config.channels.verification) {
        // Delete the message
        await message.delete('In verification channel.');
    }

    const prefix = botCache.config.prefix;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = args.shift()?.toLowerCase();
    if (command === undefined || command === '') return;

    const cmd = parseCommand(command);
    if (cmd === null) return;

    // Check if the command requires a moderation role
    if (cmd.requiresMod) {
        // The configured role
        const role = LibCache.getGuild(message.guildID).roles.get(botCache.config.roles.mod);

        // Check if the player has the role, if not then return a mesasge
        if (!message.guildMember?.roles.includes(botCache.config.roles.mod))
            return sendMessage(message.channelID, {
                embed: new Embed()
                    .setAuthor('Insufficient Permissions')
                    .setColor('#f73444')
                    .setDescription(`You need to have the \`${role?.name}\` role!`)
            });
    }

    // Run the actual command
    await cmd.exec(message, args);
}