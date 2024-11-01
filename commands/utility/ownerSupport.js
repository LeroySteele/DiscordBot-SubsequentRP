// A messege is sent with a button, the button can be used by users to open a support ticket
// This command can only be used by administrators and only in a certain channel (ensures organisation)

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList');
const ids = require('../../data/ids');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ownersupportmessage')
        .setDescription('Create initial message for support tickets'),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
            	content: "Creating support message", ephemeral: true,
            });
            if ( await interaction.member.roles.cache.some(role => role.id === idList.staffRole) ) {
                if ( interaction.channelId === idList.supportmessagechannel ) {
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const supportEmbed = new EmbedBuilder()
                        .setTitle('Subsequent Tickets')
                        .setDescription(`**:interrobang:︱Support Ticket**\n- Need help, have a question or found a bug? Open this ticket for any general issues.\n\n**:rotating_light:︱Player Reports**\n- Report issues involving rule breaks and general misconduct.\n\n**:writing_hand:︱Applications**\n- Wanting to open a business or start a gang? Open an Application ticket and we'll get you sorted.\n\n**:busts_in_silhouette:︱Second Character Application**\n- Looking to expand on your roleplay and try out a different character?\n\n**:heartpulse:︱Staff Applications**\n- Keen to help out with moderation, designs or whitelisting? Apply for staff\n\n**:yin_yang:︱Owner Ticket**\n- Open this ticket to privately speak to the owners about anything.`)
                        .setThumbnail( botAvatar.displayAvatarURL() )
                        .addFields({ name: ' ', value: ' ' });
                    await interaction.channel.send({
                        embeds: [supportEmbed],
                        components: [
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "type": 2,
                                        "label": "❗❓ Support Ticket",
                                        "style": 1,
                                        "custom_id": "support"
                                    },
                                    {
                                        "type": 2,
                                        "label": "🚨 Player Reports",
                                        "style": 1,
                                        "custom_id": "playerreport"
                                    },
                                    {
                                        "type": 2,
                                        "label": "✍🏽 Applications",
                                        "style": 1,
                                        "custom_id": "applications"
                                    }
                                ]
                            },
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "type": 2,
                                        "label": "👥 Second Character Application",
                                        "style": 1,
                                        "custom_id": "secondcharacter"
                                    },
                                    {
                                        "type": 2,
                                        "label": "💗 Staff Applications",
                                        "style": 1,
                                        "custom_id": "staffapplication"
                                    },
                                    {
                                        "type": 2,
                                        "label": "☯️ Owner Ticket",
                                        "style": 1,
                                        "custom_id": "ownerTicket"
                                    },
                                ]
                            }
                        ]
                    });
                } else {
                    await interaction.editReply({
                        content: "You can only use this command in the main support channel", ephemeral: true,
                    });
                }
            } else {
                await interaction.editReply({
                    content: "Only staff can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
	            content: `An error has occurred, please try again later and if the problem persists contact admin. Code: Owner Support.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
