import { sendMessage, LibCache } from '../deps.ts';
import { getConfigValue } from '../managers/ServerData.ts';

export class Moderation {
    public guild: string;
    public violator: string | undefined;
    public executor: string; // UserID or 'Bot'
    public type: ModerationType;
    public reason: string | undefined;
    public expires: number | undefined;
    public date: number;

    constructor(options: ModerationOptions) {
        this.guild = options.guild;
        this.violator = options.violator;
        this.executor = options.executor;
        this.type = options.type;
        this.reason = options.reason;
        this.expires = options.expires;
        this.date = options.date;
    }

    public save = async () => {
        // ...
    }

    public log = async () => {
        const lines: string[] = [];

        if (this.violator != null) {
            lines.push(`**Violator:** ${LibCache.getMember(this.violator, this.guild).user.username}`);
        }

        lines.push(`**Exector:** ${this.executor === 'Bot' ? 'Bot' : LibCache.getMember(this.executor, this.guild).user.username}`);

        // TODO: Beautify this
        lines.push(`**Punishment:** ${ModerationType[this.type]}`);

        lines.push(`**Date:** ${new Date(this.date).toLocaleString('default', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })}`);

        if (this.reason != null)
            lines.push(`**Reason:** ${this.reason}`);

        const channelID = await getConfigValue(this.guild, 'modlog') as string;
        sendMessage(channelID, lines.join('\n'))
    }

}

export const fetchByViolator = async (id: number): Promise<Moderation[]> => {
    const data: any = null; // TODO: This

    const result = [];
    for (let i = 0; i < data.length; i++) {
        result.push(new Moderation(data[i]))
    }

    return result;
}

export interface ModerationOptions {
    guild: string,
    violator?: string,
    executor: string,
    type: ModerationType,
    reason?: string,
    expires?: number,
    date: number
}

export enum ModerationType {
    BAN,
    KICK,
    MUTE,
    TEMPBAN,
    TEMPMUTE,
    UNBAN,
    CLEAR,
    CLEARCHAT
}