import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import * as MealsSelectors from '../../store/selectors/meals.js'
import MealsList from '../../components/meals-list/meals-list.js'
import MealsForm from '../../components/meals-form/meals-form.js'

class MealsIndex extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/meals/new" component={MealsForm} />
					<Route exact path="/meals" component={(routerProps) => <MealsList {...routerProps} meals={this.props.meals} />}/>
				</Switch>
			</Router>
	)}
}

const mapStateToProps = (state) => ({
	meals: MealsSelectors.getAll(state)
})

export default connect(mapStateToProps)(MealsIndex)
