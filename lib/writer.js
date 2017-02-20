var fs = require('fs');

//test files (read from test, write to test2)
var path = "./lib/utils/command-library.json";

var temp;

//read function
module.exports.readDictionary = function(callback){

	fs.readFile(path, (err, read_data) => {
		if (err) return console.log(err);
		temp = JSON.parse(read_data);
		callback(temp);
	});
}

//write function
module.exports.writeDictionary = function(new_data, callback){

	fs.writeFile(path, JSON.stringify(new_data), (err) => {
		if (err) return console.log(err);
		callback();
	});
}

//add key-value pair
module.exports.addPair = function(object, key, value, callback){
	
	object[key] = value;
	callback();
}

//delete key-value pair
module.exports.deletePair = function(object, key, callback){
	
	delete object[key];
	callback();
}
