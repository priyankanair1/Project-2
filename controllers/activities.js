const Activity = require("../models/activity");
const moment = require("moment");

module.exports = {
  index,
  add,
  create,
  delete: deleteActivity,
  edit,
  update,
};

async function index(req, res) {
  try {
    let activitydate = req.query.date;
    if (!activitydate) {
      activitydate = new Date().toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
    const activityday = moment(activitydate, "YYYY-MM-DD").startOf("day");

    const activities = await Activity.find({
      activitytime: {
        $gte: activityday.toDate(),
        $lte: moment(activityday).endOf("day").toDate(),
      },
      user: req.user.id,
    });

    const priorities = activities.filter(a => a.priority);
    
    res.render("activities/index", {
      title: "My Activities",
      activities,
      activitydate,
      priorities,
      errorMsg: "",
    });
  } catch (err) {
    console.log(err);
  }
}

function add(req, res) {
  let activitydate = new Date().toTimeString();
  console.log(activitydate);
  res.render("activities/add", {
    title: "Add Activity",
    activitydate,
    errorMsg: "",
  });
}

async function create(req, res) {
  try {

    console.log("req.body");    
    console.log(req.body);
    console.log("req.body.priority");
    console.log(req.body.priority);
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
    res.render("activities/add", {
      title: "Add Activity",
      errorMsg: err.message,
    });
  }
}

async function deleteActivity(req, res) {
  console.log("delete");
  try {
    const activity = await Activity.findOne({ _id: req.params.id });
    await Activity.deleteOne(activity);
    res.redirect("/activities");
  } catch (error) {
    console.log(error.message);
    res.render("activities", {
      title: "Delete Activity",
      errorMsg: err.message,
    });
  }
}

async function edit(req, res) {
  console.log("edit");
  let activitydate = new Date().toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const activity = await Activity.findOne({ _id: req.params.id });
  res.render("activities/edit", {
    title: "Edit Activity",
    errorMsg: "",
    activity,
    activitydate,
  });
}

async function update(req, res) {
  try {
    const updateUser = await Activity.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.redirect("/activities");
  } catch (error) {
    console.log(error.message);
    res.render("activities/edit", {
      title: "Edit Activity",
      errorMsg: err.message,
    });
  }
}
