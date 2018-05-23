# Discord Translator Bot
A Node.JS Discord bot that can translate text using the Google Translate API.

# Commands
`$translate <language code> <text>`  
`$langcode <language>` - :flashlight: Look up a language code based on language name

**$commands** :scroll: lists all available commands  
**$translate help** :mailbox: DMs the user a list of all supported language codes

# Status

It appears that there are some issues with this project and I think they are because of the Translate API itself.  
If you are running this locally and get the "Daily Limit Exceeded" error, I advise you to look at these resources for help:

* [https://github.com/GoogleCloudPlatform/google-cloud-dotnet/issues/1503](https://github.com/GoogleCloudPlatform/google-cloud-dotnet/issues/1503)
* [https://stackoverflow.com/questions/46950972/how-do-i-fix-daily-limit-exceeded-when-using-the-net-client-for-the-google-tran](https://stackoverflow.com/questions/46950972/how-do-i-fix-daily-limit-exceeded-when-using-the-net-client-for-the-google-tran)

Unfortunately, I don't have the time to fix it at the moment but I will get to it eventually.
