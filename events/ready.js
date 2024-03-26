const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    execute(client){
        try {
            console.log(`Ready! Logged in as ${client.user.tag}`);
			client.user.setPresence({
				activities: [{ name: ` over  Subsequent RP`, type: ActivityType.Watching },]
			});
        } catch (err) {
            console.error(err);
        }
    }
};