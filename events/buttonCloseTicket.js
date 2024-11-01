// Whenever a ticket is created a 'close' button is sent inside of it. Once the ticket has been used/ served its purpose then it can be closed.
// Once the button is clicked a transcript is created and sent to it's corresponding log channel, as well as information about the ticket.

const { Events, } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const idList = require('../data/idList');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId == "closeChannel") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Deleting ticket and creating a transcript", ephemeral: true,
                    });
                    const mes = await interaction.channel.messages.fetch();
                    const firstmessage = mes.last();
                    const attachment = await discordTranscripts.createTranscript(interaction.channel);
                    const playerid = firstmessage.content.replace('<', '').replace('@', '').replace('$', '').replace('{', '').replace('}', '').replace('>', '');
                    const player = await interaction.client.users.fetch(playerid);
                    if ( (interaction.channel.parentId === idList.whitelistcategory) || (interaction.channel.parentId === idList.awaitinginterviewcategory) || (interaction.channel.parentId === idList.whitelistinprogresscategory) || (interaction.channel.parentId === idList.whitelistonholdcategory) || (interaction.channel.parentId === idList.unresponsivecategory) || (interaction.channel.parentId === idList.whitelistcompletedcategory )) {
                        const transcriptChan = interaction.client.channels.cache.find(ch => ch.id === idList.whiensupptranschannel);
                        await transcriptChan.send({
                            content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                            files: [attachment]
                        }).then(await interaction.channel.delete());
                    }else if (  (interaction.channel.parentId === idList.supportcategory) || (interaction.channel.parentId === idList.handledsuppchannel) ) {
                        const transcriptChan = interaction.client.channels.cache.find(ch => ch.id === idList.whiensupptranschannel);
                        await transcriptChan.send({
                            content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                            files: [attachment]
                        }).then(await interaction.channel.delete());
                    }else if ( (interaction.channel.parentId === idList.reportcategory) || (interaction.channel.parentId === idList.applicationcategory) || (interaction.channel.parentId === idList.secondcharactercategory) || (interaction.channel.parentId === idList.handledreportenappchannel) ) {
                        const transcriptChan = interaction.client.channels.cache.find(ch => ch.id === idList.repenapptranschannel);
                        await transcriptChan.send({
                            content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                            files: [attachment]
                        }).then(await interaction.channel.delete());
                    }else if ( (interaction.channel.parentId === idList.staffapplicationcategory) || (interaction.channel.parentId === idList.ownerticketcategory) || (interaction.channel.parentId === idList.banappealcategory) || (interaction.channel.parentId === idList.handledownerchannel) ) {
                        const transcriptChan = interaction.client.channels.cache.find(ch => ch.id === idList.ownertranschannel);
                        await transcriptChan.send({
                            content: `**Ticket name:** ` + interaction.channel.name + `\n\nCreated by: ` + player.globalName + `  ` + firstmessage.content + `\nClosed by: ` + interaction.user.globalName + `  ` + `<@${interaction.user.id}> `,
                            files: [attachment]
                        }).then(await interaction.channel.delete());
                    } else {
                        await interaction.editReply({ content: `You are not allowed to close this channel, as this isn't a ticket`, ephemeral: true });
                    };
                } catch (err) {
                    await interaction.editReply({
                        content: `An error has occurred, please try again later and if the problem persists contact a staff member. Code: Button close ticket.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
		}
    },
};
