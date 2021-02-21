import { Message, botCache } from '../deps.ts';

export const parseCommand = (cmdName: string): ICommand | null => {
    const command = botCache.commands.get(cmdName);
    if (command) return command;

    for (const key of Array.from(botCache.commands.keys())) {
        const cmd = botCache.commands.get(key) as ICommand;
        if (cmd.aliases != null && cmd.aliases.includes(cmdName)) {
            return cmd;
        }
    }

    return null;
}

export const getMemberID = (input: string): string => {
    if (input.startsWith('<@') && input.endsWith('>')) {
        input = input.slice(2, -1);
        if (input.startsWith('!')) {
            input = input.slice(1);
        }
    }
    return input;
}

export const getChannelID = (input: string): string => {
    if (input.startsWith('<#') && input.endsWith('>')) {
        input = input.slice(2, -1);
    }
    return input;
}

export interface ICommand {
    requiresMod: boolean,
    aliases?: string[],
    exec: (message: Message, language: any, args?: string[]) => unknown
}