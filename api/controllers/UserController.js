/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // When the user has sent its name
  logInOrCreate: function (req, res) {
    if (!req.body.name)
      return res.badRequest();

    var userName = req.body.name;

    // Look for the user
    User.findOne({ name: userName }).exec(function (err, user) {
      if (err)
        return res.serverError();

      // If it already exists, log him in
      if (user) {
        user.isOnline = true;

        user.save(function (err) {
          if (err)
            return res.serverError();

          User.publishUpdate(user.id, user);

          return res.ok(user);
        });

        return;
      }

      // Else create the user
      User.create({ name: userName }).exec(function (err, newUser) {
        if (err)
          return res.serverError();

        User.publishCreate(newUser);

        return res.ok(newUser);
      });
    });
  },
	
  // When the user leave the page
  disconnect: function (req, res) {
    User.findOne(req.body.userId).exec(function (err, user) {
      if (err || !user)
        return res.notFound();

      user.isOnline = false;

      user.save(function (err) {
        if (err)
          return res.serverError();

        User.publishUpdate(user.id, user);

        return res.ok();
      });
    });
  },

};

