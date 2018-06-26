import React from 'react'
import MealCard from '../../components/meal-card/meal-card.js'

export default class MealsIndex extends React.Component {
	state = {meals: []}

	componentDidMount () {
		fetch('/api/meals')
			.then(res => {
				return res.json()
			})
			.then(body => {
				this.setState({meals: body.meals})
			})
	}

	render() {
		return (
			<div>
				<h1>All Meals</h1>
				{this.state.meals.map(meal => <MealCard {...meal}/>)}
			</div>
	)}
}
