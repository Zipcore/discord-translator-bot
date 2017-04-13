const Discord = require('discord.js')
const translateClient = require('@google-cloud/translate')({
  projectId: 'project-id',
  keyFilename: '/path/to/keyfile.json'
});

const bot = new Discord.Client()

let languagesObj = {}
let languageCodes = ''

// Get a list of supported languages
translateClient.getLanguages(function(err, languages) {
  if (!err) {
    for(let k in languages) {
      languagesObj[languages[k].name] = languages[k].code
      languageCodes += `**${languages[k].name}**: ${languages[k].code}\n`
    }
  }
});

bot.on('ready', () => {
  console.log('Ready');
  // bot.game.name = '$commands'
  bot.user.setGame('$commands')
  // console.log(bot)
});

// Event listener for messages
bot.on('message', (message) => {
  let msgArr = message.content.split(' ');
  let command = msgArr[0]
  let arg1 = msgArr[1]
  let arg2 = msgArr[2]

  // List commands
  if(command === '$commands') {
    message.channel.sendMessage(`:earth_americas: __**Translator Bot Commands**__ :earth_africa:\n\n\`$translate <language code> <message>\`\n\n**$langcode <language>** :flashlight: Look up a language code based on language name\n**$translate help** :mailbox_with_mail: Receive a DM with a list of all supported languages & language codes`)
  }

  // Translate text to the language of the specificed langugage code
  if(command === '$translate' && arg1 != 'help') {
    msgArr.splice(0,2)

    if(Object.values(languagesObj).indexOf(arg1) < 0 || !arg2) {
        message.channel.sendMessage(`Sorry, I wasn't able to translate that!\n\n__**Correct Syntax:**__\n$translate <language code> <message>\n\nFor a list of all the supported language codes, use ***$translate help***.`)
        return
    }

    // Detect language inputted
    translateClient.translate(msgArr.join(' '), arg1, function(err, translation) {
      if (!err) {
        message.channel.sendMessage(translation)
      }
    });
  }

  // Help command - sends a direct message with all of the language codes
  else if(command === '$translate' && arg1 === 'help') {
    message.author.sendMessage(`${languageCodes}`)
  }

  // Does a langauge code lookup based on the language given as an argument
  else if(command === '$langcode') {
    let capitalizedLang = arg1[0].toUpperCase() + arg1.slice(1)

    if(Object.keys(languagesObj).indexOf(capitalizedLang) > -1) {
      message.channel.sendMessage(`__**${capitalizedLang} Language Code:**__\n${languagesObj[capitalizedLang]}`)
    } else {
      message.channel.sendMessage(`I'm afraid there is no language code for \`${arg1}\``)
    }
  }

})

// Log in your bot
bot.login('token')
