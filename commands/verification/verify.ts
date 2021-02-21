import { botCache, addRole, highestRole, higherRolePosition, botID } from '../../deps.ts';

botCache.commands.set('verify', {
    requiresMod: false,
    exec: async (message) => {
        if (message.channelID !== botCache.config.channels.verification) return;

        const botHighestRole = await highestRole(message.guildID, botID);
        const memberHighestRole = await highestRole(message.guildID, message.member!.id);

        const canProceed = await higherRolePosition(message.guildID, botHighestRole!.id, memberHighestRole!.id);
        // const canProceed = botHighestRole!.higherThanRoleID(memberHighestRole!.id);

        if (canProceed) {
            await addRole(message.guildID, message.member!.id, botCache.config.roles.verified, 'User verified.').catch(console.error);
        }
    }
})