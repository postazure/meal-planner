import React from 'react'

export default class RadioGroup extends React.Component {
	handleChange = (value) => {
		this.props.onChange(value)
	}

	render() {
		const radioButtons = this.props.options.map(( {label, value} ) => ( 
			<div key={value}>
				<input type="radio" onChange={() => this.handleChange(value)} /> 
				<span>{label}</span>
			</div>
		))

		return (
			<div className="radio-group">
				{radioButtons}
			</div>
		)
	}
}
