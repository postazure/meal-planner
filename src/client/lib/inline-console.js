import React from 'react'
import './inline-console.css'

const LOG = 'log'
const WARN = 'warn'
const ERROR = 'error'

export default class InlineConsole extends React.Component {
	
	state = {
		logs: [],
		hidden: true,
		countOnHide: 0,
		displayLog: true,
		displayWarn: true,
		displayError: true
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
	
	sanitizeString = (string) => string.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')

	hideConsole = () => { this.setState({hidden: true, countOnHide: this.state.logs.length}) }
	showConsole = () => { this.setState({hidden: false, countOnHide: 0}) }

	messageCountSinceClose = () => this.state.logs.length - this.state.countOnHide

	toggleFilter = (filter) => { this.setState({ [filter]: !this.state[filter]}) }
	
	handleInput = (e) => {
		e.preventDefault()

		// eslint-disable-next-line
		eval(this.sanitizeString(this.state.input))
		this.setState({input: ''})
	}

	render () {
		if (this.state.hidden) {
			return <button className="inline-console-toggle" onClick={this.showConsole}>Console{this.messageCountSinceClose() ? ` (${this.messageCountSinceClose()})` : ''}</button>
		}
		
		const messages = this.state.logs
		.filter(({type}) => (type === LOG && this.state.displayLog) || (type === WARN && this.state.displayWarn) || (type === ERROR && this.state.displayError))
		.map( ({type, message, timestamp}) => <div className={`message ${type}`} key={timestamp}><span className="type">{type}:</span> {message}</div>)

		return (
			<div className="inline-console"> 
				<div className="banner">
					Console:
					<span className="filter"><input type="checkbox" onChange={() => this.toggleFilter('displayLog')} checked={this.state.displayLog}/>{LOG}</span>
					<span className="filter"><input type="checkbox" onChange={() => this.toggleFilter('displayWarn')} checked={this.state.displayWarn}/>{WARN}</span>
					<span className="filter"><input type="checkbox" onChange={() => this.toggleFilter('displayError')} checked={this.state.displayError}/>{ERROR}</span>
					<button onClick={this.hideConsole}>Hide</button>
				</div> 
				<div className="logs">
					{ messages }
				</div>
				<div className="console-input">
					<form onSubmit={this.handleInput}>
						<input type="text" onChange={e => this.setState({input: e.target.value})} value={this.state.input}/>
					</form>
				</div>
		</div>
		)
	} 
}
