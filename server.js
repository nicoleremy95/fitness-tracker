const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnesstracker", { useNewUrlParser: true });

db.Workout.create({ name: "Fitness Tracker" })
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({message}) => {
    console.log(message);
  });

app.get("/", (req,res)=>{
    return res.render("create_exercise")
})


app.post("/submit", ({body}, res) => {
    db.Exercise.create(body)
      .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/exercises", (req, res) => {
    db.Exercise.find({})
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/workout", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/populated", (req, res) => {
    db.Workout.find({})
      .populate("exercises")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });