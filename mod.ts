import { startBot, Intents, botCache } from './deps.ts';
import PostgreSQL from './structures/PostgreSQL.ts';

// Load the config
botCache.config = JSON.parse(Deno.readTextFileSync('./config.json'));

// Setup the postgresql pool
// await PostgreSQL.setupPool();

const importDirectory = async (path: string) => {
    const files = Deno.readDirSync(Deno.realPathSync(path));
    for (const file of files) {
        if (!file.name) continue;
        const currentPath = `${path}/${file.name}`;
        if (file.isFile) {
            await import(currentPath);
            continue;
        }
        await importDirectory(currentPath);
    }
};

await Promise.all(
    ['./commands', './listeners'].map((path) => importDirectory(path)),
);

startBot({
    token: botCache.config.token,
    intents: [Intents.GUILDS, Intents.GUILD_MESSAGES, Intents.GUILD_MEMBERS],
    eventHandlers: botCache.listeners
});