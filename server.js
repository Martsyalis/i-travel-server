const http = require("http");
const app = require("./lib/app");
const connect = require("./lib/connect");

const server = http.createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3001;
connect();

io.on("connection", function(socket) {
  console.log("a user connected", socket.id);
  socket.on("disconnect", function() {
    console.log("user disconnected", socket.id);
  });
  socket.on("chat", function(msg) {
    socket.broadcast.emit("chat", msg);
    console.log("message: " + msg);
  });
});

server.listen(port, () => {
  // eslint-disable-next-line
  console.log("server running on", server.address().port);
});
