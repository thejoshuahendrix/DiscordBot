import { config } from 'dotenv';
import { Client, Message, MessageEmbed } from 'discord.js';
import chalk from 'chalk';

import db, { fetch } from 'quick.db';
import { test } from './commands/test';
import { Command, CommandWithAlias } from './types/Command';
import { help } from './commands/help';

config();


let economy = new db.table('economy');

let health = new db.table('health');

let time = new Date();


export const client = new Client();
client.once('ready', () => {
    console.log(chalk.blue.bgWhite.bold('[Bot Ready]'));

});



export const metrics = {
    totalCalls: 0,
    totalMessages: 0
};
export const PREFIX = '!';
// let commands = ['help', 'kill', 'profile', 'hello', 'bot', 'resetbot', 'server', 'buy', 'redeem', 'hit', 'health', 'image'];
export const cmds : Command[] = [
    test,
    help
];

client.on('message', async (message) => {
    if (message.author.bot)
        return;
    metrics.totalMessages++;
    console.log(message.member.displayName + ': ' + message.content);
    for (const cmd of cmds) {
        if (message.cleanContent.toLowerCase().startsWith(PREFIX + cmd.title)) {
            await cmd.exec(message);
            metrics.totalCalls++;
            break;
        }
    }
});

//message listener
// client.on('message', async (message) => {
//     if (message.author !== client.user) {
//         console.log(message.member.displayName + ': ' + message.content);
//     }

//     if (client == null) return;
//     if (client.user == null) return;
//     if (message == null) return;
//     if (message.member == null) return;
//     if (message.guild == null) return;

//     if (message) {
//         economy.add(message.member.displayName + 'balance', 1)
//     }



//     //help
//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[0])) {
//         let Embed = new MessageEmbed()
//             .setTitle('Commands')
//             .setDescription('These are my commands, use them with ' + PREFIX)
//             .setColor('#00F')
//             .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
//         for (let command of commands) {
//             Embed.addField(command.toUpperCase(), PREFIX + command);
//         }
//         const msg = await message.channel.send(Embed)
//         msg.react('🔧')
//         botCalls++;
//     }


//     //kill
//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[1])) {
//         let member = message.mentions.members.first();

//         const msg = await message.channel.send('Thall shall not kill ' + member.displayName)
//         msg.react('😇')
//         botCalls++;
//     }


//     //profile
//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[2])) {
//         const userData = {
//             user_id: message.member.user.id,
//             name: message.member.displayName,
//         }

//         message.channel.send(new MessageEmbed()
//             .setTitle('Your Profile')
//             .setDescription('This is your profile')
//             .addField('Profile Name :', userData.name)
//             .addField('Profile ID :', userData.user_id)
//             .addField('Lives', economy.get(message.member.displayName + 'balance'), true)
//             .addField('Items', economy.get(message.member.displayName + 'items'))
//             .setColor("#000")
//             .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
//         )
//         botCalls++;
//     }
//     //hello
//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[3])) {

//         const msg = await message.channel.send('Hello There ' + message.member.displayName);
//         msg.react('💸');
//         botCalls++;

//     }

//     //bot
//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[4])) {
//         const msg = await message.channel.send(new MessageEmbed()
//             .setTitle('Bot Uptime Calls')
//             .setDescription('My current amount of calls since my uptime is ' + botCalls)
//             .addField('BootTime: ', time.toLocaleTimeString())
//             .setColor('#0F0'));
//         msg.react('🔌');
//         botCalls++;
//     }

//     //botreset
//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[5])) {
//         const msg = await message.channel.send('Bot Calls Reset!')
//         botCalls = 0;
//     }


//     //server
//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[6])) {
//         const msg = await message.channel.send(new MessageEmbed().setTitle('Server Info')
//             .setDescription('This server is ' + message.guild.name)
//             .addField('ID:', message.guild.id)
//             .addField('Members', message.guild.memberCount)
//             .setColor('#F00')
//             .setThumbnail(message.guild.iconURL({ dynamic: true }) || '')
//         );
//         msg.react('🛰')
//         botCalls++;
//     }

//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[7])) {
//         if (economy.get(message.member.displayName + 'balance') > 5) {
//             economy.subtract(message.member.displayName + 'balance', 5)
//             economy.add(message.member.displayName + 'items', 1)
//             const msg = await message.channel.send('Bought an item')
//         } else {
//             const msg = await message.channel.send('Not enough Lives, get active!')
//             msg.react('😁');
//         }
//         botCalls++;
//     }

//     //redeeem
//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[8])) {
//         if (economy.get(message.member.displayName + 'items') >= 5) {
//             let role = message.guild.roles.cache.find(r => r.name === "Chad");
//             let member = message.member;
//             economy.subtract(message.member.displayName + 'items', 5)
//             // Add the role!
//             member.roles.add(role).catch(console.error);
//             const msg = await message.channel.send(message.member.displayName + ' became a Chad')
//             msg.react('💸')

//         } else {
//             const msg = await message.channel.send('Not enough items, sorry...');
//             msg.react('😢')
//         }
//         botCalls++;
//     }

//     //hit
//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[9])) {
//         let member = message.mentions.members.first();
//         if (member) {


//             let rand = Math.random() * 30;

//             health.subtract(member.displayName + 'health', rand)
//             const msg = await message.channel.send(
//                 `${message.member.displayName} hit ${member.displayName} for ${Math.floor(rand)} damage,
//          they now have ${health.get(member.displayName + 'health')} health! `
//             )
//             msg.react('⚔️')

//             let afterlife = ['heaven', 'hell'];

//             let afterlifeEmoji = ['😇', '😈'];
//             let afterlifeRand = Math.round(Math.random() * 1);

//             if (health.get(member.displayName + 'health') <= 0) {
//                 const msg = await message.channel.send(`${member.displayName} died and has gone to ${afterlife[afterlifeRand]}`);
//                 msg.react(afterlifeEmoji[afterlifeRand]);
//                 health.add(member.displayName + 'health', 100);
//             }
//             botCalls++;

//         }
//     }
//     //health
//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[10])) {
//         let member = message.mentions.members.first();
//         if(member){
//             let msg = await message.channel.send(
//                 `${member.displayName} has ${health.get(member.displayName + 'health')} health`
//             );
//         }else{
//             let msg = await message.channel.send(
//                 `${message.member.displayName} has ${health.get(message.member.displayName + 'health')} health`
//             );
//         }
        
//         botCalls++;

//     }

//     //image
//     if (message.cleanContent.toLowerCase().startsWith(PREFIX + commands[11])) {
//         let embed = new MessageEmbed();
//         let msg = await message.channel.send(embed.setThumbnail('https://picsum.photos/200'));
//     }

// });



client.on('messageReactionAdd', async (reaction) => {
    if (reaction.message.author! == client.user)
        reaction.message.react(reaction.emoji);
})

//channel create listener
client.on("channelCreate", function (channel) {
    console.log(`channelCreate: ${channel.id}`);
});

//message delete listener
client.on("messageDelete", function (message) {
    console.log(`message is deleted -> ${message.content}`);
});

//voice channel listener
client.on('voiceStateUpdate', (before, after) => {
    if (before.channel == null && after.channel !== null) {
        console.log('Person joined' + after.channel.name)
    }
})


client.login(process.env.DISCORD_TOKEN);





