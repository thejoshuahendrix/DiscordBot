import { MessageEmbed } from "discord.js";
import { metrics } from "..";
import { Command } from "../types/Command";


export const serverHandler: Command = { 
    title: 'server',
    alias: 'serverinfo',
    category: 'STATUS',
    description: 'Display information about the server',
    exec: async (msg) => {
        const myMsg = await msg.channel.send(new MessageEmbed().setTitle('Server Info')
            .setDescription('This server is ' + msg.guild.name)
            .addField('ID:', msg.guild.id)
            .addField('Members', msg.guild.memberCount)
            .addField('Total Messages since Bot uptime:', metrics.totalMessages)
            .setColor('#F00')
            .setThumbnail(msg.guild.iconURL({ dynamic: true }) || '')
        );
        msg.react('🛰')
        
    }
}