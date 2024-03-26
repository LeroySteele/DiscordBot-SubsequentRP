const { Events, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        try {
            if ( (message.channel.id === idList.ownerannouncechannel) ) {
                const mess = message.content;
                //const chan = message.channel;
                if (mess.includes(`<@&` + idList.whitelistedrole + `>`)){
                    const whitechan = message.client.channels.cache.find(ch => ch.id === whitelistedannouncechannel);   
                    await whitechan.send({content: mess});
                    await message.delete();
                }else if (mess.includes(`<@&` + idList.unwhitelistedrole + `>`)){
                    const unwhitechan = message.client.channels.cache.find(ch => ch.id === unwhitelistedannouncechannel); 
                    await unwhitechan.send({content: mess});
                    await message.delete();
                }else if ( mess.toLowerCase().includes(`last updated`) ) {
                    const subchan = message.client.channels.cache.find(ch => ch.id === subdiscordschannel);   
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const subEmbed = new EmbedBuilder()
                    .setTitle('𝐒𝐮𝐛𝐬𝐞𝐪𝐮𝐞𝐧𝐭 𝐒𝐮𝐛-𝐃𝐢𝐬𝐜𝐨𝐫𝐝𝐬')
                    .setDescription(mess)
                    .setImage( botAvatar.displayAvatarURL() )
                    .setFooter({text: 'Subsequent RP'});
                    await subchan.send({embeds: [subEmbed]});
                    //await unwhitechan.send({content: mess});
                    await message.delete();
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
}