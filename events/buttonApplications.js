// When the user clicks the button a ticket (channel) will be created. First all permissions are set to false then the user and admins each get the permissions they need to interact with the channel. 
// The ticket's name includes the user's names to show ownership and they also get tagged so it's easy to locate. A template messege is then sent to show what the ticket is about.
// Additional button are sent for two additional templates (gang, business) and also a close button

const { Events, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId == "applications") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Creating an application ticket", ephemeral: true,
                    });
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const ticketEmbed = new EmbedBuilder()
                        .setTitle('City Application')
                        .setDescription(`If you are interested in applying for a gang or a business in city, please click the related button below.\n\nThe format for your application will then be sent for you to view - please copy this and submit your application in this format`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'Our tickets have a 24hr SLA.',iconURL: botAvatar.displayAvatarURL() });
                    const channel = await interaction.guild.channels.create({
                        name: 'app ' + interaction.user.globalName,
                        parent: idList.applicationcategory,
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
                                components: [
                                {
                                    "type": 1,
                                    "components": [
                                        {
                                            "type": 2,
                                            "label": "🏪 Business Application",
                                            "style": 3,
                                            "custom_id": "businessChannel"
                                        },
                                        {
                                            "type": 2,
                                            "label": "🤼🏽 Gang Application",
                                            "style": 1,
                                            "custom_id": "gangChannel"
                                        }
                                    ]
                                },
                                {
                                    "type": 1,
                                    "components": [
                                        {
                                            "type": 2,
                                            "label": "🗑️ Close Ticket",
                                            "style": 4,
                                            "custom_id": "closeChannel"
                                        }
                                    ]
                                }
                                ]
                            }
                        )   
                    );
                } catch (err) {
                    await interaction.editReply({
                        content: `An error has occurred, please try again later and if the problem persists contact a staff member. Code: Button application.`, ephemeral: true,
                    });
                    console.error(err);
                }
            } else if (interaction.customId == "businessChannel") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Sending business application", ephemeral: true,
                    });
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const businessEmbed = new EmbedBuilder()
                        .setTitle('Business Application')
                        .setDescription(`Please complete your application in the format below:\n\n**Business Application**\n1. Business name & Location (if applicable)\n2. Experience with businesses and/or management.\n3. Business plan - include things like your goals in city, general identity of the business and your target audience.\n4. Support citizens - people that will be supporting you in this business and their roles.\n5. Any additional information that you can offer.`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'The Staff Team will respond to you shortly!',iconURL: botAvatar.displayAvatarURL() });
                    await interaction.channel.send({
                        embeds: [businessEmbed] 
                    });
                } catch (err) {
                    await interaction.editReply({
                        content: `An error has occurred, please try again later and if the problem persists contact a staff member. Code: Button business application.`, ephemeral: true,
                    });
                    console.error(err);
                }
            } else if (interaction.customId == "gangChannel") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Sending gang application", ephemeral: true,
                    });
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const gangEmbed = new EmbedBuilder()
                        .setTitle('Gang Application')
                        .setDescription(`Please complete your application in the format below:\n\n**Gang Application**\n1. Gang name & Location (if applicable)\n2. Official colour, logo/emblem and uniform (submit images please)\n3. Gang members\n4. Gang motivation - how did the gang come to be formed, what is your purpose in city and what would you like to achieve.`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'The Staff Team will respond to you shortly!',iconURL: botAvatar.displayAvatarURL() });
                    await interaction.channel.send({
                        embeds: [gangEmbed] 
                    });
                } catch (err) {
                    await interaction.editReply({
                        content: `An error has occurred, please try again later and if the problem persists contact a staff member. Code: Button gang application.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
		}
    },
};
