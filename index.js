const { Telegraf, Markup } = require("telegraf");
const TOKEN = "7981651629:AAGHoTeJJz2bmyhMoMZdG7F0tjAc3TNRPCw";
const bot = new Telegraf(TOKEN);
const express = require("express");
const app = express();
app.use(express.json());
const web_link = "https://miniappclone.vercel.app/"; // Replace with your web app URL
const community_link = "https://t.me/cribbleorg";

// Handle the `/start` command
bot.command('/start', (ctx) => {
    const startPayload = ctx.message.text.split(' ').slice(1).join(' '); // Extract potential payload after '/start'
    const urlSent = `${web_link}?ref=${encodeURIComponent(startPayload)}`; // Encode payload for URL safety
    const user = ctx.message.from;
    const userName = user.username ? `@${user.username}` : user.first_name;
    ctx.replyWithMarkdown(`*Hey, ${userName}! Welcome to Cribble!*  

Mine $TRACEX cryptocurrency easily and earn $TRACEX tokens.  

Start mining now and be among the biggest players earning $TRACEX tokens daily.  

Got friends, relatives, co-workers?  
Bring them all into the game.  
More squad power, more $TRACEX tokens

.`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: " Start now!", web_app: { url: urlSent } }],
                [{ text: "Join our Community", url: community_link }]
            ]
        }
    });
});

bot.launch();

app.listen(3000, () => {
    console.log("Server is running!");
});
