/* Dependencies */
const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');

/* Configuration files */
const token = require(path.join(__dirname, 'token.json'));
const config = require(path.join(__dirname, 'config.json'));

/* Setup */
const questionDir = path.join(__dirname, 'questions');
const responseReactions = ['🇦', '🇧', '🇨', '🇩', '🇪'];
const maxRespnses = responseReactions.length;
const client = new Discord.Client();

// Utility functions

/* Random number in range */
function randRange(min, max) {
    const num = Math.random() * (max - min) + min;
    return Math.floor(num);
}

/* Fetch a random question */
function getRandomQuestion() {
    let randomFiles = fs.readdirSync(questionDir);
    const randomFileName = randomFiles[randRange(0, randomFiles.length)];
    const questionFile = fs.readFileSync(path.join(questionDir, randomFileName));
    return JSON.parse(questionFile);
}

/* Fisher-Yates shuffle - https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm */
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = randRange(0, i);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
}
/* Format a question for being sent as a message */
function questionFormat(arr) {
    let builtString = ``;
    let upTo = arr.length <= maxRespnses ? arr.length : maxRespnses;

    if (arr.length == 0) return constructedString;

    for (let i = 0; i < upTo; i++) {
        builtString = builtString + responseReactions[i] + ' ' + arr[i] + '\n';
    }

    return builtString;
}

// On startup

client.once('ready', () => {
    console.log('Bot has started');
});

// Command handling

client.on('message', (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'start') {
        start(message.channel);
    } else if (command === 'stop') {
        stop(message.channel);
    } else if (command === 'test-msg') {
        let randQ = getRandomQuestion();    /* Get a random question */
        let upTo = randQ.responses.length <= maxRespnses ? randQ.responses.length : maxRespnses;
        let correctReact = null;            /* Used for determining the correct reaction */
        let allReacts = [];                 /* All possible reactions for this question */

        if (upTo < 2) return;               /* This is a quiz, there needs to be at least 2 responses */

        shuffle(randQ.responses);           /* Randomize answer order */

        for (let i = 0; i < upTo; i++) {
            allReacts.push(responseReactions[i]);
            if (randQ.responses[i] == randQ.answer)
                correctReact = responseReactions[i];
        }

        message.channel.send('Question: ' + randQ.question + '\n'
                  + 'Value: ' + randQ.value + '\n\n'
                  + questionFormat(randQ.responses) + '\n'
                  + '_React within **' + config.questionTime / 1000 + '  seconds** with your answer!_')
        .then(async msg => {
            const filter = (reaction, user) => {
                return allReacts.includes(reaction.emoji.name) && user.id == message.author.id;
            };
            
            await msg.awaitReactions(filter, {max: 1, time: config.questionTime, errors: ['time']})
                .then(collected => {
                    const reaction = collected.first();
                    
                    if (reaction.emoji.name == correctReact)
                        message.reply("correct!");
                    else
                        message.reply("incorrect!");
                    })
                    .catch(collected => {
                        message.reply("no response received!");
                    })
        })
        .catch();
    }
});

client.login(token.token);