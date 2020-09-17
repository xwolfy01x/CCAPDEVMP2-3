const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stepSchema = new Schema({
    image:{
        type:Buffer,
        required: true
    },
    instruction:{
        type: String,
        required:true
    }
}, { versionKey: '_somethingElse' });
const Step = mongoose.model('Step', stepSchema, 'Steps');
module.exports = Step;