// When a user opens a ticket only that user and administrators will have access to the ticket/channel.
// This command can remove access if certain users are not required within that ticket.
// It first verifies it is a ticket based on the channel's parent category and then sends a messege stating which user has been removed.

const { SlashCommandBuilder } = require('discord.js');
const idList = require('../../data/idList');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('removeuser')
        .setDescription('Remove a user from this ticket.')
        .addUserOption((option) => 
            option
            .setName('user')
            .setDescription('Select a username.')
            .setRequired(true)
        ),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
            	content: "Removing user from ticket", ephemeral: true,
            });
            if ((interaction.channel.parentId === idList.whitelistcategory) ||
                (interaction.channel.parentId === idList.awaitinginterviewcategory ) ||
                (interaction.channel.parentId === idList.whitelistinprogresscategory ) ||
                (interaction.channel.parentId === idList.whitelistonholdcategory ) ||
                (interaction.channel.parentId === idList.unresponsivecategory ) ||
                (interaction.channel.parentId === idList.whitelistcompletedcategory ) ||
                (interaction.channel.parentId === idList.supportcategory) ||
                (interaction.channel.parentId === idList.reportcategory) ||
                (interaction.channel.parentId === idList.applicationcategory) ||
                (interaction.channel.parentId === idList.secondcharactercategory) ||
                (interaction.channel.parentId === idList.staffapplicationcategory) ||
                (interaction.channel.parentId === idList.ownerticketcategory) ||
                (interaction.channel.parentId === idList.banappealcategory)
            ){
                if ( (interaction.member.roles.cache.some(role => role.id === idList.whitelistingstaffrole)) || (interaction.member.roles.cache.some(role => role.id === idList.supportstaffrole)) || (interaction.member.roles.cache.some(role => role.id === idList.adminteamrole))) {
                    const playerid = interaction.options.get('user').value;
                    interaction.channel.permissionOverwrites.edit(playerid, {   AddReactions: false, AttachFiles: false, EmbedLinks: false, ReadMessageHistory: false, SendMessages: false, SendTTSMessages: false, SendVoiceMessages: false,
                                                                                UseApplicationCommands: false, UseExternalEmojis: false, UseExternalStickers: false, ViewChannel: false});
                    await interaction.channel.send({content:  "User <@" + playerid + "> has been removed from the ticket."});
                }else {
                    await interaction.editReply({
                        content: "Only staff members can remove users from a ticket", ephemeral: true,
                    });
                }
            }else {
                await interaction.editReply({
                    content: "You are unable to remove a user from here as this isn't a ticket", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
	            content: `An error has occurred, please try again later and if the problem persists contact admin. Code: Remove User.`, ephemeral: true,
            });
            console.error(err);
        }
    }
}
