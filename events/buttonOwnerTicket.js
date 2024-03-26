const { Events, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId == "ownerTicket") {
                try {
                    await interaction.reply({
                        content: "Creating owner ticket", ephemeral: true,
                    });
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const deleteTicket = new ButtonBuilder()                                       
                        .setCustomId('closeChannel')
                        .setLabel("🗑️ Close Ticket")
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(false);
                    const ticketEmbed = new EmbedBuilder()
                        .setTitle('Owner Ticket')
                        .setDescription(`Hello ${interaction.user.globalName}, please kindly tell us the reason for this ticket.\n\nThe Owners will respond to you shortly!`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'Our tickets have a 24hr SLA.',iconURL: botAvatar.displayAvatarURL() });
                    const channel = await interaction.guild.channels.create({
                        name: 'owner ' + interaction.user.globalName,
                        parent: idList.ownerticketcategory,
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
                                id: idList.ownerrole,           
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