import { MessageEmbed } from "discord.js";
import { Command } from "../types/Command";


export const serverHandler: Command = { 
    title: 'server',
    category: 'STATUS',
    description: 'Display information about the server',
    exec: async (msg) => {
        const myMsg = await msg.channel.send(new MessageEmbed().setTitle('Server Info')
            .setDescription('This server is ' + msg.guild.name)
            .addField('ID:', msg.guild.id)
            .addField('Members', msg.guild.memberCount)
            .setColor('#F00')
            .setThumbnail(msg.guild.iconURL({ dynamic: true }) || '')
        );
        msg.react('🛰')
        
    }
}