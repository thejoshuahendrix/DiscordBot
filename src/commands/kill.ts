import { Command } from "../types/Command";

export const killHandler: Command = { 
    title: 'kill',
    alias: 'murder',
    category: 'STATUS',
    description: 'Try to kill another person',
    exec: async (msg) => {
        let member = msg.mentions.members.first();
        if(member){
            const myMsg = await msg.channel.send('Thall shall not kill ' + member.displayName)
        myMsg.react('😇')
        }
        else{
            const myMsg = await msg.channel.send('Whom do you want to kill?')
        }
        
    }
}