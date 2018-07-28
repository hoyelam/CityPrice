const http = 			require('http');
const express = 		require('express');
const app = express(); 
const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost/test');

const port = 8081;

var testModelSchema = new mongoose.Schema({
	name: String
});

var TestModel = mongoose.model('TestModel', testModelSchema);

app.get('/', function(req, res){
	res.send('Ey boys')
});

app.get('/model/:id', function(req, res){
	TestModel.findById(req.params.id, function(err, testModel){
		if(err) res.send(err);
		res.send(testModel);
	})
});

app.get('/models', function(req, res){
	TestModel.find({}, function(err, models){
		var userMap = {};
		models.forEach(function(model){
			userMap[model._id] = model;
		})
	res.send(userMap);
	})
});

app.post('/models/:name', function(req, res){ 
	var modelToSave = new TestModel({name: req.params.name})
	modelToSave.save(function(err, modelToSave){
		if(err) res.send(err);
		res.send('Model with name ' + modelToSave.name + ' saved in DB');
	});
});

app.listen(port, () => console.log("App running on port " + port));



