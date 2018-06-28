const express = require('express');

const path = require('path');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
import * as SocketChannels from '../constants/socket-io-channels.js'
import * as PubSubChannels from '../constants/pubsub-channels.js'
import PubSub from 'pubsub-js'
const port = process.env.PORT || 5000;

import database from './database.js'
import MealModel from './models/meal.js'

database
	.authenticate()
	.then(() => {
		console.log('Connection to database has been established successfully.')
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err)
	})


const Meal = MealModel(database)
Meal.sync({force: true})
	.then(() => {
		return Meal.create({
			title: "Hamburger",
			description: "It's a patty of ground beef, cooked to a safe temperature. Usually served on a bun."
		})
	})

import Repository from './repositories/repository.js'
const mealsRepository = new Repository(Meal, {create: PubSubChannels.MEALS_CREATE})


import MealsController from './api/meals-controller.js'
const mealsController = new MealsController(mealsRepository)

app.get('/api/meals', (req, res) => mealsController.index(req, res))

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
		app.use(express.static(path.join(__dirname, '..', '..', 'build')));

	// Handle React routing, return all requests to React app
		app.get('*', function(req, res) {
			res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
	});
}


io.on('connection', (socket) => {
	console.log('[SOCKET.IO] a user connected')

	mealsRepository.findAll()
		.then(meals => {
			socket.emit(SocketChannels.MEALS, { meals })
		})
	
	PubSub.subscribe(PubSubChannels.MEALS_CREATE, () => {
		console.log("Updating Meals")
		mealsRepository.findAll()
			.then(meals => {
				socket.emit(SocketChannels.MEALS, { meals })
			})
	})

	socket.on(SocketChannels.MEALS_CREATE, (meal) => {
		console.log("Creating Meal")
		Meal.create(meal)
	})

	socket.on('disconnect', () => {
		console.log('[SOCKET.IO] user disconnected')
	})
})


server.listen(port, () => console.log(`Listening on port ${port}`));
