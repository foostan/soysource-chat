/*---------------------
    :: Message 
    -> controller
---------------------*/
var MessageController = {

    create: function (req,res) {
        var body = req.param('body');

        // todo: validate body
        if (body) {
            Message.create({
                body: body
            }).done(function(err, message) {
                if (err) {
                    console.log("Insert failed:", message);
                    res.json({
                        result: false,
                        message: 'insert failed'
                    });
                } else {
                    console.log("Message created:", message);
                    res.json({result: true});
                    req.socket.json.emit('push', message);
                    req.socket.broadcast.json.emit('push', message);
                }
            });
        } else {
            res.json({
                result: false,
                message: 'validation failed'
            });
        }
    },

    update: function (req,res) {
        var id = req.param('id');
        var body = req.param('body');

        // todo: validate id and body
        if (id && body) {

            Message.update({
                  id: id
            },{
                  body: body
            }, function(err, message) {
                if (err) {
                    console.log("Update failed:", message);
                    res.json({
                        result: false,
                        message: 'update failed'
                    });
                } else {
                    console.log("Message updated:", message);
                    res.json({result: true});
                }
            });
        } else {
            res.json({
                result: false,
                message: 'validation failed'
            });
        }
    },

    destroy: function (req,res) {
        var id = req.param('id');

        // todo: validate id
        if (id) {
            Message.destroy({
                id: id
            }, function(err, message) {
                if (err) {
                    console.log("Destroy failed:", err);
                    res.json({
                        result: false,
                        message: 'destroy failed'
                    });
                } else {
                    console.log("Message destroied:", id);
                    res.json({result: true});
                }
            });
        } else {
            res.json({
                result: false,
                message: 'no id'
            });
        }

    },

    findAll: function (req,res) {

        Message.findAll({}).limit(10).sort('createdAt DESC').done(function(err, messages) {
            if (err) {
                console.log("FindAll failed:", err);
                res.json({
                    result: false,
                    message: 'findAll failed'
                });
            } else {
                console.log("findAll:", messages);
                res.json(messages);
            }
        });

    }
};
module.exports = MessageController;
