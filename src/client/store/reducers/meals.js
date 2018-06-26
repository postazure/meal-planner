import * as Actions from '../actions/meals.js'

const INITIAL_STATE = {
	meals: []
}

export default (state = INITIAL_STATE, {type, data}) => {

	switch(type) {
		case Actions.SET_ALL:
			return {...state, meals: data}

		default:
			return state
	}
}

