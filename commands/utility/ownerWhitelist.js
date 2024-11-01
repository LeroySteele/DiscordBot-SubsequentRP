// A messege is sent with a button, the button can be used by users to open a whitelisting ticket
// This command can only be used by administrators and only in a certain channel (ensures organisation)

const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ownerwhitelistmessage')
        .setDescription('Create initial message for whilelist tickets'),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
            	content: "Creating whitelist message", ephemeral: true,
            });
            if ( await interaction.member.roles.cache.some(role => role.id === idList.staffRole) ) {
                if ( interaction.channelId === idList.whitelistmessagechannel ) {
                    const whitelistButton = new ButtonBuilder()                 
                        .setCustomId('whitebutton')
                        .setLabel("📋 Apply")
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false);
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const initialEmbed = new EmbedBuilder()
                        .setTitle('Welcome to Subsequent Roleplay!')
                        .setDescription(`:white_check_mark: Please be sure to read our rules and once done, click "Apply" below to open a whitelisting ticket.\n\n:alarm_clock: Once submitted, our staff will review your application and then we will arrange for an interview.\n\n:fire: Get ready to join an amazing community with some of the best roleplay you'll experience.`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'Subsequent RP',iconURL: botAvatar.displayAvatarURL() });
                    await interaction.channel.send({                           
                        embeds: [initialEmbed],
                        components: [new ActionRowBuilder().addComponents(whitelistButton)]                            
                    });
                } else {
                    await interaction.editReply({
                        content: "This command can only be used in the 'whitelist-ticket' channel", ephemeral: true,
                    });
                }
            } else {
                await interaction.editReply({
                    content: "Only staff can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
	            content: `An error has occurred, please try again later and if the problem persists contact admin. Code: Owner whitelist.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
