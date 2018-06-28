import React from 'react'
import * as MealsActions from '../../store/actions/meals.js'

export default class MealsForm extends React.Component {
	state = {}

	handleSubmit = e => {
		e.preventDefault()
		alert("Submitting")
		MealsActions.create(this.state)
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<input type="text" placeholder="title" onChange={(e) => this.setState({title: e.target.value})}/>	
				<input type="text" placeholder="description" onChange={(e) => this.setState({description: e.target.value})}/>	
				<button type="submit">Submit</button>
			</form>
		)
	}
}

