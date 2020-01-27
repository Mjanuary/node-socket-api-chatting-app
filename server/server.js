const express = require("express");
const path = require("path");
const { Users } = require("./utils/users");
const api = require("./api/index");
let app = express();

app.use("/api", api); // API

const http = require("http").createServer(app);
let io = require("socket.io")(http);

let port = process.env.PORT || 3000;
const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/isRealSting");

let users = new Users(); // users instance

require("dotenv/config");

//
//
//
//
//
//
//
app.use(express.static(path.join(__dirname, "/../public/"))); // serve the public files
app.use("/chat", express.static(path.join(__dirname, "/../public/chat.html"))); // serve the public files
app.use("/", express.static(path.join(__dirname, "/../public/index.html"))); // serve the public files

http.listen(port, function() {
  console.log(`listening on *:${port}`);
});

io.on("connection", socket => {
  console.log("A new user just connected");
  // console.log('connected users ', users.getUserList());

  // registration
  socket.on("join", (params, callback) => {
    console.log("joined user: ", params);

    users.removeUser(
      params.uid,
      data => {
        // console.log('remove user: ', data);
      },
      "id"
    );

    users.addUser(params.uid, socket.id, params.groups, (id, user) => {
      socket.broadcast.to(id).emit("aConnectedUser", user);
      console.log(user, " joined => ", id);
      socket.join(id);
    });

    io.to(params.groups).emit(
      "updateUserList",
      users.activeUsers(params.groups)
    );

    // send the message  to the initial
    socket.emit("activeUsers", users.activeUsers(params.uid));

    // send the message to the rest of the user
    for (const key in users.userGroups(params.uid)) {
      let group = users.userGroups(params.uid)[key];
      socket.broadcast.to(group).emit("newMessage", "new user joined");
    }

    socket.on("createMessage", (message, callback) => {
      socket.broadcast.to(message.group).emit("newMessage", message);

      callback("message received.");
    });

    callback("");
  });

  // user is disconnected
  socket.on("disconnect", () => {
    users.removeUser(socket.id, data => {
      let user = {
        ...users.getUser(socket.id, "key"),
        ...data
      };
      socket.broadcast.to(data.groupId).emit("adDisconnectedUser", user);
    });
  });

  socket.on("updateUsersList", function(users) {
    console.log(users);
  });

  socket.on("typing", function(typing) {
    // console.log(typing);
    socket.broadcast.to(typing.groupId).emit("trpingBack", typing);
  });

  //
  socket.on("createLocationMessage", (data, callback) => {
    console.log("The location: ", data);
    callback(data);
    socket.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", data.lat, data.lng)
    );
  });
});

// alice@gmail.com
// emoji icons
// https://emojipedia.org/white-up-pointing-index/
//🐑
// npm run devStart
