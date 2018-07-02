import React from 'react'
import './inline-console.css'

const LOG = 'log'
const WARN = 'warn'
const ERROR = 'error'

export default class InlineConsole extends React.Component {
	
	state = {
		input: '',
		inputHistory: [],
		inputHistoryPointer: 0,
		logs: [],
		hidden: true,
		countOnHide: 0,
		displayLog: true,
		displayWarn: true,
		displayError: true
	}

	componentShouldUpdate(newProps, newState) {
		if ( JSON.stringify(newState.logs[0]) !== JSON.stringify(this.state.logs[0]) ) {
			return false
		}
		return true
	}

	componentDidMount () {
		this.originalConsoleLog = window.console.log
		this.originalConsoleWarn = window.console.warn
		this.originalConsoleError = window.console.error

		this.originalConsoleClear = window.console.clear

		window.console.log = (...msgs) => this.console(LOG, msgs)
		window.console.warn = (...msgs) => this.console(WARN, msgs)
		window.console.error = (...msgs) => this.console(ERROR, msgs)
		
		window.console.clear = () => this.setState({logs: [], countOnHide: 0})
	}

	componentWillUnmount () {
		window.console.log = this.originalConsoleLog
		window.console.warn = this.originalConsoleWarn
		window.console.error = this.originalConsoleError

		window.console.clear = this.originalConsoleClear
	}

	console = (type, messages) => { this.setState({ logs: [...this.typeMessages(type, messages), ...this.state.logs] }) }
	typeMessages = (type, messages) => messages.map( ( message, i ) => ({ type, message, timestamp: Date.now(), index: i }) )
	
	sanitizeString = (string) => string.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')

	hideConsole = () => { this.setState({hidden: true, countOnHide: this.state.logs.length}) }
	showConsole = () => { this.setState({hidden: false, countOnHide: 0}) }

	messageCountSinceClose = () => this.state.logs.length - this.state.countOnHide

	toggleFilter = (filter) => { this.setState({ [filter]: !this.state[filter]}) }
	
	handleInput = (e) => {
		e.preventDefault()

		try {
			// eslint-disable-next-line
			console.log(eval(this.sanitizeString(this.state.input)))
		} catch (error) {
			console.error(error.toString())
		}
		
		this.appendToHistory(this.state.input)
		this.setState({ input: '', inputHistoryPointer: 0 })
	}

	historyBack = () => { 
		let pointer = this.state.inputHistoryPointer + 1;
		if (pointer >= this.state.inputHistory.length) {
			pointer = 0
		}

		this.setState({ input: this.state.inputHistoryPointer[pointer], inputHistoryPointer: pointer }) 
	}

	historyForward = () => {
		let pointer = this.state.inputHistoryPointer - 1
		if (pointer < 0) {
			pointer = this.state.inputHistory.length - 1
		}

		this.setState({ input: this.state.inputHistoryPointer[pointer], inputHistoryPointer: pointer }) 
	}

	appendToHistory = (values) => { this.setState({ inputHistory: [...values, ...this.state.inputHistory] }) }

	handleInputKeyPress = (e) => {
		const up = 38
		if (e.keyCode === up || e.key === 'UIKeyInputUpArrow' || e.key === 'Tab') {
			this.historyForward()
		}

		const down = 40
		if (e.keyCode === down || e.key === 'UIKeyInputDownArrow') {
			this.historyBack()
		}
	}

	render () {
		if (this.state.hidden) {
			return <button className="inline-console-toggle" onClick={this.showConsole}>Console{this.messageCountSinceClose() ? ` (${this.messageCountSinceClose()})` : ''}</button>
		}
		
		const messages = this.state.logs
		.filter(({type}) => (type === LOG && this.state.displayLog) || (type === WARN && this.state.displayWarn) || (type === ERROR && this.state.displayError))
		.map( ({type, message, timestamp, index}) => <div className={`message ${type}`} key={`${timestamp}-${index}`}><span className="type">{type}:</span> {message}</div>)

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
						<input type="text" onChange={e => this.setState({input: e.target.value})} onKeyDown={this.handleInputKeyPress} value={this.state.input}/>
					</form>
					<button onClick={this.historyBack}>v</button>
					<button onClick={this.historyForward}>^</button>
				</div>
		</div>
		)
	} 

}
