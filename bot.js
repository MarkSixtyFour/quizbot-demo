// Dependencies
const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');

// Configuration files
const token = require(path.join(__dirname, 'token.json'));
const config = require(path.join(__dirname, 'config.json'));

// Setup
const questionDir = path.join(__dirname, 'questions');
const client = new Discord.Client();

// Utility functions
function randRange(min, max) {
    const num = Math.random() * (max - min) + min;
    return Math.floor(num);
}

function getRandomQuestion() {
    let randomFiles = fs.readdirSync(questionDir);
    const randomFileName = randomFiles[randRange(0, randomFiles.length)];
    const questionFile = fs.readFileSync(path.join(questionDir, randomFileName));
    return JSON.parse(questionFile);
}

client.once('ready', () => {
    console.log('Bot has started');
});

// Bot commands
client.on('message', (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'start') {
        message.channel.send('Quiz has started!');
    } else if (command === 'stop') {
        message.channel.send('Quiz has ended!');
    } else if (command === 'test-msg') {
        var randQuestion = getRandomQuestion();
        message.channel.send(randQuestion.question);
    }
});

client.login(token.token);