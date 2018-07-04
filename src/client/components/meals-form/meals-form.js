import React from 'react'
import RadioGroup from '../radio-group.js'
import * as MealsActions from '../../store/actions/meals.js'

export default class MealsForm extends React.Component {
	state = {}

	handleSubmit = e => {
		e.preventDefault()
		MealsActions.create(this.state)
		this.setState({title: '', description: '', timing: null})
	}

	render(){
		const timings = [
			{ label: 'Snack', value: 'snack' },
			{ label: 'Breakfast', value: 'breakfast' },
			{ label: 'Lunch', value: 'lunch' },
			{ label: 'Dinner', value: 'dinner' },
			{ label: 'Dessert', value: 'dessert' }
		]

		const {title = '', description = ''} = this.state

		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<input type="text" placeholder="title" value={title} onChange={(e) => this.setState({title: e.target.value})}/>	
				<input type="text" placeholder="description" value={description} onChange={(e) => this.setState({description: e.target.value})}/>	
				<RadioGroup options={timings} onChange={timing => this.setState({timing})}/>
				<button type="submit">Submit</button>
			</form>
		)
	}
}

