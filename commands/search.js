import { google } from "googleapis";
const { youtube_api_key} = require("../config")
const youtube = google.youtube({
    version: 'v3',
    auth: youtube_api_key
})


function search(query) {
    return new Promise((resolve, reject) => {
        youtube.search.list({
            part: 'id',
            q: query,
            type: 'video'
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const id = data.items[0].id.videoId;
                var url = `https://wwww.youtube.com/watch?v=${id}`
                resolve(url);
            }
        });
    });
}


module.exports = search;
