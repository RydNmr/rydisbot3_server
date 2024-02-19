const ytdl = require('ytdl-core');
const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel,  StreamType } = require('@discordjs/voice');

const search = require('./search.js');

function play(args) {
  // ytdl-coreで使用できるurlに変換
  let url;
  if(ytdl.validateURL(args[0])) {
    console.log('URL is entered and valid.');

    url = args[0];
  }else {
    console.log('2')
    const query = args.map(arg => arg).join(' ');

    search(query)
      .then( url => {
        console.log(url);
      })
      .catch( error => {
        console.error('your code is not working lol');
      })

  }

  // stream audio in voice channel.
  


  
}

module.exports = play;