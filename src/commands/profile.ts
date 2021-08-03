import { MessageEmbed } from "discord.js"
import { economy } from ".."
import { Command } from "../types/Command"



export const profileHandler: Command = {
    title: 'profile',
    alias: 'me',
    category: 'STATUS',
    description: 'Display profile information',
    exec: async (msg) => {
        msg.channel.send(new MessageEmbed()
            .setTitle('Your Profile')
            .setDescription('This is your profile')
            .addField('Profile Name :', msg.member.user.id)
            .addField('Profile ID :', msg.member.displayName)
            .addField('Currency', economy.get(msg.member.displayName + 'balance'), true)
            .addField('Items', economy.get(msg.member.displayName + 'items'))
            .setColor("#000")
            .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        )


    }
}