const { Telegraf, Markup } = require("telegraf");
const express = require("express");

const TOKEN = "7981651629:AAGHoTeJJz2bmyhMoMZdG7F0tjAc3TNRPCw"; // Replace with your actual bot token
const bot = new Telegraf(TOKEN);
const app = express();
app.use(express.json());

const web_link = "https://miniappclone.vercel.app/"; 
const community_link = "https://t.me/cribbleorg";

bot.hears("/start", (ctx) => {
    const user = ctx.message.from;
    const userName = user.username ? `@${user.username}` : user.first_name;

    console.log("Replying to user:", userName);

    ctx.replyWithHTML(
        `Hey Vikram,\n\n<b>Welcome to Cribble AI Agent 🚀</b>\n\n` +
        `"Empowering founders, investors, and Web3 explorers with predictive insights through decentralized AI"\n\n` +
        `<b>What I Can Do For You:</b>\n\n` +
        `🔍 <b>Community Analysis</b>\n` +
        `Unlock growth metrics, sentiment trends, and engagement patterns for any Web3 community (Try: Telegram/X communities)\n\n` +
        `💎 <b>Token Analysis</b>\n` +
        `Get real-time price action, liquidity maps, whale alerts, and volatility predictions\n(Works with 50+ chains & 10,000+ tokens)\n\n` +
        `🎯 <b>Rewards Finder</b>\n` +
        `Automatically discover active airdrops, NFT claims, and staking opportunities\n\n` +
        `🤖 <b>Research Agent</b>\n` +
        `Instant answers about protocols, trends, and any query about Web3 space\n\n` +
        `📌 <b>Choose your tool below to begin</b>`,
        Markup.inlineKeyboard([
            [Markup.button.callback("Analysis", "analysis")],
            [Markup.button.callback("Socials", "socials"), Markup.button.callback("Crypto", "crypto")],
            [Markup.button.callback("Rewards", "rewards")],
            [Markup.button.callback("Airdrops", "airdrops"), Markup.button.callback("Giveaways", "giveaways")],
            [Markup.button.url("Join Community", community_link)],
            [Markup.button.url("Get started", web_link)]

        ])
    )
    .then(() => {
        console.log("Message sent successfully");
    }).catch((error) => {
        console.error("Error sending message:", error);
    });
});

const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = `https://crib-backend.onrender.com`; 

bot.telegram.setWebhook(`${WEBHOOK_URL}/bot${TOKEN}`)
    .then(() => console.log('Webhook successfully set!'))
    .catch((err) => console.error('Error setting webhook:', err));

app.post(`/bot${TOKEN}`, (req, res) => {
    res.sendStatus(200);
    console.log('Received an update from Telegram:', req.body);
    bot.handleUpdate(req.body)
        .then(() => console.log('Bot handled the update successfully.'))
        .catch((error) => console.error('Error handling the update:', error));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
