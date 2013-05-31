var ws = require("websocket.io");
var server = ws.listen(8888, function () {
    console.log("ws start");
});

server.on("connection", function(socket) {
socket.on("message", function(message) {
    console.log("message " + message);
    message = message.replace(/</g, "&lt;");
    message = message.replace(/>/g, "&gt;");
    message = message.replace(/\n/g, "<br>");

    var timestamp = new Date();
    var disp_date = timestamp.getFullYear() + "/" + timestamp.getMonth() + "/" + timestamp.getDay() + " "
        + timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();

    // add timestamp
    var data = {
        message: message,
        timestamp: disp_date
    }
    var data_json = JSON.stringify(data);

    console.log(data_json);
    server.clients.forEach(function(client) {
        if (client.send) {
                client.send(data_json);
            } else {
                console.log("message oops!" + data_json);
            }
        });
    });
});
