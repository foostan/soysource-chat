var ws = require("websocket.io");
var server = ws.listen(8888, function () {
    console.log("ws start");
});

server.on("connection", function(socket) {
socket.on("message", function(data) {
    console.log("message " + data);
    data = data.replace(/</g, "&lt;");
    data = data.replace(/>/g, "&gt;");
    data = data.replace(/\n/g, "<br>");
    server.clients.forEach(function(client) {
        if (client.send) {
                client.send(data);
            } else {
                console.log("message oops!" + data);
            }
        });
    });
});
