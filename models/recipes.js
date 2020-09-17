const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    ingredients:{
        type: Array,
        required: true
    },
    category:{
        type: Array,
        required: true
    },
    postID:{
        type: mongoose.Types.ObjectId,
        required: true
    },
	steps: [{
		type: mongoose.Types.ObjectId,
		ref: 'Step'
	}]
}, { versionKey: '_somethingElse' });
recipeSchema.statics.getRecipe = async id => {
    return Recipe.findOne({postID: id}).then(result => {
        return result;
    })
}
recipeSchema.statics.getDetails = async id => {
    return Recipe.findOne({postID: id}).populate('steps').populate({
        path: 'post'
    });
}
const Recipe = mongoose.model('Recipe', recipeSchema, 'Recipes');
module.exports = Recipe;