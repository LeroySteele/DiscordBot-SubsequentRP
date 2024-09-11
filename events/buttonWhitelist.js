const { Events, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId == "whitebutton") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Creating whitelist ticket", ephemeral: true,
                    });
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const deleteTicket = new ButtonBuilder()                                       
                        .setCustomId('closeChannel')
                        .setLabel("🗑️ Close Ticket")
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(false);
                    const ticketEmbed = new EmbedBuilder()
                        .setTitle('Whitelisting Application')
                        .setDescription(`Welcome to Subsequent Roleplay 💜\nPlease answer all questions and then our staff will be in contact. \n\n1. What is your age?\n2. What is your Steam profile link?\n3. What is your Character name? (no historical, political or problematic names please)\n4. When are you available for your interview?`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'Read through our rules before your interview!',iconURL:  botAvatar.displayAvatarURL() });
                    const channel = await interaction.guild.channels.create({
                        name: 'wl ' +  interaction.user.globalName,
                        parent: idList.whitelistcategory,
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
                                id: idList.whitelistingstaffrole,           
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
                    await interaction.editReply({
                        content: `An error has occurred, please try again later and if the problem persists contact a staff member. Code: Button whitelisting ticket.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
		}
    },
};
