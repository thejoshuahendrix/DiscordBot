import { health } from "..";
import { Command } from "../types/Command";

export const hitHandler: Command = {
    title: 'hit',
    alias: 'attack',
    category: 'COMBAT',
    description: 'Hit another member',
    exec: async (msg) => {
        let member = msg.mentions.members.first();
        if (member) {


            let rand = Math.random() * 30;

            health.subtract(member.displayName + 'health', rand)
            const myMessage = await msg.channel.send(
                `${msg.member.displayName} hit ${member.displayName} for ${Math.floor(rand)} damage,
         they now have ${health.get(member.displayName + 'health')} health! `
            )
            myMessage.react('⚔️')

            let afterlife = ['heaven', 'hell'];
            let afterlifeEmoji = ['😇', '😈'];
            let afterlifeRand = Math.round(Math.random() * 1);

            if (health.get(member.displayName + 'health') <= 0) {
                const myMsg = await msg.channel.send(`${member.displayName} died and has gone to ${afterlife[afterlifeRand]}`);
                myMsg.react(afterlifeEmoji[afterlifeRand]);
                health.add(member.displayName + 'health', 100);
            }

        }else{
            const myMsg = await msg.channel.send('You must choose someone to hit');
            myMsg.react('🙃')
        }
    }
}