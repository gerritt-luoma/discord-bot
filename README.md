# Jeff
This is the repository for my beloved Discord bot, Jeff.  Jeff is a jack of all trades and a master of literally nothing.  I am using Jeff as a way to keep my Javascript and Node skills somewhat up to date since I don't use either in my job.

## Setup
In order to run Jeff you will need to be running on Node version 18+.  I am currently running on `Node v18.14.2`. In order to run Jeff you will need to:
1. Clone or fork this repo
2. CD into the repo and install all necessary dependencies
    ```
    $ cd discord-bot
    $ npm i
    ```
3. Create a `.env` file with the necessary tokens
    - `JEFFS_TOKEN`: This is the client token found in the discord developer portal when creating the bot.  Always keep this token a secret and never share/disclose the token.  Sharing that token is like giving a random person the keys to you Mclaren (or in this case the code equivalent of a busted Honda Civic)
    - `TESTING_TOKEN`: I currently have 2 bots for development/prod.  Jeff is my bot in my personal server and I have a testing bot in a testing server so I'm not annoying my friends while developing.  If you will only have one bot/server you only need the token for your main bot.  Any env variable found in my code prepended with `TESTING_` is optional and can be removed.
    - `JEFFS_CLIENT_ID`: This ID is another token used to identify your bot.  You should be good to disclose this ID but it is best to just store it in your `.env`
    - `PROD_GUILD_ID`: This ID is used to upload your bot commands to your server.  Uploading these commands is immediate whereas uploading the commands as global can take a while to propogate out and you can only upload global commands a certain number of times per day
    - `DAD_JOKES_KEY` and `DAD_JOKES_HOST`: These are the host and API key for the [Dad Jokes](https://rapidapi.com/KegenGuyll/api/dad-jokes) API.  Not necessary if you won't be using this API.  You can remove `src/commands/dad.js` if you won't be using that command.

4. Before attempting to use any commands on your server you will need to deploy the commands with:
   ```
   $ npm run deploy:prod
   ```

5. Finally you can run the bot with
   ```
   $ npm run start
   ```

## Suggestions
If you have any suggestions don't hesitate to create an issue detailing your suggestion!