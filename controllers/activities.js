const Activity = require('../models/activity');

module.exports = {
    index,
    add,
    create
  };


  async function index(req, res) {
    try {
      const activities = await Activity.find({});
      res.render('activities/index', { title: 'My Activities', activities });
    } catch (err) {
      console.log(err);
    }
  }

  function add(req, res) {
     res.render('activities/add', { title: 'Add Activity', errorMsg: "" });
  }


  async function create(req, res) {
    try {
      console.log(req.user);
      req.body.user = req.user.id;
      await Activity.create(req.body);
      res.redirect("/activities");
    } catch (err) {
      // Typically some sort of validation error
      console.log(err);
      res.render("activities/add", { title: 'Add Activity', errorMsg: err.message });
    }
  }