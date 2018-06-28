import * as SocketChannels from '../../../constants/socket-io-channels.js'

export const SET_ALL = 'SET_ALL'
export const setAll = (meals) => ({
	type: SET_ALL,
	data: meals
})

export const create = meal => {
	window.socket.emit(SocketChannels.MEALS_CREATE, meal)
}
