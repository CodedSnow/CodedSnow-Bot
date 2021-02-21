import { ICommand } from './managers/Commands.ts';
import { EventHandlers, Channel, Guild, cache, Member, Message } from './deps.ts';

export const botCache = {
    config: {} as any,
    commands: new Map<string, ICommand>(),
    listeners: {} as EventHandlers,
    languages: new Map<string, any>()
}

export namespace LibCache {
    export function getGuild(guild_id: string): Guild {
        return cache.guilds.get(guild_id) as Guild;
    }

    export function getMember(member_id: string, guild_id: string): Member {
        const guild = getGuild(guild_id);
        return guild.members.get(member_id) as Member;
    }

    export function getMemberGlobally(member_id: string): Member {
        let member = null;

        for (const guild of cache.guilds.values()) {
            if (!guild.members.has(member_id)) continue;
            member = guild.members.get(member_id)
            break;
        }

        return member as Member;
    }

    export function getChannel(channel_id: string): Channel {
        return cache.channels.get(channel_id) as Channel;
    }

    export function getMessage(message_id: string): Message {
        return cache.messages.get(message_id) as Message;
    }
}