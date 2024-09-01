const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('whitelistuser')
        .setDescription('Use this command to whitelist a user')
        .addUserOption((option) => 
        option
        .setName('username')
        .setDescription('Discord username.')
        .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('character-name')
            .setDescription('Update player nickname.')
            .setRequired(true)
        )
        /*.addStringOption((option) => 
            option
            .setName('channel')
            .setDescription('Start with `#` to get channel suggestions on where the user is being whitelisted.')
            .setRequired(true)
        )*/
        .addChannelOption((option) => 
            option
            .setName('channel')
            .setDescription('Channel where the user is being whitelisted.')
            .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('new-to-rp')
            .setDescription('Is this person new to RP.')
            .setRequired(true)
            .setChoices(
                {
                    name: 'Yes',
                    value: 'yes',
                },
                {
                    name: 'No',
                    value: 'no',
                }
            )
        )
        .addStringOption((option) => 
            option
            .setName('age')
            .setDescription('Is this person under 18.')
            .setRequired(true)
            .setChoices(
                {
                    name: '18 or over',
                    value: '18',
                },
                {
                    name: 'Under 18',
                    value: '17',
                },
                {
                    name: 'Under 17',
                    value: '16',
                }
            )
        ),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
            	content: "Whitelisting player", ephemeral: true,
            });
            if (await interaction.member.roles.cache.some(role => role.id === idList.whitelistingstaffrole)) {
                const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                //const user = await client.users.fetch(userid);//not used
                const newish = interaction.options.get('new-to-rp').value;
                const underage = interaction.options.get('age').value;
                const chan = interaction.options.get('channel').value;
                const whiteticketid = chan.replace('<', '').replace('#', '').replace('>', '');
                const whitelistticket = interaction.client.channels.cache.find(ch => ch.id === whiteticketid); 
                const member = interaction.options.getMember('username');
                await member.roles.add(idList.citizenrole);
                await member.roles.add(idList.whitelistedrole);
                await member.roles.remove(idList.unwhitelistedrole);
                await member.roles.add(idList.jobsrole);
                await member.roles.add(idList.notificationrole);
                await member.roles.add(idList.regionrole);
                await member.setNickname(interaction.options.get('character-name').value);
                if (newish === 'yes') {
                    await member.roles.add(idList.newtorprole);
                }
                if (underage === '17') {
                    await member.roles.add(idList.undereighteen);
                }else  if (underage === '16') {
                    await member.roles.add(idList.underseventeen);
                }
                const initialEmbed = new EmbedBuilder()
                    .setTitle(interaction.options.get('character-name').value + ' has been successfully whitelisted! ')
                    .setDescription(`Here are our general channels and where you can find everything:\n\n- [Click here to connect to the server!](https://cfx.re/join/kyjj3v) - this is where you'll find all the connect info for the server.\n- Feel free to visit [Subsequent.gitbook](https://subsequent.gitbook.io/) for more information\n- Have any issues? Head to <#` + idList.techsupportchannel + `> and pop your question or issues there.\n- Need more help and not having any luck in bug reports or tech support? Go to <#` + idList.supportmessagechannel + `> and open a  ticket\n\nAll the best and welcome! 💜`)
                    .addFields({ name: ' ', value: ' ' })
                    .setFooter({text: 'Welcome to Subsequent RP',iconURL: botAvatar.displayAvatarURL() });
                    await whitelistticket.send({                           
                        embeds: [initialEmbed] 
                    });
                await whitelistticket.setParent(idList.whitelistcompletedcategory);
            }else {
                await interaction.editReply({
                    content: "Only whitelisting staff can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
	            content: `An error has occurred, please try again later and if the problem persists contact admin. Code: Whitelist User.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
