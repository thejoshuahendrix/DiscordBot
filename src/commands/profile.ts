import { MessageEmbed } from "discord.js"
import { economy } from ".."
import { Command } from "../types/Command"



export const profileHandler: Command = {
    title: 'profile',
    category: 'STATUS',
    description: 'Display profile information',
    exec: async (msg) => {

        const userData = {
            user_id: msg.member.user.id,
            name: msg.member.displayName,
        }

        msg.channel.send(new MessageEmbed()
            .setTitle('Your Profile')
            .setDescription('This is your profile')
            .addField('Profile Name :', userData.name)
            .addField('Profile ID :', userData.user_id)
            .addField('Lives', economy.get(msg.member.displayName + 'balance'), true)
            .addField('Items', economy.get(msg.member.displayName + 'items'))
            .setColor("#000")
            .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        )


    }
}