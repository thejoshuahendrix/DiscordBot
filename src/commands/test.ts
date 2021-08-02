import { Command } from "../types/Command";

export const test: Command = {
    title: 'test',
    category: 'STATUS',
    description: 'test',
    exec: async (msg) => {
        console.log(msg.author);
    }
}