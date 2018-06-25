import React from 'react'
import './meal-card.css'

export default class MealCard extends React.Component {
	render() {
		const { title, description } = this.props
		return (
			<div className="meal-card">
				<div className="title">{title}</div>
				<div className="description">{description}</div>
			</div>
		)
	}
}
