import { MessageEmbed } from "discord.js";
import { client, cmds, PREFIX } from "..";
import { Command } from "../types/Command";

export const helpHandler: Command = {
    title: 'help',
    category: 'STATUS',
    description: 'List of help commands',
    exec: async (msg) => {
        let Embed = new MessageEmbed()
            .setTitle('Commands')
            .setDescription('These are my commands, use them with ' + PREFIX)
            .setColor('#00F')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        for (let command of cmds) {
            Embed.addField(PREFIX + command.title.toUpperCase(), command.description);
        }
        const myMessage = await msg.channel.send(Embed)
        myMessage.react('🔧');
    }
}
