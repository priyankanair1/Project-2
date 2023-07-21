const Category = require("../models/category");

module.exports = {
  index,
  create,
};

async function index(req, res) {
  try {
    const categories = await Category.find({});

    res.render("categories/index", {
      title: "Activity categories",
      categories,
      errorMsg: "",
    });
  } catch (err) {
    console.log(err);
  }
}

async function create(req, res) {
  try {
    await Category.create(req.body);
    res.redirect("/categories");
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render("categories", {
      title: "Add Activity",
      errorMsg: err.message,
    });
  }
}
