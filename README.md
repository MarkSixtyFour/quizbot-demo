# quizbot-demo
A simple Discord quiz/trivia bot created as an assignment for a class, CIT412 - Computer Simulation Applications. Note that this bot isn't yet feature-complete and is rather early-on in development. I haven't made such a program before and I wanted to give it a shot, my class project was a good opportunity.

## A fair warning
Please note that the code is probably fairly broken and spaghetti code at this point, but that will be resolved when this is no longer a class assignment with many other assignments due and finals coming up soon (aka when I'm not in a hurry).

## What does it do so far?
So far, the bot can get questions at random from JSON files, shuffle the answers so the order isn't the same each time, and respond to a answers to a question. It doesn't yet validate the JSON files so be careful when making new questions for the bot to read. Questions should have at least 2 responses.

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

You can test questions by typing the following into the Discord chat where it resides:
```
./test-msg
```

When you're given a question, react to the generated message with one of the emojis it indicates for a specific answer. It should respond with if you were correct or incorrect.

## To-do list
- [x] Get the bot connecting to Discord, and responding to basic commands
- [x] Randomly select questions from JSON
- [x] Use message reactions to read user responses
- [ ] Validate JSON files at run-time and alert users of incorrect JSON files
- [ ] Use embeds to make output prettier and more useful
- [ ] Implement base command set to play the game properly
- [ ] Store user scores
- [ ] Write a tool to generate question JSONs in a user-friendly manner