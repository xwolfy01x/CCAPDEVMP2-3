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
    },
    recipeID: {
        type: mongoose.Types.ObjectId,
        ref: "Recipe"
    }
}, { versionKey: '_somethingElse' });
stepSchema.statics.deleteStep = async id => {
	Step.deleteMany({recipeID: id}).then(delresult => {
		console.log(`Steps with Recipe ID: ${id} successfully deleted!`);
	}).catch(err => {
		console.log(err);	
	})
}
const Step = mongoose.model('Step', stepSchema, 'Steps');
module.exports = Step;