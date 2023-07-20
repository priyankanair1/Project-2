const Activity = require("../models/activity");
const Note = require("../models/note");
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

    const priorities = activities.filter((a) => a.priority);

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
  let activitydate = formatDate(new Date())
  res.render("activities/add", {
    title: "Add Activity",
    activitydate,
    errorMsg: "",
  });
}

async function create(req, res) {
  try {
    let activity = new Activity({
      activity: req.body.activity,
      activitytime: req.body.activitytime,
      user: req.user.id,
      priority: req.body.priority,
      notes: req.body.notes,
    });
    
    await Activity.create(activity);

    //console.log("activity created");
    /*const promises = req.body.notes.map(function (n) {
      console.log("note in mappppp");
      console.log(n);
      let note = new Note({
        note: n,
      });  
      await Note.create(note);*/

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

function formatDate(dateVal) {
  var newDate = new Date(dateVal);

  var sMonth = padValue(newDate.getMonth() + 1);
  var sDay = padValue(newDate.getDate());
  var sYear = newDate.getFullYear();
  var sHour = newDate.getHours();
  var sMinute = padValue(newDate.getMinutes());
  
  var iHourCheck = parseInt(sHour);

  if (iHourCheck > 12) {
      sHour = iHourCheck - 12;
  }
  else if (iHourCheck === 0) {
      sHour = "12";
  }

  sHour = padValue(sHour);
  
  return sYear + "-" + sMonth + "-" + sDay +"T" + sHour + ":" + sMinute;  
}

function padValue(value) {
  return (value < 10) ? "0" + value : value;
}

async function edit(req, res) {
  const activity = await Activity.findOne({ _id: req.params.id });
  let activitydate = formatDate(activity.activitytime)
  res.render("activities/edit", {
    title: "Edit Activity",
    errorMsg: "",
    activity,
    activitydate,
  });
}

async function update(req, res) {
  try {
    await Activity.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.redirect("/activities");
  } catch (error) {
    console.log(error.message);
    res.render("activities/edit", {
      title: "Edit Activity",
      errorMsg: error.message,
    });
  }
}
