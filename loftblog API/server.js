const express = require('express');
const podyParser = require('body-parser');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let artists = [
	{
		id: 1,
		name: 'Metallics'
	},
	{
		id: 2,
		name: 'Iron Maiden'
	},
	{
		id: 3,
		name: 'Deep Purple'
	}

];

app.get('/', (req, res) => {
	res.send('Hello API');
});

app.get('/artists', (req, res) => {
	res.send(artists);
})

app.get('/artists/:id', (req, res) => {
	const artist = artists.find((art) => {
		return art.id === Number(req.params.id)
	});
	res.send(artist);
})

app.post('/artists', (req, res) => {
	let artist = {
		name: req.body.name
	};
	db.collection('artists').insert(artist, (err, result) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		}
		res.send(artist);
	})
});

app.put('/artists/:id', (req, res) => {
	const artist = artists.find((art) => {
		return art.id === Number(req.params.id)
	});
	artist.name = req.body.name;
	res.sendStatus(200);
});

app.delete('/artists/:id', (req, res) => {
	artists = artists.filter((artist) => {
		return artist.id !== Number(req.params.id);
	});
	res.sendStatus(200);
});

// app.listen(3012, () => {
// 	console.log('API app started')
// })

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (err, client) {

	if (err) {
		return console.log(err);
	}
	db = client.db('artists');

	app.listen(3012, function () {
		console.log("API app started");
	});

})