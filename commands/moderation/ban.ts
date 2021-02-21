import { botCache, fetchMembers, highestRole, higherRolePosition, botID } from '../../deps.ts';
import { getMemberID } from '../../managers/Commands.ts';

botCache.commands.set('ban', {
    requiresMod: true,
    exec: async (message, args) => {
        // ban <User> <Reason>
        if (args!.length < 2) return;

        // let [mentioned] = message.mentions;
        const memberInput = getMemberID(args[0]);

        let member;
        // Check cache
        if (message.guild?.members.has(memberInput)) {
            member = message.guild?.members.get(memberInput);
        } else {
            // Fetch member
            member = (await fetchMembers(message.guild!, {
                userIDs: [args[0]]
            })).first();
        }

        // Can author ban member part
        const authorHighestRole = await highestRole(message.guildID, message.author.id);
        const memberHighestRole = await highestRole(message.guildID, member!.id);

        const canAuthorBanMember = await higherRolePosition(
            message.guildID,
            authorHighestRole!.id,
            memberHighestRole!.id,
        );
        if (!canAuthorBanMember) return message.delete();

        // Can bot ban member part
        const botHighestRole = await highestRole(message.guildID, botID);

        const canBotBanMember = await higherRolePosition(
            message.guildID,
            botHighestRole!.id,
            memberHighestRole!.id,
        );
        if (!canBotBanMember) return message.delete();

        // TODO: This

    }
})