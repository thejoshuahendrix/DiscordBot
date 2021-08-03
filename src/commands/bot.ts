import { MessageEmbed } from "discord.js";
import { metrics, resetTime, time } from "../index";
import { Command } from "../types/Command";


export const botHandler: Command = {
    title: 'bot',
    alias: 'botinfo',
    category: 'STATUS',
    description: 'Display metrics on the bot',
    exec: async (msg) => {
        const myMsg = await msg.channel.send(new MessageEmbed()
            .setTitle('Bot Uptime Calls')
            .setDescription('My current amount of calls since my uptime is ' + metrics.totalCalls)
            .addField('BootTime: ', time.toLocaleTimeString())
            .setColor('#0F0'));
        msg.react('🔌');
    }
}

export const resetbotHandler: Command = {
    title: 'resetbot',
    alias: 'restartbot',
    category: 'STATUS',
    description: 'Reset bot calls and boot time.',
    exec: async (msg) => {
        const myMsg = await msg.channel.send('Bot Calls Reset!')
        metrics.totalCalls = 0;
        resetTime();
    }
}