const ytdl = require('ytdl-core');
const {createAudioResource, StreamType } = require('@discordjs/voice');
const {connection, getPlayer} = require('./vc.js');

const search = require('./search.js');

async function ytplay(args) {
  // format youtube url
  let url;
  
  if(ytdl.validateURL(args[0])) {
    console.log('URL is entered and valid.');

    url = args[0];
  }else {
    const query = args.map(arg => arg).join(' ');
    
    try {
      url = await search(query);
    } catch (error) {
      console.error('your code is not working lol');
    }
    
  }

  // stream audio in voice channel
  
// get video/audio
  const ytStream = ytdl(ytdl.getURLVideoID(url), {
    filter: format => format.audioCodec === 'opus' && format.container === 'webm', //webm opus
    quality: 'highest',
    highWaterMark: 32 * 1024 * 1024, // https://github.com/fent/node-ytdl-core/issues/902
   });
   const ytResource = createAudioResource(ytStream, {
     inputType: StreamType.WebmOpus
   });
   // 再生
  const player = getPlayer();
  console.log(player);
  player.play(ytResource);

  
  
}

module.exports = ytplay;