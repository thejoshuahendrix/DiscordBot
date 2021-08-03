import { economy } from "..";
import { Command } from "../types/Command";

export const redeemHandler: Command = {
    title: 'redeem',
    alias: 'becomechad',
    category: 'STORE',
    description: 'Buy role CHAD with 5 items',
    exec: async (msg) => {
        if (economy.get(msg.member.displayName + 'items') >= 5) {
            let role = msg.guild.roles.cache.find(r => r.name === "Chad");
            let member = msg.member;
            economy.subtract(msg.member.displayName + 'items', 5)
            // Add the role!
            member.roles.add(role).catch(console.error);
            const myMsg = await msg.channel.send(msg.member.displayName + ' became a Chad')
            myMsg.react('💸')

        } else {
            const myMsg = await msg.channel.send('Not enough items, sorry...');
            myMsg.react('😢')
        }
    }
}