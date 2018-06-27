import React from 'react'

export default class MealsForm extends React.Component {
	state = {}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" placeholder="title" onChange={(e) => this.setState({title: e.target.value})}/>	
				<input type="text" placeholder="description" onChange={(e) => this.setState({description: e.target.value})}/>	
			</form>
		)
	}
}
