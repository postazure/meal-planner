export default class MealsController {
	constructor(repository) {
		this.repository = repository
	}

	index = (req, res) => {
		this.repository.findAll()
			.then(meals => {
				res.send({ meals })
			})
	}
}
