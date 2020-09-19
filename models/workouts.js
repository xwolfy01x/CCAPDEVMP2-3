/*
  Workout:
	  Duration    30mins, 60 mins
	  Body Focus
	  Difficulty
    Body Focus:
      Abdomen
      quadriceps
      glutes
      triceps
      biceps    
      back
      chest
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    duration:{
        type: String,
        required: true
    },
    difficulty:{
        type: String,
        required: true
    },
    bodyfocus:{
        type: Array,
        required: true
    },
    postID:{
        type: mongoose.Types.ObjectId,
        required: true
    },
	exercises: [{
		type: mongoose.Types.ObjectId,
		ref: 'Exercise'
	}]
}, { versionKey: '_somethingElse' });
workoutSchema.statics.getWorkout = async id => {
    return Workout.findOne({postID: id}).then(result => {
        return result;
    })
}
workoutSchema.statics.getDetails = async id => {
    return Workout.findOne({postID: id}).populate('exercises').populate({
        path: 'post'
    });
}
workoutSchema.statics.deleteWorkout = async function(id){
	Workout.deleteOne({postID: id}).then(delresult => {
		console.log(`Workout with Post ID: ${id} successfully deleted!`);
	}).catch(err => {
		console.log(err);
	})
}
const Workout = mongoose.model('Workout', workoutSchema, 'Workouts');
module.exports = Workout;