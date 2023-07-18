const Activity = require('../models/activity');

module.exports = {
    index
  };


  async function index(req, res) {
    console.log("sdfdfd");
    try {
      const activities = await Activity.find({});
      res.render('activities/index', { title: 'My Activities', activities });
    } catch (err) {
      console.log(err);
    }
  }