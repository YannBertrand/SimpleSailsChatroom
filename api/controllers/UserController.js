/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  disconnect: function (req, res) {
    User.findOne(req.body.userId).exec(function (err, user) {
      if (err || !user)
        return res.notFound();

      user.isOnline = false;

      user.save(function (err) {
        if (err)
          return res.serverError();

        User.publishUpdate(user.id, { isOnline: false });

        return res.ok();
      });
    });
  },

};

