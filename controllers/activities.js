const Activity = require('../models/activity');
const moment = require('moment');

module.exports = {
    index,
    add,
    create
  };


  async function index(req, res) {
    try {
      let activitydate = req.query.date;
      if(!activitydate) {
        activitydate = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
      }
      const activityday = moment(activitydate, 'YYYY-MM-DD').startOf('day')
      console.log(activityday);
      
      const activities = await Activity.find({
        activitytime: {
          $gte: activityday.toDate(),
          $lte: moment(activityday).endOf('day').toDate()
        },
        user: req.user.id
      })

      //const activities = await Activity.find({});
      res.render('activities/index', { title: 'My Activities', activities, activitydate });
    } catch (err) {
      console.log(err);
    }
  }

  function add(req, res) {
     res.render('activities/add', { title: 'Add Activity', errorMsg: "" });
  }

  async function create(req, res) {
    try {
      //req.body.user = req.user.id;
      let activity = new Activity({
        activity: req.body.activity,
        activitytime: req.body.activitytime,
        user: req.user.id,
        priority: req.body.priority,
        notes: req.body.notes,
      });

      await Activity.create(activity);
      res.redirect("/activities");
    } catch (err) {
      // Typically some sort of validation error
      console.log(err);
      res.render("activities/add", { title: 'Add Activity', errorMsg: err.message });
    }
  }


/*

  async function create(req, res) {
    try {
      req.body.user = req.user.id;
      // let activity = new Activity({
      //   activity: req.body.activity,
      //   activitytime: req.body.activitytime,
      //   user: req.body.user.id,
      //   priority: req.body.priority
      // });

      // console.log("activityyyyyy");
      // console.log(activity);
      // console.log("bodyyyyyyy");
      // console.log(req.body);

      // let activityObj = await Activity.create(req.body);
     /* console.log(activityObj);
      console.log(activityObj);

      req.body.notes.forEach(noteEl => {
        let noteObj = new Note({
          note: noteEl
        });
        activityObj.notes.push(noteObj);
        activityObj.save();            
      });
     await Activity.create(req.body);
     res.redirect("/activities");
    } catch (err) {
      // Typically some sort of validation error
      console.log(err);
      res.render("activities/add", { title: 'Add Activity', errorMsg: err.message });
    }
  }*/