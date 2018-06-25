const express = require('express');

const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

const sequelize = require('./database.js')

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection to database has been established successfully.')
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err)
	})


const MealsController = require('./api/meals-controller.js')

app.get('/api/meals', MealsController.index)

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
		app.use(express.static(path.join(__dirname, '..', '..', 'build')));

	// Handle React routing, return all requests to React app
		app.get('*', function(req, res) {
			res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
	});
}

app.listen(port, () => console.log(`Listening on port ${port}`));
