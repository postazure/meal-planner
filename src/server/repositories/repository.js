export default class Repository {
	constructor(modelClass) {
		this.modelClass = modelClass	
	}

	findAll = () => this.modelClass.findAll()
}

