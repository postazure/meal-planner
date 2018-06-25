import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import About from './components/about/about'

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">Meal Planning App</header>
      	<Router>
					<Switch>
						<Route exact path="/" component={()=><div>Home</div>}/>
						<Route path="/about" component={About}/>
					</Switch>
				</Router>  
      </div>
    )
  }
}

