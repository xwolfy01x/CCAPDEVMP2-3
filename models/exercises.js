/*
	Name
	Images (optional) - Buffer
	Description
	Repetitions
	Sets
*/ 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: Buffer,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    repetitions:{
        type: Number,
        required: true
    },
    sets:{
        type: Number,
        required: true
    }
}, { versionKey: '_somethingElse' });
exerSchema.statics.getExercise =  async id => {
    return Exercise.findById(id).then(result => {
        return result;
    }).catch(err => {
        console.log(err);
    })
}
const Exercise = mongoose.model('Exercise', exerSchema, 'Exercises');
module.exports = Exercise;