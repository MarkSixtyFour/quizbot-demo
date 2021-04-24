# quizbot-demo
A simple Discord quiz/trivia bot created as an assignment for a class, CIT412 - Computer Simulation Applications. Note that this bot isn't yet feature-complete and is rather early-on in development. I haven't made such a program before and I wanted to give it a shot, my class project was a good opportunity.

## What does it do so far?
So far, the bot can get questions at random from JSON files respond to a few test commands. It doesn't yet validate the JSON files so be careful when making new questions for the bot to read.

## Required setup
This bot must be self-hosted and doesn't include an API key. To run this bot, ensure you have NPM installed, along with all dependencies of the package. Make a new JSON file called `token.json` and put it in the bot's root directory, and ensure it has the following contents:
```JavaScript
{
    "token": "your_discord_bot_token_here"
}
```

Then, run the bot using `node`:
```
node bot.js
```

## To-do list
- [x] Get the bot connecting to Discord, and responding to basic commands
- [x] Randomly select questions from JSON
- [ ] Use message reactions to read user responses
- [ ] Create additionl test commands to test base functionality
- [ ] Validate JSON files at run-time and alert users of incorrect JSON files
- [ ] Use embeds to make output prettier and more useful
- [ ] Implement base command set to play the game properly
- [ ] Store user scores
