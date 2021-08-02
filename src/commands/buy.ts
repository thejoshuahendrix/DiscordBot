import { economy } from "..";
import { Command } from "../types/Command";

export const buyHandler: Command = {
    title: 'buy',
    category: 'STORE',
    description: 'Buy an item, 5 lives required',
    exec: async (msg) => {
        if (economy.get(msg.member.displayName + 'balance') > 5) {
            economy.subtract(msg.member.displayName + 'balance', 5)
            economy.add(msg.member.displayName + 'items', 1)
            const myMsg = await msg.channel.send('Bought an item')
        } else {
            const myMsg = await msg.channel.send('Not enough Lives, get active!')
            msg.react('😁');
        }
    }
}