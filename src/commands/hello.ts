import { isElementAccessExpression } from "typescript";
import { Command } from "../types/Command";

export const helloHandler: Command = { 
    title:'hello',
    category: 'STATUS',
    description: 'Get a nice message from the bot',
    exec: async (msg) => {
        const myMsg = await msg.channel.send('Hello There ' + msg.member.displayName);
         myMsg.react('💸');
    }
}

