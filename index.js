const { Telegraf, Markup } = require("telegraf");
const TOKEN = "7981651629:AAGHoTeJJz2bmyhMoMZdG7F0tjAc3TNRPCw";
const bot = new Telegraf(TOKEN);
const express = require("express");
const app = express();
app.use(express.json());
const web_link = "https://miniappclone.vercel.app/"; // Replace with your web app URL
const community_link = "https://t.me/cribbleorg";

// Log when the bot starts
bot.launch().then(() => {
    console.log('Bot is up and running!');
}).catch((error) => {
    console.error('Error launching bot:', error);
});

// Handle the `/start` command
bot.command('/start', (ctx) => {
    const startPayload = ctx.message.text.split(' ').slice(1).join(' '); // Extract potential payload after '/start'
    const urlSent = `${web_link}?ref=${encodeURIComponent(startPayload)}`; // Encode payload for URL safety
    const user = ctx.message.from;
    const userName = user.username ? `@${user.username}` : user.first_name;

    console.log(`Received /start command from user: ${userName} (${user.id}) with payload: ${startPayload}`);

    // Log the reply message
    console.log(`Sending reply with message to ${userName}: *Hey, ${userName}! Welcome to Cribble!*`);

    ctx.replyWithMarkdownV2(`*Hey, ${userName}! Welcome to Cribble!*  

Mine \\$TRACEX cryptocurrency easily and earn \\$TRACEX tokens.  

Start mining now and be among the biggest players earning \\$TRACEX tokens daily.  

Got friends, relatives, co-workers?  
Bring them all into the game.  
More squad power, more \\$TRACEX tokens
.`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: " Start now!", web_app: { url: urlSent } }],
                [{ text: "Join our Community", url: community_link }]
            ]
        }
    });
});

// Set webhook URL and log it
const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = `https://crib-backend.onrender.com`; // Replace with your actual Render URL
console.log('Setting webhook...');
bot.telegram.setWebhook(`${WEBHOOK_URL}/bot${TOKEN}`).then(() => {
    console.log('Webhook successfully set!');
}).catch((error) => {
    console.error('Error setting webhook:', error);
});

app.post(`/bot${TOKEN}`, (req, res) => {
    console.log('Received an update from Telegram:', req.body);
    bot.handleUpdate(req.body).then(() => {
        console.log('Bot handled the update successfully.');
    }).catch((error) => {
        console.error('Error handling the update:', error);
    });
    res.sendStatus(200);  // Acknowledge receipt of the update
});

// Log when server starts
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
