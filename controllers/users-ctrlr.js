const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
  res.render("auth/register");
};

module.exports.postRegisterForm = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Yelp camp");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("auth/login");
};

module.exports.postLoginForm = (req, res) => {
  req.flash("success", "welcome back");
  console.log(req.session);
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Successfully log out!");
  res.redirect("/campgrounds");
};
