$(function(){
    var host = window.document.location.host.replace(/:.*/, '');
    var ws = "ws://" + host + ":8888";
    var socket = new WebSocket(ws);
    console.log(socket.readyState);

    socket.onopen = function(){
        console.log(socket.readyState);
    }
    socket.onmessage = function(data_json){
        data = JSON.parse(data_json.data);
        console.log(socket.readyState + " " + data.message + " " + data.timestamp);
        $("#messages").prepend("<li>" + data.message + "<div class=\"pull-right\">" + data.timestamp + "</div></li>");
    }
    socket.onclose = function(){
        console.log(socket.readyState);
    }
    $(window).unload(function() {
        socket.onclose();
        console.log(socket.readyState);
    })

    $("#message").live("keypress",function (e) {
        if(e.keyCode == 13 && e.shiftKey) {
            $(this).attr('rows', Number($(this).attr('rows')) + 1);
        } else {
            if(e.keyCode == 13) {
                box = $(this);
                t_val = $(box).val();
                if(t_val.length > 0) {
                    $(this).attr('rows', 1);
                    send_message();
                }
                e.preventDefault();
            }
        }
    });

    function send_message() {
        message = $("#message").val();
        $("#message").val('');
        socket.send(message);
    }

})