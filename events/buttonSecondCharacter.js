const { Events, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId == "secondcharacter") {
                try {
                    await interaction.reply({
                        content: "Creating ticket for a 2nd character application", ephemeral: true,
                    });
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const deleteTicket = new ButtonBuilder()                                       
                        .setCustomId('closeChannel')
                        .setLabel("🗑️ Close Ticket")
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(false);
                    const ticketEmbed = new EmbedBuilder()
                        .setTitle('Application for second character')
                        .setDescription(`Hello ${interaction.user.globalName}, please fill in the format below.\n\n1. Character's name (list your first and second)\n2. What is your Steam profile link?\n\n**SECOND CHARACTER:**\n3. What is your character's backstory? (min. 200 words)\n4. What are their values and goals? (list 5 each and describe)\n5. What are their 3 strengths and 3 weaknesses? (list and describe)\n\n**FIRST & SECOND ASSESSMENT**\n6. What are 5 important differences between your first and second character?\n7. You are pulled over by an officer conducting a traffic stop. He states that you are under arrest for a crime you did not commit. How do you react? (provide an answer for both your first and second character)`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'Our tickets have a 24hr SLA.',iconURL: botAvatar.displayAvatarURL() });
                    const channel = await interaction.guild.channels.create({
                    name: '2nd ' + interaction.user.globalName,
                    parent: idList.secondcharactercategory,
                    permissionOverwrites: [  
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.AttachFiles,
                                    PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ChangeNickname, PermissionsBitField.Flags.CreateInstantInvite,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory,
                                    PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages,
                                    PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers,
                                    PermissionsBitField.Flags.ViewAuditLog, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ViewCreatorMonetizationAnalytics,
                                    PermissionsBitField.Flags.ViewGuildInsights],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks,
                                    PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages,
                                    PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis,
                                    PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],  
                        },
                        {
                            id: idList.adminteamrole,           
                            allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ChangeNickname,
                                    PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                    PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                    PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                    PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages,
                                    PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands,
                                    PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],   
                        }
                    ],
                    type: ChannelType.GuildText,
                    }).catch().then(
                        channel => channel.send(
                            {
                                content: `<@${interaction.user.id}>`,
                                embeds: [ticketEmbed],
                                components: [new ActionRowBuilder().addComponents(deleteTicket)]
                            }
                        )   
                    );


                } catch (err) {
                    console.error(err);
                }
            }
		}
    },
};