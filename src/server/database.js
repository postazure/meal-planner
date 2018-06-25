const Sequelize = require('sequelize')

const dev = {
	database: 'meal_planner_dev',
	username: 'meal_planner_user',
	password: ''
}

const cnf = dev

const sequelize = new Sequelize(cnf.database, cnf.username, cnf.password, {
	host: 'localhost',
	dialect: 'postgres',
	operatorsAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})

module.exports = sequelize
