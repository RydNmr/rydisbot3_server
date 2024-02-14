const fetch = require('node-fetch')

const { google } = require("googleapis");
const { youtube_api_key} = require("../config")
// const youtube = google.youtube({
//     version: 'v3',
//     auth: youtube_api_key
// })

async function search(query) {
  const yturl = `https://www.googleapis.com/youtube/v3/search?key=${youtube_api_key}&type=video&part=snippet&q=${query}`;

  const response = await fetch(yturl);
  const data = await response.json();
  console.log(data);
  const id = data.items[0].id.videoId;
  var url = `https://wwww.youtube.com/watch?v=${id}`;
  console.log(url);
}


// function search(query) {
//     return new Promise((resolve, reject) => {
//         youtube.search.list({
//             part: 'id',
//             q: query,
//             type: 'video'
//         }, (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 const id = data.items[0].id.videoId;
//                 var url = `https://wwww.youtube.com/watch?v=${id}`
//                 resolve(url);
//             }
//         });
//     });
// }


module.exports = search;
