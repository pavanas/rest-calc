/* eslint-disable */
const express = require('express');
const parser = require('body-parser');

const app = express();

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

let result = 0;

app.route('/operation')
 .post((req, res) => {
	const sent_data = req.body;

	switch(sent_data.operation) {
		case 'add': 
			result += sent_data.value; 
			break;
		case 'subtrack':
			result -= sent_data.value;
			break;
		case 'multiply':
			result = result * sent_data.value;
			break;
		case 'devide':
			result = result / sent_data.value;
			break;
		default:
			res.status('200').json({"result": result, "message":"Can't understand operation"});
			break;
	}

	if(isNaN(result)){
		result = 0;
		res.status('200').json({"result": result, "message":"Can't devide with 0"});
	} else {
		res.status('200').json({"result": result});
	}
})
 .get((req, res) => res.status(404).send({"message": `GET method is not valid for this endpoint`}));

app.route('/clear') 
 .get((req, res) => {
	result = 0;
	res.status('200').json({result: 0});
})
 .post((req, res) => res.status(404).send({"message": `POST method is not valid for this endpoint`}));

app.use(function(req, res) {
  res.status(404).send({"message": `The requested URL: ${req.protocol}://${req.get('host')}${req.originalUrl} is not found`});
});

app.listen('4000', () => console.log('App Listening...'));