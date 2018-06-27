import React from 'react'

import MealCard from '../meal-card/meal-card.js'

export default class MealsList extends React.Component {
	render() {
		return (
			<div>
				{this.props.meals.map((meal, i) => <MealCard key={i} {...meal}/>)}
			</div>
		)
	}
}
