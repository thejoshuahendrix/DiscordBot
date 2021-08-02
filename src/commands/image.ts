import { MessageEmbed } from "discord.js";
import { Command } from "../types/Command";

export const imageHandler: Command = {
    title: 'image',
    category: 'STATUS',
    description: 'Display random image',
    exec: async (msg) => {
        let embed = new MessageEmbed();
        let myMsg = await msg.channel.send(embed.setThumbnail('https://picsum.photos/200'));
    }


}