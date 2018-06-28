import PubSub from 'pubsub-js'

export default class Repository {
	constructor(modelClass, channels) {
		this.modelClass = modelClass	
		this.channels = channels
	}

	findAll = attributes => this.modelClass.findAll({ attributes })

	create = (obj) => {
		this.modelClass.create(obj)
			.then(() => PubSub.publish(this.channels.create))
	}
}

