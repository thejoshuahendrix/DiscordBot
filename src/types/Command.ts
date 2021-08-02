import { Message } from "discord.js";

export type Command = {
    title: string;
    category: 'AT' | 'STATUS' | 'COMBAT' | 'STORE';
    description: string;
    exec: (message : Message) => (Promise<void> | void);
}

// type Animal = {
//     height: number;
//     name: string;
//     kind: 'MAMAL' | 'REPTILE';
//     growl: (at: Animal) => void;
// };

// const SteveTheDog: Animal = {
//     height: 2,
//     kind: "MAMAL",
//     name: 'Steve',
//     growl: (at) => {
//         console.log('I growled at ' + at);
//     }
// };

// const Luc: Animal = {
//     name: 'Luc',
//     kind: 'MAMAL',
//     height: 6,
//     growl: (at) => {
//         console.log('Yeah... no');
//     }
// };

// const AllThePetsInTheZoo: Animal[] = [
//     SteveTheDog,
//     Luc
// ];