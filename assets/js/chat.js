$(function(){

    var host = window.document.location.host.replace(/:.*/, '');
    var socket = io.connect('http://' + host + ':8888');

    var messenger = {

        send: function(body) {
            socket.request('/message/create',{
                body: body
            }, function (res) {
                console.log(res);
            });
        },

        setup: function() {
            socket.request('/message/findAll',{}, function (messages) {
                messages.forEach(function(message){
                    $("#messages").append("<li>" + message.user_name + ": " + message.body + "<div class=\"pull-right\">" + message.createdAt + "</div></li>");
                });
            });
        }
    }

    socket.on('push', function(message){
        $("#messages").prepend("<li>" + message.user_name + ": " + message.body + "<div class=\"pull-right\">" + message.createdAt + "</div></li>");
    });

    messenger.setup();


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
        body = $("#message").val();
        $("#message").val('');
        messenger.send(body);
    }

})
