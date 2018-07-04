const Sequelize = require('sequelize')

const Meal = (sequelize) => sequelize.define('meal',
	{
		title: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		},
		timing: {
			type: Sequelize.STRING
		},
	},
	{
		validate: {
			timingIsAcceptable() { if( !Meal.timing.includes(this.timing) ) throw new Error (`Must be one of the following ${Object.values( Meal.timing )}.`) }
		}
	}
)

Meal.timing = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack']

export default Meal
