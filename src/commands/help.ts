import { MessageEmbed } from "discord.js";
import { client, cmds, PREFIX } from "..";
import { Command, CommandWithAlias } from "../types/Command";

export const help: CommandWithAlias = {
    title: 'help',
    category: 'STATUS',
    description: 'List of help commands',
    alias: ['h', 'helpmeplz'],
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
