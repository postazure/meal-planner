import PubSub from 'pubsub-js'

export default class Repository {
	constructor(modelClass, channels) {
		this.modelClass = modelClass	
	}

	findAll = () => this.modelClass.findAll({
		attributes: ['title', 'description']
	})

	create = (obj) => {
		this.modelClass.create(obj)
			.then(() => PubSub.publish(channels.create))
	}
}

