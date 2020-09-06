var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
let db;
const mongoConnect = (callback) => {
	MongoClient.connect('mongodb+srv://Chi:wintermelon@cluster0.nula3.gcp.mongodb.net/test').then(result => {
		db = result.db('OFIT');
	}).catch(err => {
		console.log(err);
	});
}
const getDb = () => {
	if (db)
		return db;
	else console.log('I have nothing')
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
