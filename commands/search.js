const fetch = require('node-fetch')

const { google } = require("googleapis");
const { youtube_api_key} = require("../config")





async function search(query) {
  const yturl = `https://www.googleapis.com/youtube/v3/search?key=${youtube_api_key}&type=video&part=snippet&q=${query}`;

  const response = await fetch(yturl);
  const data = await response.json();
  console.log(data);
  const id = data.items[0].id.videoId;
  return `https://www.youtube.com/watch?v=${id}`;
}

module.exports = search;