require('dotenv').config()

const {
  messageController
} = require('./controllers/botController')

const { Client, IntentsBitField } = require('discord.js')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
})

client.on('ready', () => {
  console.log('BOT ready');
})

// message controller
client.on('messageCreate', messageController)

client.login(process.env.DISCORD_BOT_TOKEN)
console.log('BOT IS ONLINE');