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
            return res.json({
                result: false,
                message: 'validation failed'
            });
        }

        // validation success
        else {
            var passwd_hash = require('crypto').createHash('sha256').update(passwd).digest('hex');

            // find user
            User.find({
                name: name
            }).done(function(err, user) {

                // find error
                if (err) {
                    console.log("Find failed:", err);
                    return res.json({
                        result: false,
                        message: 'find failed'
                    });
                }

                // find success
                else {

                    // already exsits
                    if (user) {
                        console.log("Already exists:", user);
                        return res.json({
                            result: false,
                            message: 'already exists'
                        });
                    }

                    // create newcomer
                    else {
                        User.create({
                            name: name,
                            passwd: passwd_hash
                        }).done(function(err, user) {
                            // insert error
                            if (err) {
                                console.log("Insert failed:", user);
                                return res.json({
                                    result: false,
                                    message: 'insert failed'
                                });
                            }
                            // insert success
                            else {
                                console.log("User created:", user);
                                return res.json({result: true});
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
            return res.json({
                result: false,
                message: 'validation failed'
            });
        }

        // validation success
        else {
            var passwd_hash = require('crypto').createHash('sha256').update(passwd).digest('hex');

            // find user
            User.find(id).done(function(err, user) {

                // find error
                if (err) {
                    console.log("Find failed:", err);
                    return res.json({
                        result: false,
                        message: 'find failed'
                    });
                }

                // find success
                else {
                    console.log(user);

                    // found user
                    if (user) {
                        User.update({
                            id: id
                        },{
                            passwd: passwd_hash
                        }, function(err, user) {
                            if (err) {
                                console.log("Update failed:", user);
                                return res.json({
                                    result: false,
                                    message: 'update failed'
                                });
                            } else {
                                console.log("Message updated:", user);
                                return res.json({result: true});
                            }
                        });
                    }

                    // user not found
                    else {
                        console.log("User not found:", id);
                        return res.json({
                            result: false,
                            message: 'user not found'
                        });
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
                    return res.json({
                        result: false,
                        message: 'destroy failed'
                    });
                } else {
                    console.log("Message destroied:", id);
                    return res.json({result: true});
                }
            });
        } else {
            return res.json({
                result: false,
                message: 'validation failed'
            });
        }

    },

    login: function (req,res) {
        var name   = req.param('name');
        var passwd = req.param('passwd');

        if (!(name && passwd)) {
            res.view();
        }
        // todo: validate name, passwd

        // validation success
        else {
            var passwd_hash = require('crypto').createHash('sha256').update(passwd).digest('hex');

            // find user
            User.find({
                name: name,
                passwd: passwd_hash
            }).done(function(err, user) {

                // find error
                if (err) {
                    console.log("Find failed:", err);
                    return res.view({error: 'Find failed'});
                }

                // find success
                else {

                    // found user
                    if (user) {
                        req.session.authenticated = true;
                        req.session.user = user;
                        console.log("Authentication success:", user);
                        return res.redirect('/');
                    }

                    // user not found
                    else {
                        console.log("authentication failed:", name);
                        return res.view({error: 'Authentication failed'});
                    }
                }
            });
        }
    },

    logout: function (req,res) {
        req.session.authenticated = false;
        req.session.user = null;
        return res.redirect('/user/login');
    },
};
module.exports = UserController;
