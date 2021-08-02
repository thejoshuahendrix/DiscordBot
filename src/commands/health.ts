import { exec } from "child_process";
import { health } from "..";
import { Command } from "../types/Command";

export const healthHandler: Command = {
    title: 'health',
    category: 'COMBAT',
    description: 'Display the health of yourself or another person',
    exec: async (msg) => {
        let member = msg.mentions.members.first();
        if (member) {
            let myMsg = await msg.channel.send(
                `${member.displayName} has ${health.get(member.displayName + 'health')} health`
            );
        } else {
            let myMsg = await msg.channel.send(
                `${msg.member.displayName} has ${health.get(msg.member.displayName + 'health')} health`
            );
        }

    }
}