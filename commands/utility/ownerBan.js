// A messege is sent with a button, the button can be used by users to open a ban appeal ticket
// This command can only be used by administrators and only in a certain channel (ensures organisation)

const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const idList = require('../../data/idList');
const ids = require('../../data/ids');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ownerbanappealmessage')
        .setDescription('Create initial message for ban appeal tickets'),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
            	content: "Creating ban appeal message", ephemeral: true,
            });
            if ( await interaction.member.roles.cache.some(role => role.id === idList.staffRole) ) {
                if ( interaction.channelId === idList.banappealmessagechannel ) {
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const banButton = new ButtonBuilder()                 
                        .setCustomId('banappealbutton')
                        .setLabel("Ban Appeal")
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false);
                    const banEmbed = new EmbedBuilder()
                        .setTitle('Ban Appeal Ticket')
                        .setDescription(`If you would like to appeal your ban then click on the button below. A ticket will be created for you.`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'Subsequent RP',iconURL: botAvatar.displayAvatarURL() });
                    await interaction.channel.send({                           
                        embeds: [banEmbed],
                        components: [new ActionRowBuilder().addComponents(banButton)]                            
                    });
                } else {
                    await interaction.editReply({
                        content: "This command can only be used in the ban appeal channel", ephemeral: true,
                    });
                }
            } else {
                await interaction.editReply({
                    content: "Only staff can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
	            content: `An error has occurred, please try again later and if the problem persists contact admin. Code: Owner Ban.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
