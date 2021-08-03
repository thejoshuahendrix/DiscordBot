import { config } from 'dotenv';
import { Client } from 'discord.js';
import chalk from 'chalk';
import db from 'quick.db';
import { test } from './commands/test';
import { Command } from './types/Command';
import { helpHandler } from './commands/help';
import { profileHandler } from './commands/profile';
import { hitHandler } from './commands/hit';
import { helloHandler } from './commands/hello';
import { botHandler, resetbotHandler } from './commands/bot';
import { buyHandler } from './commands/buy';
import { redeemHandler } from './commands/redeem';
import { healthHandler } from './commands/health';
import { imageHandler } from './commands/image';
import { killHandler } from './commands/kill';
import { serverHandler } from './commands/server';

config();


export let economy = new db.table('economy');

export let health = new db.table('health');

export let time = new Date();
export let resetTime = () => {
    time = new Date();
}

export const client = new Client();
client.once('ready', () => {
    console.log(chalk.blue.bgWhite.bold('[Bot Ready]'));

});



export const metrics = {
    totalCalls: 0,
    totalMessages: 0
};
export const PREFIX = '!';

export const cmds: Command[] = [
    helpHandler,
    profileHandler,
    hitHandler,
    helloHandler,
    botHandler,
    resetbotHandler,
    buyHandler,
    redeemHandler,
    healthHandler,
    imageHandler,
    killHandler,
    serverHandler
];


//message listener
client.on('message', async (message) => {
    if (message.author.bot)
        return;
    metrics.totalMessages++;
    console.log(message.member.displayName + ': ' + message.content);
    for (const cmd of cmds) {
        if (message.cleanContent.toLowerCase().startsWith(PREFIX + cmd.title || PREFIX + cmd.alias)) {
            await cmd.exec(message);
            metrics.totalCalls++;
            break;
        }
    }
});


//reaction listener
client.on('messageReactionAdd', async (reaction) => {
    if (reaction.message.author !== client.user)
        reaction.message.react(reaction.emoji);
})

//channel create listener
client.on("channelCreate", function (channel) {
    console.log(`channelCreate: ${channel.id}`);
});

//message delete listener
client.on("messageDelete", function (message) {
    console.log(`message is deleted -> ${message.content}`);
});

//voice channel listener
client.on('voiceStateUpdate', (before, after) => {
    if (before.channel == null && after.channel !== null) {
        console.log('Person joined' + after.channel.name)
    }
})





client.login(process.env.DISCORD_TOKEN);





