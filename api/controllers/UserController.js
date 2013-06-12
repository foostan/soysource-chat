/*---------------------
  :: User 
  -> controller
  ---------------------*/
var UserController = {

    create: function (req,res) {
        var name = req.param('name');
        var passwd = req.param('passwd');

        // todo: validate name, passwd
        if (!(name && passwd)) {
            res.json({
                result: false,
                message: 'validation failed'
            });
        }

        // validation success
        else {

            // find user
            User.find({
                name: name
            }).done(function(err, user) {

                // find error
                if (err) {
                    res.json({
                        result: false,
                        message: 'find failed'
                    });
                    console.log("Find failed:", err);
                }

                // find success
                else {

                    // already exsits
                    if (user) {
                        res.json({
                            result: false,
                            message: 'already exists'
                        });
                        console.log("Already exists:", user);
                    }

                    // create newcomer
                    else {
                        User.create({
                            name: name,
                            passwd: passwd
                        }).done(function(err, user) {
                            // insert error
                            if (err) {
                                res.json({
                                    result: false,
                                    message: 'insert failed'
                                });
                                console.log("Insert failed:", user);
                            }
                            // insert success
                            else {
                                res.json({result: true});
                                console.log("User created:", user);
                            }
                        });

                    }
                }
            });
        }
    },

    update: function (req,res) {
        var id     = req.param('id');
        var passwd = req.param('passwd');

        // todo: validate name, passwd
        if (!(id && passwd)) {
            res.json({
                result: false,
                message: 'validation failed'
            });
        }

        // validation success
        else {

            // find user
            User.find(id).done(function(err, user) {

                // find error
                if (err) {
                    res.json({
                        result: false,
                        message: 'find failed'
                    });
                    console.log("Find failed:", err);
                }

                // find success
                else {
                    console.log(user);

                    // found user
                    if (user) {
                        User.update({
                            id: id
                        },{
                            passwd: passwd
                        }, function(err, user) {
                            if (err) {
                                res.json({
                                    result: false,
                                    message: 'update failed'
                                });
                                console.log("Update failed:", user);
                            } else {
                                res.json({result: true});
                                console.log("Message updated:", user);
                            }
                        });
                    }

                    // user not found
                    else {
                        res.json({
                            result: false,
                            message: 'user not found'
                        });
                        console.log("User not found:", id);
                    }
                }
            });
        }
    },

    destroy: function (req,res) {
        var id = req.param('id');

        // todo: validate id
        if (id) {
            User.destroy({
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
                message: 'validation failed'
            });
        }

    },
};
module.exports = UserController;
