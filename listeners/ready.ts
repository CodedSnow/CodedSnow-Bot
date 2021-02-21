import { editBotsStatus, StatusTypes, ActivityType, botCache } from '../deps.ts';

botCache.listeners.ready = async () => {
    editBotsStatus(StatusTypes.Online, " with snowflakes", ActivityType.Game);

    console.log("Bot successfully started, at your service.");
}