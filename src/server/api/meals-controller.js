const MealsController = {
	index: (req, res) => {
		const meals = {
			meals: []
		}

		res.send(meals)
	}
}

module.exports = MealsController
