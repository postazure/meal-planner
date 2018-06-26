import React from 'react'
import { connect } from 'react-redux'
import * as MealsSelectors from '../../store/selectors/meals.js'
import * as MealsActions from '../../store/actions/meals.js'

import MealCard from '../../components/meal-card/meal-card.js'

class MealsIndex extends React.Component {
	
	componentDidMount () {
		this.props.getMeals()	
	}

	render() {
		return (
			<div>
				<h1>All Meals</h1>
				{this.props.meals.map((meal, i) => <MealCard key={i} {...meal}/>)}
			</div>
	)}
}

const mapStateToProps = (state) => ({
	meals: MealsSelectors.getAll(state)
})

const mapDispatchToProps = (dispatch) => ({
	getMeals: () => MealsActions.getAll(dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(MealsIndex)
