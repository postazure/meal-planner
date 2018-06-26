export const STATUS = 'STATUS'


export const SET_ALL = 'SET_ALL'
export const setAll = (meals) => ({
	type: SET_ALL,
	data: meals
})

export const getAll = (dispatch) => {
	dispatch({type: STATUS, isFetchingAll: true})
 
	fetch('/api/meals')
		.then(res => res.json())
		.then(body => {
			dispatch(setAll(body.meals))
		})
		.catch(() => {dispatch({type: STATUS, isFetchingAll: false})})
}
