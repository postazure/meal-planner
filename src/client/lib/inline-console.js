import React from 'react'
import './inline-console.css'

const LOG = 'log'
const WARN = 'warn'
const ERROR = 'error'

export default class InlineConsole extends React.Component {
	
	state = {
		logs: [],
		hidden: true,
		countOnHide: 0
	}

	componentDidMount () {
		this.originalConsoleLog = window.console.log
		this.originalConsoleWarn = window.console.warn
		this.originalConsoleError = window.console.error

		this.originalConsoleClear = window.console.clear

		window.console.log = (...msgs) => this.console(LOG, ...msgs)
		window.console.warn = (...msgs) => this.console(WARN, ...msgs)
		window.console.error = (...msgs) => this.console(ERROR, ...msgs)
		
		window.console.clear = () => this.setState({logs: [], countOnHide: 0})
	}

	componentWillUnmount () {
		window.console.log = this.originalConsoleLog
		window.console.warn = this.originalConsoleWarn
		window.console.error = this.originalConsoleError

		window.console.clear = this.originalConsoleClear
	}

	console = (type, ...messages) => {
		this.setState({ logs: [ ...this.typeMessages(type, messages), ...this.state.logs ] })
	}

	typeMessages = (type, messages) => messages.map( message => ({ type, message, timestamp: Date.now() }) )

	hideConsole = () => { this.setState({hidden: true, countOnHide: this.state.logs.length}) }
	showConsole = () => { this.setState({hidden: false, countOnHide: 0}) }

	messageCountSinceClose = () => this.state.logs.length - this.state.countOnHide

	render () {
		if (this.state.hidden) {
			return <button className="inline-console-toggle" onClick={this.showConsole}>Console{this.messageCountSinceClose() ? ` (${this.messageCountSinceClose()})` : ''}</button>
		}

		return (
			<div className="inline-console"> 
				<div className="banner">Console <button onClick={this.hideConsole}>Hide</button></div> 
				<div className="logs">
					{ this.state.logs.map( ({type, message, timestamp}) => <div className={`message ${type}`} key={timestamp}><span className="type">{type}:</span> {message}</div>) }
				</div>
		</div>
		)
	} 
}