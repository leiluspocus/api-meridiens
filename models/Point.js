import mongoose from 'mongoose';

/* PointSchema will correspond to a collection in your MongoDB database. */
const PointSchema = new mongoose.Schema({
	idPoint: {
		type: String,
		required: [ true, 'Un point a forcément un numéro.' ],
		maxlength: [ 500, 'Name cannot be more than 500 characters' ]
	},
	name: {
		type: String,
		required: [ true, 'Un point a forcément un nom.' ],
		maxlength: [ 500, 'Name cannot be more than 500 characters' ]
	},
	roles: {
		type: String,
		maxlength: [ 500, "Maximum 500 caractères pour les fonctions d'un point" ]
	},
	localization: {
		type: String,
		required: [ true, 'Un point a forcément une localisation :)' ],
		maxlength: [ 500, 'Maximum 500 caractères pour les fonctions du point' ]
	}
});

export default mongoose.models.Point || mongoose.model('Point', PointSchema);
