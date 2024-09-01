const { SlashCommandBuilder } = require('discord.js');
const idList = require('../../data/idList');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('adduser')
        .setDescription('Add a user to this ticket.')
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
                content: "Adding user to ticket", ephemeral: true,
            });
            if (    (interaction.channel.parentId === idList.whitelistcategory) ||
                        (interaction.channel.parentId === idList.waitinginterviewcategory ) ||
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
                if ( (interaction.member.roles.cache.some(role => role.id === idList.whitelistingstaffrole)) || (interaction.member.roles.cache.some(role => role.id === idList.supportstaffrole)) || (interaction.member.roles.cache.some(role => role.id === idList.adminteamrole)) ) {
                    const playerid = interaction.options.get('user').value;
                    await interaction.channel.permissionOverwrites.edit(playerid, { AddReactions: true, AttachFiles: true, EmbedLinks: true, ReadMessageHistory: true, SendMessages: true, SendTTSMessages: true, SendVoiceMessages: true,
                                                                                    UseApplicationCommands: true, UseExternalEmojis: true, UseExternalStickers: true, ViewChannel: true});
                    await interaction.channel.send({content:  "User <@" + playerid + "> has been added to the ticket."});
                }else {
                    await interaction.editReply({
                        content: "Only staff members can add users to a ticket", ephemeral: true,
                    });
                }
            }
            else {
                await interaction.editReply({
                    content: "You are unable to add a user here as this isn't a ticket", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
	            content: `An error has occurred, please try again later and if the problem persists contact admin. Code: Add User.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
