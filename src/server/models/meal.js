const Sequelize = require('sequelize')

const Meal = (sequelize) => sequelize.define('meal', {
	title: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	}
})

export default Meal
