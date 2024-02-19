const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel,  StreamType } = require('@discordjs/voice');

let connection;

function vcjoin() {
  const channel = message.member.voice.channel;
  if (!channel) return message.reply('Cannot find voice channel');
  connection = joinVoiceChannel({
    adapterCreator: channel.guild.voiceAdapterCreator,
    channelId: channel.id,
    guildId: channel.guild.id,
    selfDeaf: true,
    selfMute: false,
  });
   const player = createAudioPlayer();
   connection.subscribe(player);
}

function vcleave() {
  connection.destroy();
}

module.exports = {
  vcjoin,
  vcleave
}