require('dotenv/config');
const search = require("./commands/search.js");

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: ["https://rydisbot3-client.vercel.app"]
    }
  });
const PORT = process.env.PORT || 3000;

// connect to client side
io.on("connection", (socket) => {
    console.log("Successfully connected to client !");

    socket.on("send_music",(data) => {
        if(data.music.startsWith("http")) {
          console.log("url is here")
          var url = data.music;
        } else {
          console.log("this is query!!")
          search(data.music);
        }
        console.log(url);
        
    })


    // When disconnected
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});


/*-------------------------------------------------------------------------------------------------------------------
THIS SUPPOSED TO BE INSERTED IN LINE 21

// Receive message from client
    socket.on("send_music", (data) => {
        console.log(data);
        client.channels.cache.get('1089831883132649502').send(data.message)



        io.emit('received_message', data);
    })
-------------------------------------------------------------------------------------------------------------------*/




/*-------------------------------------------------------------------------------------------------------------------------
BOT process START
-------------------------------------------------------------------------------------------------------------------------*/
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { bot_token } = require('./config');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, readyClient => {
	console.log(`Discord bot is ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(bot_token);

module.exports = client;

/*-------------------------------------------------------------------------------------------------------------------------
BOT process END
-------------------------------------------------------------------------------------------------------------------------*/
// launch http server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
